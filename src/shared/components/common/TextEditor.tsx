import { ContentState, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface MyEditorProps {
  initialValue?: string;
  onChange: (text: string) => void;
}
export const TextEditor = ({ initialValue, onChange }: MyEditorProps) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialValue) {
      const contentBlock = htmlToDraft(initialValue);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );

      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const html = draftToHtml(convertToRaw(content));
    onChange(html);
  };

  return (
    <div className="text-editor">
      <Editor
        placeholder="Nhập nội dung chi tiết "
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};
