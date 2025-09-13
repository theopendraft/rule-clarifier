'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Bold, Italic, List, Quote, Code, Link, Image, Heading } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

const RichTextEditor = ({ content, onChange, readOnly = false }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current && !readOnly) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHeading = (level: number) => {
    formatText('formatBlock', `h${level}`);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  if (readOnly) {
    return (
      <div 
        className="prose max-w-none p-4 border rounded-lg bg-gray-50"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Rich Text Editor
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('bold')}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('italic')}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('insertUnorderedList')}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('insertOrderedList')}
                title="Numbered List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('formatBlock', 'blockquote')}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('formatBlock', 'pre')}
                title="Code Block"
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={insertLink}
                title="Insert Link"
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={insertImage}
                title="Insert Image"
              >
                <Image className="h-4 w-4" />
              </Button>
              <div className="border-l pl-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertHeading(1)}
                  title="Heading 1"
                >
                  H1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertHeading(2)}
                  title="Heading 2"
                >
                  H2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => insertHeading(3)}
                  title="Heading 3"
                >
                  H3
                </Button>
              </div>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              className="min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ minHeight: '200px' }}
            />
          </div>
        ) : (
          <div 
            className="prose max-w-none p-4 border rounded-lg bg-gray-50 min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
