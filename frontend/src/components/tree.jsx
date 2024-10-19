// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';

// export function SimpleTree() {
//   return (
//     <SimpleTreeView >
//       <TreeItem itemId="1" label="Item 1" />
//       <TreeItem itemId="2" label="Item 2" />
//       <SimpleTreeView>
//         <TreeItem itemId='3' label="inner 1"/>
//         <TreeItem itemId='4' label="inner 2"/>
        
//       </SimpleTreeView>
//     </SimpleTreeView>
//   );
// }

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
        <p className={isDir ? "dir" : "file-node"}>{fileName}</p>
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
    );
  };
  
  const FileTree = ({ tree, onSelect }) => {
    return <div className="tree">
      <FileTreeNode onSelect={onSelect} fileName="" path="" nodes={tree} />;
    </div>
  };
  export default FileTree;
  