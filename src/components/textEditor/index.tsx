"use client";

import React from "react";

import { UseFormRegister } from "react-hook-form";
import { Node, useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import { ColumnExtension } from "@gocapsule/column-extension";
// dont forget css
// import "@gocapsule/column-extension/src";

import cs from "../../scss/helpers.module.scss";
import s from "./addPostEditor.module.scss";

import BlockQuoteSVG from "../../../public/img/editor/blockquote.svg";
import BoldSVG from "../../../public/img/editor/bold.svg";
import H1SVG from "../../../public/img/editor/h1.svg";
import H2SVG from "../../../public/img/editor/h2.svg";
import ItalicSVG from "../../../public/img/editor/italic.svg";
import OlistSVG from "../../../public/img/editor/olist.svg";
import UlistSVG from "../../../public/img/editor/ulist.svg";
import RedoSVG from "../../../public/img/editor/redo.svg";
import UndoSVG from "../../../public/img/editor/undo.svg";
import StrikeSVG from "../../../public/img/editor/strikethrough.svg";
import UnderlineSVG from "../../../public/img/editor/underline.svg";

type EditorBarProps = {
  editor: Editor | null;
};
const EditorBar: React.FC<EditorBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = React.useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className={`${s.bar} ${cs.input}`}>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
          <H1SVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
          <H2SVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}>
          <BoldSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}>
          <ItalicSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}>
          <UnderlineSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}>
          <StrikeSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}>
          <UlistSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}>
          <OlistSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}>
          <BlockQuoteSVG />
        </button>
        <button
          type="button"
          onClick={() => addImage()}
          className={editor.isActive("blockquote2") ? "is-active" : ""}>
          img
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetColumns().run()}
          className={editor.isActive("blockquote3") ? "is-active" : ""}>
          col-
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColumns(2).run()}
          className={editor.isActive("blockquote4") ? "is-active" : ""}>
          col+
        </button>
        {/* 
        <div className="icon" onClick={() => editor.chain().focus().unsetColumns().run()}>
        <TbLayoutOff />
      </div>
      <div className="icon" onClick={() => editor.chain().focus().setColumns(3).run()}>
        <BsLayoutThreeColumns />
      </div> */}
      </div>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <UndoSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <RedoSVG />
        </button>
      </div>
    </div>
  );
};

type TextEditorProps = {
  setContent: (text: string, json: JSONContent) => void;
  defaultContent?: JSONContent;
  error: string | undefined;
  register: UseFormRegister<any>;
  name: string;
  textContent: string;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  setContent,
  defaultContent,
  register,
  error,
  name,
  textContent,
}) => {
  const testRef = React.useRef(null);

  const editor = useEditor({
    // element: testRef.current?.querySelector("[contenteditable]") || undefined,
    extensions: [StarterKit, Underline, Image, ColumnExtension],
    content: defaultContent ?? "",

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const text = editor.getText();

      setContent(text, json);
    },
  });

  const onContentFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const focusable = e.currentTarget.querySelector("[tabindex='0']") as HTMLElement;
    focusable?.focus();
  };

  return (
    <div className={`${s.root} ${error ? cs.inputWrapperActive : cs.inputWrapper}`}>
      <EditorBar editor={editor} />
      <EditorContent
        ref={testRef}
        editor={editor}
        onFocus={onContentFocus}
        className={`${s.content} ${cs.article} ${cs.input}`}
        tabIndex={0}
      />

      <input {...register(name)} type="hidden" value={textContent} />

      <strong className={cs.inputMessage}>{error ?? ""}</strong>
    </div>
  );
};

// "@tiptap/extension-color": "^2.1.13",
// "@tiptap/extension-text-style": "^2.1.13",
// "@tiptap/extension-underline": "^2.1.13",
// "@tiptap/html": "^2.1.13",
// "@tiptap/pm": "^2.1.13",
// "@tiptap/react": "^2.1.13",
// "@tiptap/starter-kit": "^2.1.13",
