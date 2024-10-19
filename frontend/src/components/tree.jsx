import { FaJs, FaPython, FaRust, FaJava, FaFileCode } from 'react-icons/fa';
import { SiCplusplus, SiC, SiTypescript, SiGo, SiRuby, SiPhp, SiSwift } from 'react-icons/si';
import { DiHtml5, DiCss3 } from 'react-icons/di';

// Function to get file icons based on file extensions
const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'js':
      return <FaJs color="#f7df1e" size={20} />;           // JavaScript
    case 'ts':
      return <SiTypescript color="#007acc" size={20} />;    // TypeScript
    case 'py':
      return <FaPython color="#3776ab" size={20} />;        // Python
    case 'cpp':
    case 'cxx':
      return <SiCplusplus color="#00599c" size={20} />;     // C++
    case 'c':
      return <SiC color="#00599c" size={20} />;             // C
    case 'java':
      return <FaJava color="#007396" size={20} />;          // Java
    case 'go':
      return <SiGo color="#00add8" size={20} />;            // Go
    case 'rs':
      return <FaRust color="#dea584" size={20} />;          // Rust
    case 'html':
      return <DiHtml5 color="#e34c26" size={20} />;         // HTML
    case 'css':
      return <DiCss3 color="#1572b6" size={20} />;          // CSS
    case 'rb':
      return <SiRuby color="#cc342d" size={20} />;          // Ruby
    case 'php':
      return <SiPhp color="#777bb4" size={20} />;           // PHP
    case 'swift':
      return <SiSwift color="#f05138" size={20} />;         // Swift
    default:
      return <FaFileCode size={20} />;                      // Default icon for other files
  }
};

const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
    const isDir = !!nodes;
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (isDir) return;
          onSelect(path);
        }}
        style={{ marginLeft: "10px" }}
      >
        
        <p className={isDir ? "dir" : "file-node"}><span>{!isDir && getFileIcon(fileName)}</span><span>{fileName}</span></p>
        {nodes && fileName !== "node_modules" && (
          <ul>
            {Object.keys(nodes).map((child) => (
              <li key={child}>
                <FileTreeNode
                  onSelect={onSelect}
                  path={path + "/" + child}
                  fileName={child}
                  nodes={nodes[child]}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  const FileTree = ({ tree, onSelect }) => {
    return <div className="tree">
      <FileTreeNode onSelect={onSelect} fileName="" path="" nodes={tree} />
    </div>
  };
  export default FileTree;
  