'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Button } from './button';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link as LinkIcon, 
  Unlink,
  Type,
  List,
  ListOrdered,
  Quote,
  Code
} from 'lucide-react';
import { useState, useEffect } from 'react';

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

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState<'manual' | 'circular' | null>(null);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md',
      },
    },
  });

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

  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkDialog(false);
      setLinkType(null);
    }
  };

  const addSuggestionLink = (url: string) => {
    editor?.chain().focus().setLink({ href: url }).run();
    setShowLinkDialog(false);
    setLinkType(null);
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="border border-b-0 rounded-t-md p-2 bg-gray-50 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('italic') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('underline') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Size */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            H1
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Other Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('blockquote') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Links */}
        <div className="flex gap-1">
          {editor.isActive('link') ? (
            <Button
              variant="outline"
              size="sm"
              onClick={removeLink}
            >
              <Unlink className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLinkDialog(true)}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="border rounded-b-md"
        placeholder={placeholder}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                        onClick={() => addSuggestionLink(`http://localhost:3000/manuals/${manual.id}`)}
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
                        onClick={() => addSuggestionLink(`http://localhost:3000/circulars/${circular.id}`)}
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
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                    setLinkType(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={addLink} disabled={!linkUrl}>
                  Add Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}