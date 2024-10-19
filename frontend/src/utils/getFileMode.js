export const getFileMode = ({ selectedFile }) => {
  const extension = selectedFile.split('.').pop();

  switch (extension) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "py":
      return "python";
    case "rs":
      return "rust"
    case "java":
      return "java";
    case "xml":
      return "xml";
    case "rb":
      return "ruby";
    case "sass":
      return "sass";
    case "md":
      return "markdown";
    case "sql":
      return "mysql";
    case "json":
      return "json";
    case "html":
      return "html";
    case "hbs":
      return "handlebars";
    case "handlebars":
      return "handlebars";
    case "go":
      return "go";
    case "cs":
      return "csharp";
    case "litcoffee":
      return "coffee";
    case "css":
      return "css";
    case "cpp":
      return "cpp"
    default:
      return "plaintext";
  }
};
