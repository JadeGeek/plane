"use client"
import { EditorContainer, EditorContentWrapper, getEditorClassNames, useReadOnlyEditor } from '@plane/editor-core';
import * as React from 'react';

interface ICoreReadOnlyEditor {
  value: string;
  editorContentCustomClassNames?: string;
  noBorder?: boolean;
  borderOnFocus?: boolean;
  customClassName?: string;
}

interface EditorCoreProps extends ICoreReadOnlyEditor {
  forwardedRef?: React.Ref<EditorHandle>;
}

interface EditorHandle {
  clearEditor: () => void;
  setEditorValue: (content: string) => void;
}

const LiteReadOnlyEditor = ({
  editorContentCustomClassNames,
  noBorder,
  borderOnFocus,
  customClassName,
  value,
  forwardedRef,
}: EditorCoreProps) => {
  const editor = useReadOnlyEditor({
    value,
    forwardedRef,
  });

  const editorClassNames = getEditorClassNames({ noBorder, borderOnFocus, customClassName });

  if (!editor) return null;

  return (
    <EditorContainer editor={editor} editorClassNames={editorClassNames}>
      <div className="flex flex-col">
        <EditorContentWrapper editor={editor} editorContentCustomClassNames={editorContentCustomClassNames} />
      </div>
    </EditorContainer >
  );
};

const LiteReadOnlyEditorWithRef = React.forwardRef<EditorHandle, ICoreReadOnlyEditor>((props, ref) => (
  <LiteReadOnlyEditor {...props} forwardedRef={ref} />
));

LiteReadOnlyEditorWithRef.displayName = "LiteReadOnlyEditorWithRef";

export { LiteReadOnlyEditor , LiteReadOnlyEditorWithRef };
