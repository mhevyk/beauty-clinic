import parse, { DOMNode, domToReact } from "html-react-parser";
import { PropsWithChildren } from "react";

import DOMPurify from "dompurify";

import "@/styles/app-editor/app-editor-content/AppEditorContent.scss";
import { AppEditorContentProps } from "@/styles/app-editor/app-editor-content/AppEditorContent.types";
import AppQuote from "@/styles/app-quote/AppQuote";
import AppTypography from "@/styles/app-typography/AppTypography";

const Text = ({
  attribs,
  children,
}: PropsWithChildren<{ attribs: Record<string, string> }>) => {
  const bold = Boolean(attribs["data-bold"]);
  const oblique = Boolean(attribs["data-oblique"]);
  const underline = Boolean(attribs["data-underline"]);

  return (
    <AppTypography
      fontWeight={bold ? "bold" : undefined}
      oblique={oblique}
      underline={underline}
    >
      {children}
    </AppTypography>
  );
};

const Heading = ({ children }: PropsWithChildren) => {
  return (
    <AppTypography variant="h6" fontWeight="bold" as="h2">
      {children}
    </AppTypography>
  );
};

const AppEditorContent = ({ value }: AppEditorContentProps) => {
  const sanitizedContent = DOMPurify.sanitize(value);

  return (
    <div className="app-editor-content">
      {parse(sanitizedContent, {
        replace: domNode => {
          const { attribs = {}, children } = domNode as unknown as {
            attribs: Record<string, string>;
            children: DOMNode[];
          };

          const elementType = attribs["data-element"];

          switch (elementType) {
            case "paragraph":
              return <Text attribs={attribs}>{domToReact(children)}</Text>;
            case "heading":
              return <Heading>{domToReact(children)}</Heading>;
            case "blockquote":
              return <AppQuote>{domToReact(children)}</AppQuote>;
          }
        },
      })}
    </div>
  );
};

export default AppEditorContent;
