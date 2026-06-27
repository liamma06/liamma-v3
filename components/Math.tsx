import katex from "katex";

interface Props { formula: string; }

export function BlockMath({ formula }: Props) {
  const html = katex.renderToString(formula, { displayMode: true, throwOnError: false });
  return <div dangerouslySetInnerHTML={{ __html: html }} style={{ overflowX: "auto", margin: "1.25rem 0" }} />;
}

export function InlineMath({ formula }: Props) {
  const html = katex.renderToString(formula, { displayMode: false, throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
