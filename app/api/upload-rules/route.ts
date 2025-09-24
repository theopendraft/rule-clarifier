import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { htmlContent } = await request.json();
    
    if (!htmlContent) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Parse the HTML content to extract rules
    const rules = parseHtmlToRules(htmlContent);
    
    // Log the parsed rules (database save will be implemented later)
    console.log('Parsed rules:', rules);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully processed ${rules.length} rules from HTML content`,
      rules: rules
    });
    
  } catch (error) {
    console.error('Error processing HTML content:', error);
    return NextResponse.json({ error: 'Failed to process HTML content' }, { status: 500 });
  }
}

function parseHtmlToRules(htmlContent: string) {
  const rules = [];
  
  // Extract sections with IDs (rules)
  const sectionRegex = /<section id="([^"]+)">([\s\S]*?)<\/section>/g;
  let match;
  
  while ((match = sectionRegex.exec(htmlContent)) !== null) {
    const ruleNumber = match[1];
    const content = match[2];
    
    // Extract title if present
    const titleMatch = content.match(/<h4[^>]*>(.*?)<\/h4>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : `Rule ${ruleNumber}`;
    
    // Clean content
    const cleanContent = content
      .replace(/<h4[^>]*>.*?<\/h4>/g, '') // Remove title
      .replace(/<div[^>]*>/g, '')
      .replace(/<\/div>/g, '')
      .trim();
    
    rules.push({
      number: ruleNumber,
      title: title,
      content: cleanContent,
      chapter: 4 // Assuming chapter 4 based on rule numbers
    });
  }
  
  return rules;
}