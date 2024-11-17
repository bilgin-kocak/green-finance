import React from "react";

const parseMarkup = (markup: string) => {
  const lines = markup.split("\n").filter((line) => line.trim() !== "");
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    if (line.startsWith("1.")) {
      const content = line.slice(2).trim();
      elements.push(<li key={index}>{parseLine(content)}</li>);
    } else {
      elements.push(<p key={index}>{parseLine(line)}</p>);
    }
  });

  return elements;
};

const parseLine = (line: string) => {
  const boldPattern = /\*\*(.*?)\*\*/g;
  const italicPattern = /\*(.*?)\*/g;

  let parts = line
    .split(boldPattern)
    .map((part, i) =>
      i % 2 === 1 ? <strong key={`bold-${i}`}>{part}</strong> : part
    );

  parts = parts.flatMap((part) =>
    typeof part === "string"
      ? part
          .split(italicPattern)
          .map((part, i) =>
            i % 2 === 1 ? <em key={`italic-${i}`}>{part}</em> : part
          )
      : [part]
  );

  return parts;
};

export default parseMarkup;
