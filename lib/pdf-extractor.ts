export interface ExtractedContent {
  text: string;
  pages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

function parsePDFDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  try {
    const clean = dateStr.replace(/^D:/, '');
    const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(clean);
    if (!match) return new Date(dateStr);
    const [_, year, month, day, hour, minute, second] = match;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
  } catch {
    return undefined;
  }
}

function processParagraphs(text: string): string {
  let divCounter = 1;
  
  // Split by double line breaks to identify paragraphs
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const result = [];
  
  for (const paragraph of paragraphs) {
    const lines = paragraph.split(/\n/).filter(line => line.trim().length > 0);
    
    if (lines.length === 0) continue;
    
    // Check if this is a table
    if (lines.some(line => line.includes('<table'))) {
      result.push(`<div id="${divCounter++}">${paragraph.trim()}</div>`);
    }
    // Check if this is a single header
    else if (lines.length === 1 && (lines[0].includes('<h1') || lines[0].includes('<h2') || lines[0].includes('<h3') || lines[0].includes('<h4'))) {
      result.push(`<div id="${divCounter++}">${lines[0].trim()}</div>`);
    }
    // Check if this is a page break
    else if (lines.length === 1 && lines[0].includes('<hr')) {
      result.push(`<div id="${divCounter++}">${lines[0].trim()}</div>`);
    }
    // Check if this is a figure
    else if (lines.length === 1 && lines[0].includes('[Figure:')) {
      const line = lines[0].includes('<div') ? lines[0].replace('<div', `<div id="${divCounter++}"`) : `<div id="${divCounter++}">${lines[0]}</div>`;
      result.push(line);
    }
    // Regular paragraph - each line gets its own div
    else {
      for (const line of lines) {
        if (line.trim().length > 0) {
          result.push(`<div id="${divCounter++}">${line.trim()}</div>`);
        }
      }
    }
  }
  
  return result.join('\n');
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<ExtractedContent> {
  if (!pdfBuffer || pdfBuffer.length === 0) {
    throw new Error('Invalid PDF buffer');
  }

  console.log('Starting Adobe PDF extraction, buffer size:', pdfBuffer.length);

  try {
    const { ServicePrincipalCredentials, PDFServices, MimeType, ExtractPDFJob, ExtractPDFResult } = await import('@adobe/pdfservices-node-sdk');
    const { Readable } = require('stream');
    
    // Create credentials
    const credentials = new ServicePrincipalCredentials({
      clientId: 'bb5f5fc0c98c4f128945ad3e47cbd89e',
      clientSecret: 'p8e-IiMnsdbqB5Vuu5ld-FZMVrDUd3B1qiZ_'
    });
    
    // Create PDF Services instance
    const pdfServices = new PDFServices({ credentials });
    
    // Create readable stream from buffer
    const readStream = new Readable({
      read() {
        this.push(pdfBuffer);
        this.push(null);
      }
    });
    
    // Upload asset
    const inputAsset = await pdfServices.upload({
      readStream,
      mimeType: MimeType.PDF
    });
    
    // Create extract job with text, tables and styling information
    const job = new ExtractPDFJob({ inputAsset });
    
    // Note: In Node.js SDK, styling info is included by default when extracting tables
    
    // Submit job and get result
    const pollingURL = await pdfServices.submit({ job });
    const pdfServicesResponse = await pdfServices.getJobResult({
      pollingURL,
      resultType: ExtractPDFResult
    });
    
    // Get content from result
    const resultAsset = pdfServicesResponse.result.resource;
    const streamAsset = await pdfServices.getContent({ asset: resultAsset });
    
    // Read the ZIP content
    const chunks = [];
    for await (const chunk of streamAsset.readStream) {
      chunks.push(chunk);
    }
    const zipBuffer = Buffer.concat(chunks);
    
    // Extract JSON from ZIP
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(zipBuffer);
    
    // Find the JSON file in the ZIP
    let jsonContent = null;
    for (const [filename, file] of Object.entries(zip.files)) {
      if (filename.endsWith('.json')) {
        jsonContent = await file.async('text');
        break;
      }
    }
    
    if (!jsonContent) {
      throw new Error('No JSON file found in ZIP response');
    }
    
    const extractedJson = JSON.parse(jsonContent);
    
    console.log('Complete Adobe PDF Response:', JSON.stringify(extractedJson, null, 2));
    
    // Process elements by page and position
    const elements = extractedJson.elements || [];
    

    
    // Sort all elements by page and Y position (top to bottom)
    const sortedElements = elements
      .sort((a: any, b: any) => {
        const pageA = a.Page || 0;
        const pageB = b.Page || 0;
        if (pageA !== pageB) return pageA - pageB;
        
        const yA = a.Bounds?.[1] || 0;
        const yB = b.Bounds?.[1] || 0;
        return yB - yA; // Higher Y values first (top of page)
      });
    
    let allText = '';
    let currentPage = -1;
    let processedTables = new Set();
    let tableCounter = 0;

    
    // Group list items with their labels
    const processedElements = new Set();
    
    // Process elements in document order
    sortedElements.forEach((el: any) => {
      if (processedElements.has(el.ObjectID)) return;
      
      if (el.Page !== currentPage && currentPage !== -1) {
        allText += '<hr style="margin: 30px 0; border: 2px solid #ccc;">\n';
      }
      currentPage = el.Page;
      
      // Handle table containers
      if (el.Path?.match(/\/\/Document\/Sect(\/|\[\/?)Table(\[\d+\])?$/) && el.attributes?.NumRow && !processedTables.has(el.Path)) {
        processedTables.add(el.Path);
        
        // Use sequential numbering
        tableCounter++;
        
        allText += `<h4>Table ${tableCounter}</h4>\n`;
        
        const tableData: { [row: number]: { [col: number]: any } } = {};
        
        // Find all cell elements for this specific table
        const cellElements = elements.filter((cellEl: any) => {
          if (!cellEl.Path || !cellEl.attributes) return false;
          
          const isDirectCell = cellEl.Path.startsWith(el.Path + '/TR') && 
                             (cellEl.Path.includes('/TH') || cellEl.Path.includes('/TD')) &&
                             !cellEl.Path.includes('/P');
          
          return isDirectCell && 
                 cellEl.attributes.RowIndex !== undefined && 
                 cellEl.attributes.ColIndex !== undefined;
        });
        
        // Process each cell
        cellElements.forEach((cellEl: any) => {
          const rowIndex = cellEl.attributes.RowIndex;
          const colIndex = cellEl.attributes.ColIndex;
          
          if (!tableData[rowIndex]) tableData[rowIndex] = {};
          
          // Find text content in child P elements
          const textElements = elements.filter((textEl: any) => 
            textEl.Path === cellEl.Path + '/P' && textEl.Text
          );
          
          const cellText = textElements.map((textEl: any) => textEl.Text.trim()).join(' ');
          const firstTextEl = textElements[0];
          
          tableData[rowIndex][colIndex] = {
            text: cellText,
            isHeader: cellEl.Path?.includes('/TH'),
            colSpan: cellEl.attributes?.ColSpan || 1,
            rowSpan: cellEl.attributes?.RowSpan || 1,
            font: firstTextEl?.Font,
            backgroundColor: cellEl.attributes?.BackgroundColor
          };
        });
        
        // Generate HTML table
        const sortedRows = Object.keys(tableData).map(Number).sort((a, b) => a - b);
        if (sortedRows.length > 0) {
          // Find the maximum number of columns across all rows
          const maxCols = Math.max(...sortedRows.map(rowIndex => {
            const row = tableData[rowIndex] || {};
            return Math.max(...Object.keys(row).map(Number), -1) + 1;
          }));
          
          allText += '<table style="border-collapse: collapse; width: 100%; margin: 20px 0; border: 1px solid #ddd;">\n';
          
          // Track cells that are covered by rowspan/colspan
          const coveredCells = new Set<string>();
          
          sortedRows.forEach(rowIndex => {
            allText += '<tr>';
            const row = tableData[rowIndex] || {};
            
            for (let colIndex = 0; colIndex < maxCols; colIndex++) {
              const cellKey = `${rowIndex}-${colIndex}`;
              
              // Skip if this cell is covered by a rowspan/colspan from above
              if (coveredCells.has(cellKey)) {
                continue;
              }
              
              const cell = row[colIndex];
              
              if (cell) {
                const tag = cell.isHeader ? 'th' : 'td';
                let cellStyle = 'padding: 8px 12px; border: 1px solid #ddd; vertical-align: top; text-align: left;';
                
                if (cell.backgroundColor) {
                  const [r, g, b] = cell.backgroundColor;
                  cellStyle += ` background-color: rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)});`;
                } else if (cell.isHeader) {
                  cellStyle += ' background-color: #f8f9fa; font-weight: bold;';
                }
                
                if (cell.font) {
                  const fontSize = cell.font.size || 12;
                  const fontWeight = cell.font.weight >= 600 ? 'bold' : 'normal';
                  const fontFamily = cell.font.family_name?.replace(/[^a-zA-Z0-9\s-]/g, '') || 'Arial';
                  cellStyle += ` font-size: ${fontSize}px; font-weight: ${fontWeight}; font-family: '${fontFamily}', Arial, sans-serif;`;
                }
                
                let attributes = `style="${cellStyle}"`;
                if (cell.colSpan > 1) attributes += ` colspan="${cell.colSpan}"`;
                if (cell.rowSpan > 1) attributes += ` rowspan="${cell.rowSpan}"`;
                
                // Mark covered cells
                for (let r = 0; r < cell.rowSpan; r++) {
                  for (let c = 0; c < cell.colSpan; c++) {
                    if (r > 0 || c > 0) {
                      coveredCells.add(`${rowIndex + r}-${colIndex + c}`);
                    }
                  }
                }
                
                allText += `<${tag} ${attributes}>${cell.text?.trim() || '&nbsp;'}</${tag}>`;
              } else {
                allText += '<td style="padding: 8px 12px; border: 1px solid #ddd; text-align: left;">&nbsp;</td>';
              }
            }
            
            allText += '</tr>\n';
          });
          
          allText += '</table>\n\n';
          

        }
        
        return; // Skip further processing for table containers
      }
      
      // Handle all text elements except tables
      if (el.Text && !el.Path?.includes('Table')) {
        // Apply styling information if available
        let styleAttr = '';
        if (el.Font) {
          const fontSize = el.Font.size || el.TextSize || 12;
          const fontWeight = el.Font.weight >= 600 ? 'bold' : 'normal';
          const fontFamily = el.Font.family_name || 'inherit';
          styleAttr = ` style="font-size: ${fontSize}px; font-weight: ${fontWeight}; font-family: ${fontFamily};"`;
        }
        
        if (el.Path?.includes('Title')) {
          allText += `<h1${styleAttr}>${el.Text}</h1>\n`;
        } else if (el.Path?.includes('H1')) {
          allText += `<h2${styleAttr}>${el.Text}</h2>\n`;
        } else if (el.Path?.includes('H2')) {
          allText += `<h3${styleAttr}>${el.Text}</h3>\n`;
        } else if (el.Path?.includes('LI/LBody')) {
          allText += `<li${styleAttr}>${el.Text}</li>\n`;
        } else if (el.Path?.includes('Figure')) {
          allText += `<div style="border: 2px dashed #999; padding: 10px; margin: 10px 0; background: #f9f9f9;">[Figure: ${el.Text || 'Image'}]</div>\n`;
        } else if (el.Path?.includes('L/LI/Lbl')) {
          // Find corresponding LBody element
          const bodyEl = sortedElements.find((bodyEl: any) => 
            bodyEl.Path?.includes('L/LI/LBody') && 
            !processedElements.has(bodyEl.ObjectID) &&
            Math.abs((bodyEl.Bounds?.[1] || 0) - (el.Bounds?.[1] || 0)) < 20
          );
          
          if (bodyEl) {
            allText += `${el.Text.trim()} ${bodyEl.Text.trim()}\n`;
            processedElements.add(bodyEl.ObjectID);
          } else {
            allText += `${el.Text} `;
          }
        } else if (el.Path?.includes('L/LI/LBody')) {
          // Skip if already processed with label
          if (!processedElements.has(el.ObjectID)) {
            allText += `${el.Text} `;
          }
        } else {
          // Check if this should start a new line based on Y position difference
          const currentIndex = sortedElements.indexOf(el);
          const prevEl = currentIndex > 0 ? sortedElements[currentIndex - 1] : null;
          
          if (prevEl && prevEl.Bounds && el.Bounds) {
            const yDiff = Math.abs((prevEl.Bounds[1] || 0) - (el.Bounds[1] || 0));
            const xPos = el.Bounds[0] || 0;
            const prevXPos = prevEl.Bounds[0] || 0;
            
            // Detect paragraph breaks: significant Y difference or return to left margin
            if (yDiff > 15 || (yDiff > 8 && xPos < prevXPos - 50)) {
              // Check if this looks like a new paragraph or list item
              const text = el.Text.trim();
              if (text.match(/^\([a-z]\)|^\d+\.|^[A-Z][A-Z\s]+:|^[A-Z]{2,}:/)) {
                allText += `\n\n${text}`;
              } else {
                allText += `\n\n${text}`;
              }
            } else if (yDiff > 3) {
              allText += `\n${el.Text.trim()}`;
            } else {
              allText += ` ${el.Text.trim()}`;
            }
          } else {
            allText += `${el.Text.trim()}`;
          }
        }
      }
      processedElements.add(el.ObjectID);
    });
    

    
    if (!allText) {
      throw new Error('No text extracted from PDF');
    }
    
    // Clean up extra spaces but preserve line breaks
    allText = allText.replace(/ +/g, ' ').trim();
    

    
    console.log('Adobe PDF extraction successful, text length:', allText.length);
    

    
    return {
      text: allText,
      pages: extractedJson.pages?.length || 1,
      metadata: {
        title: extractedJson.info?.Title,
        author: extractedJson.info?.Author,
        subject: extractedJson.info?.Subject,
        creator: extractedJson.info?.Creator,
        producer: extractedJson.info?.Producer,
        creationDate: parsePDFDate(extractedJson.info?.CreationDate),
        modificationDate: parsePDFDate(extractedJson.info?.ModDate)
      }
    };

  } catch (error) {
    console.error('Adobe PDF extraction failed:', error);
    
    return {
      text: '',
      pages: 1,
      metadata: {}
    };
  }
}

export async function extractTextFromPDFWithOCR(pdfBuffer: Buffer): Promise<ExtractedContent> {
  return await extractTextFromPDF(pdfBuffer);
}

export async function extractTextFromPDFUrl(pdfUrl: string): Promise<ExtractedContent> {
  try {
    console.log("Fetching PDF from URL:", pdfUrl);

    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    console.log("PDF downloaded successfully, size:", pdfBuffer.length, "bytes");

    return await extractTextFromPDF(pdfBuffer);
  } catch (error) {
    console.error("Error fetching PDF from URL:", error);
    return {
      text: "",
      pages: 1,
      metadata: {},
    };
  }
}