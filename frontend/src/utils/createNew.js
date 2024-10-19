import socket from "../socket";
const createNewFile = () =>{
    const fileName = prompt("Enter the file name")
    if (!fileName) return;
    socket.emit("terminal:write",`touch ${fileName}\n`)
}
const createNewFolder = () =>{
    const folderName = prompt("Enter the Folder name")
    if (!folderName) return;
    socket.emit("terminal:write",`mkdir ${folderName}\n`)
}


export {createNewFile, createNewFolder}
