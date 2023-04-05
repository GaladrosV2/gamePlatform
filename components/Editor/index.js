import React from "react";
import withAuth from "../../pages/api/withAuth";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";

import index from "./index.module.scss";
import MenuBar from "./MenuBar";

const tiptapEditor = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
    },
  });

  return (
    <div className={index.editor}>
      <MenuBar editor={editor} />
      <EditorContent className={index.content} editor={editor} />
    </div>
  );
};

export default withAuth(tiptapEditor);
