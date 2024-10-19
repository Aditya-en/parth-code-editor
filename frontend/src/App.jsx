import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import Terminal from "./components/terminal";
import FileTree from "./components/tree";
import socket from "./socket";
import AceEditor from "react-ace";
import {Editor} from "@monaco-editor/react"
import { getFileMode } from "./utils/getFileMode";

function App() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [terminalHeight, setTerminalHeight] = useState(200); // Terminal height state
  const [filesWidth, setFilesWidth] = useState(250); // File section width state
  const [theme, setTheme] = useState("dark"); // Manage theme state

  const dragHandleRef = useRef(null);
  const terminalContainerRef = useRef(null);

  const isSaved = selectedFileContent === code;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Apply theme to root element
  }, [theme]);

  useEffect(() => {
    if (!isSaved && code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files");
    const result = await response.json();
    console.log(result.tree)
    setFileTree(result.tree);
  };

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `http://localhost:9000/files/content?path=${selectedFile}`
    );
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  // Handle dragging to resize the terminal
  const handleMouseMove = (e) => {
    const newHeight = window.innerHeight - e.clientY;
    setTerminalHeight(newHeight);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle dragging to resize the file tree
  const handleFilesMouseMove = (e) => {
    const newWidth = e.clientX;
    setFilesWidth(newWidth);
  };

  const handleFilesMouseUp = () => {
    document.removeEventListener("mousemove", handleFilesMouseMove);
    document.removeEventListener("mouseup", handleFilesMouseUp);
  };

  const handleFilesMouseDown = () => {
    document.addEventListener("mousemove", handleFilesMouseMove);
    document.addEventListener("mouseup", handleFilesMouseUp);
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="playground-container">
      <div className="editor-container">
        <div
          className="files"
          style={{ width: `${filesWidth}px` }} // Dynamic width for file section
        >
          
          <FileTree
            onSelect={(path) => {
              setSelectedFileContent("");
              setSelectedFile(path);
            }}
            tree={fileTree}
          />
   
        </div>

        {/* Drag handle to resize files section */}
        <div
          className="drag-handle-vertical"
          onMouseDown={handleFilesMouseDown}
        ></div>

        <div className="editor">
          {selectedFile && (
            <p >
              {selectedFile.replaceAll("/", " > ")}{" "}
              <span className="save">{isSaved ? "Saved" : "Unsaved"}</span>
              <button className="btn-theme" onClick={toggleTheme} style={{ alignSelf: 'flex-end'}}>
              {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
            </button>
            </p>
          )}
          {/* <AceEditor
            width="100%"
            mode={getFileMode({ selectedFile })}
            value={code}
            
            onChange={(e) => setCode(e)}
          /> */}
          <Editor
            height={"100%"}
            width={"100%"}
            language={getFileMode({ selectedFile }) || "javascript"}  // Set language based on file type
            theme={theme === "light" ? "vs-light" : "vs-dark"} // Switch theme based on state
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
      </div>

      {/* Drag handle to resize terminal */}
      <div className="drag-handle" onMouseDown={handleMouseDown}></div>

      <div
        className="terminal-container"
        ref={terminalContainerRef}
        style={{ height: terminalHeight }}
      >
        <Terminal />
      </div>
    </div>
  );
}

export default App;
