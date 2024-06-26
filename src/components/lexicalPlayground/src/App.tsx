"use client";

import * as React from "react";
import Image from "next/image";
import parse from "html-react-parser";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { useSettings } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext, useSharedHistoryContext } from "./context/SharedHistoryContext";

import { TableContext } from "./plugins/TablePlugin";
import HtmlPlugin from "./plugins/HTMLPlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import Editor from "./Editor";
import logo from "./images/logo.svg";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.",
);

export function App(): JSX.Element {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const [content, setContent] = React.useState("");

  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? undefined : "",
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const html = parse(content, {
    replace: (domNode) => {
      if ("name" in domNode && domNode.name === "img") {
        const imgGrandParent = domNode?.parent?.parent;

        if (imgGrandParent && "attribs" in imgGrandParent) {
          if (imgGrandParent.attribs?.class === "PlaygroundEditorTheme__layoutItem") {
            return (
              <div
                style={{
                  maxWidth: "100%",
                  position: "relative",
                  paddingTop: "92.94%",
                }}>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4UeEjjERyEVTOIaXIKHlj7snPZAKulH5-z1Kau1lsw&s"
                  alt=""
                  fill
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          }
        }

        if ("attribs" in domNode) {
          // БРАТЬ РАЗМЕРЫ ТОЛЬКО ИЗ URL
          const width = +domNode.attribs.width;
          const height = +domNode.attribs.height;

          return (
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4UeEjjERyEVTOIaXIKHlj7snPZAKulH5-z1Kau1lsw&s"
              alt=""
              width={width}
              height={height}
              style={{
                width,
                height,
              }}
            />
          );
        }
      }
    },
  });

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              {/* <header>
                <a href="https://lexical.dev" target="_blank" rel="noreferrer">
                  <img src={logo} alt="Lexical Logo" />
                </a>
              </header> */}
              <div className="editor-shell">
                <Editor />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
        <HtmlPlugin onHtmlChanged={(html) => setContent(html)} initialHtml="" />
      </LexicalComposer>

      {/* <div
        style={{
          maxWidth: "1100px",
          marginInline: "auto",
          padding: "30px",
          wordBreak: "break-word",
        }}
        dangerouslySetInnerHTML={{ __html: content }}></div> */}

      <div
        data-editor-dev={false}
        style={{
          maxWidth: "1100px",
          marginInline: "auto",
          // padding: "30px",
          wordBreak: "break-word",
        }}>
        {html}
      </div>
    </>
  );
}

//
// export function App(): JSX.Element {
//   const {
//     settings: { isCollab, emptyEditor, measureTypingPerf },
//   } = useSettings();

//   const [content, setContent] = React.useState("");

//   const initialConfig = {
//     editorState: isCollab ? null : emptyEditor ? undefined : "",
//     namespace: "Playground",
//     nodes: [...PlaygroundNodes],
//     onError: (error: Error) => {
//       throw error;
//     },
//     theme: PlaygroundEditorTheme,
//   };

//   return (
//     <>
//       <LexicalComposer initialConfig={initialConfig}>
//         <SharedHistoryContext>
//           <TableContext>
//             <SharedAutocompleteContext>
//               <header>
//                 <a href="https://lexical.dev" target="_blank" rel="noreferrer">
//                   <img src={logo} alt="Lexical Logo" />
//                 </a>
//               </header>
//               <div className="editor-shell">
//                 <Editor />
//               </div>
//               {/* <Settings /> */}
//               {/* {isDevPlayground ? <DocsPlugin /> : null}
//             {isDevPlayground ? <PasteLogPlugin /> : null}
//             {isDevPlayground ? <TestRecorderPlugin /> : null}

//             {measureTypingPerf ? <TypingPerfPlugin /> : null} */}
//             </SharedAutocompleteContext>
//           </TableContext>
//         </SharedHistoryContext>
//         <HtmlPlugin
//           onHtmlChanged={(html) => setContent(html)}
//           initialHtml="<h1>Test</h1><p>Lorem ipsum dolor sit amet</p>"
//         />
//       </LexicalComposer>

//       <div
//         style={{ maxWidth: "1100px", marginInline: "auto", padding: "30px" }}
//         dangerouslySetInnerHTML={{ __html: content }}></div>
//     </>
//   );
// }

// export default function PlaygroundApp(): JSX.Element {
//   return (
//     <SettingsContext>
//       <App />
//       <a
//         href="https://github.com/facebook/lexical/tree/main/packages/lexical-playground"
//         className="github-corner"
//         aria-label="View source on GitHub">
//         <svg
//           width="80"
//           height="80"
//           viewBox="0 0 250 250"
//           style={{
//             border: "0",
//             color: "#eee",
//             fill: "#222",
//             left: "0",
//             position: "absolute",
//             top: "0",
//             transform: "scale(-1,1)",
//           }}
//           aria-hidden="true">
//           <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
//           <path
//             d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
//             fill="currentColor"
//             style={{
//               transformOrigin: "130px 106px",
//             }}
//             className="octo-arm"
//           />
//           <path
//             d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
//             fill="currentColor"
//             className="octo-body"
//           />
//         </svg>
//       </a>
//     </SettingsContext>
//   );
// }
