"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { BLUR_COMMAND, COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from "lexical";

export const useEditorFocus = () => {
  const [editor] = useLexicalComposerContext();
  // Possibly use useRef for synchronous updates but no re-rendering effect
  const [isFocusChanged, setIsFocusChanged] = useState<{}>(false);

  // useEffect(
  //   () =>
  //     editor.registerCommand(
  //       BLUR_COMMAND,
  //       () => {
  //         setIsFocusChanged(false);
  //         return false;
  //       },
  //       COMMAND_PRIORITY_LOW,
  //     ),
  //   [],
  // );

  useEffect(
    () =>
      editor.registerCommand(
        FOCUS_COMMAND,
        (e) => {
          console.log("focus");
          setIsFocusChanged({});
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    [],
  );

  return isFocusChanged;
};
