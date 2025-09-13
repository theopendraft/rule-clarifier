import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin';

interface EditorPreviewProps {
  data: any;
  readOnly?: boolean;
  onChange?: (data: any) => void;
}

const EditorPreview = ({ data, readOnly = false, onChange }: EditorPreviewProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    const editor = new EditorJS({
      holder: holderRef.current,
      readOnly,
      data: data || {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'Start editing your content here...'
            }
          }
        ]
      },
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3],
            defaultLevel: 2
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: ['bold', 'italic', 'Color']
        },
        list: {
          class: List,
          inlineToolbar: ['bold', 'italic', 'Color']
        },
        Color: {
          class: ColorPlugin,
          config: {
            colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFC107'],
            defaultColor: '#FF1300',
            type: 'text',
            customPicker: true
          }
        }
      },
      onChange: async () => {
        if (onChange && !readOnly) {
          const outputData = await editor.save();
          onChange(outputData);
        }
      }
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, readOnly, onChange]);

  return <div ref={holderRef} className="prose max-w-none" />;
};

export default EditorPreview;