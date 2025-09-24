'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';

interface Manual {
  id: string;
  code: string;
  title: string;
  description?: string;
  version?: string;
  isActive: boolean;
}

interface Circular {
  id: string;
  code: string;
  title: string;
  description?: string;
  number?: string;
  date?: string;
  isActive: boolean;
}

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink: (url: string) => void;
  selectedText: string;
}

export function LinkDialog({ isOpen, onClose, onAddLink, selectedText }: LinkDialogProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState<'manual' | 'circular' | null>(null);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<Manual | Circular | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [selectedDivId, setSelectedDivId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manualsResponse = await fetch('/api/manuals');
        const manualsData = await manualsResponse.json();
        setManuals(manualsData || []);

        const circularsResponse = await fetch('/api/circulars');
        const circularsData = await circularsResponse.json();
        setCirculars(circularsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const showDocumentPreview = async (document: Manual | Circular) => {
    setLoadingPreview(true);
    try {
      const isManual = 'version' in document;
      const endpoint = isManual ? `/api/manuals/get?id=${document.id}` : `/api/circulars/get?id=${document.id}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setPreviewDocument(data);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error fetching document details:', error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleLinkDocument = () => {
    if (previewDocument) {
      const isManual = 'version' in previewDocument;
      const baseUrl = isManual 
        ? `/manuals/${previewDocument.id}`
        : `/circulars/${previewDocument.id}`;
      const url = selectedDivId ? `${baseUrl}#${selectedDivId}` : baseUrl;
      onAddLink(url);
      handleClose();
    }
  };

  const handleDivClick = (divId: string) => {
    setSelectedDivId(selectedDivId === divId ? null : divId);
  };

  useEffect(() => {
    (window as any).handleDivClick = handleDivClick;
    return () => {
      delete (window as any).handleDivClick;
    };
  }, [selectedDivId]);

  const backToSelection = () => {
    setShowPreview(false);
    setPreviewDocument(null);
    setSelectedDivId(null);
  };

  const handleClose = () => {
    setLinkUrl('');
    setLinkType(null);
    setShowPreview(false);
    setPreviewDocument(null);
    setSelectedDivId(null);
    onClose();
  };

  const addLink = () => {
    if (linkUrl) {
      onAddLink(linkUrl);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {!showPreview ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Or choose from suggestions:</label>
                <div className="flex gap-2 mb-3">
                  <Button
                    variant={linkType === 'manual' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLinkType('manual')}
                    className="flex-1"
                  >
                    Manual
                  </Button>
                  <Button
                    variant={linkType === 'circular' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLinkType('circular')}
                    className="flex-1"
                  >
                    Circular
                  </Button>
                </div>
              </div>

              {linkType === 'manual' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Available Manuals</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {manuals.filter(manual => manual.isActive).map((manual) => (
                      <div
                        key={manual.id}
                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => showDocumentPreview(manual)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{manual.title}</p>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{manual.code}</span>
                        </div>
                        {manual.description && (
                          <p className="text-xs text-gray-600">{manual.description}</p>
                        )}
                        {manual.version && (
                          <p className="text-xs text-gray-500 mt-1">Version: {manual.version}</p>
                        )}
                      </div>
                    ))}
                    {manuals.filter(manual => manual.isActive).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No active manuals available</p>
                    )}
                  </div>
                </div>
              )}

              {linkType === 'circular' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Available Circulars</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {circulars.filter(circular => circular.isActive).map((circular) => (
                      <div
                        key={circular.id}
                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => showDocumentPreview(circular)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{circular.title}</p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{circular.code}</span>
                        </div>
                        {circular.description && (
                          <p className="text-xs text-gray-600">{circular.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          {circular.number && (
                            <span className="text-xs text-gray-500">No: {circular.number}</span>
                          )}
                          {circular.date && (
                            <span className="text-xs text-gray-500">
                              {new Date(circular.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {circulars.filter(circular => circular.isActive).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No active circulars available</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={addLink} disabled={!linkUrl}>
                  Add Link
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Document Preview</h3>
              <Button variant="outline" size="sm" onClick={backToSelection}>
                ← Back to Selection
              </Button>
            </div>
            
            {loadingPreview ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : previewDocument ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {'version' in previewDocument && previewDocument.version && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Version: {previewDocument.version}</span>
                  )}
                  {'number' in previewDocument && previewDocument.number && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Number: {previewDocument.number}</span>
                  )}
                  {'date' in previewDocument && previewDocument.date && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Date: {new Date(previewDocument.date).toLocaleDateString()}</span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs ${
                    previewDocument.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {previewDocument.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">{previewDocument.code} - {previewDocument.title}</h4>
                </div>
                
                {previewDocument.description && (
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2">Content (Click on paragraphs to link specific sections)</h5>
                    <div 
                      className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: previewDocument.description
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')
                          .replace(/&quot;/g, '"')
                          .replace(/&#39;/g, "'")
                          .replace(/&amp;/g, '&')
                          .replace(/<div id="(\d+)"/g, (match, divId) => 
                            `<div id="${divId}" class="cursor-pointer hover:bg-blue-50 transition-all ${selectedDivId === divId ? 'bg-blue-100' : ''}" onclick="handleDivClick('${divId}')"`
                          )
                      }} 
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Link to this document?</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {previewDocument.code} - {previewDocument.title}
                      {selectedDivId && <span className="ml-2 bg-blue-200 px-2 py-1 rounded">Section: {selectedDivId}</span>}
                    </p>
                  </div>
                  <Button onClick={handleLinkDocument} className="bg-blue-600 hover:bg-blue-700">
                    {selectedDivId ? 'Link Section' : 'Link Document'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Failed to load document details</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}