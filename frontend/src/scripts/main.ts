import '../style.css';
import { io } from "socket.io-client";
import { getAllRooms } from './roomSelection';


export const socket = io('http://localhost:3000');

socket.emit("test");

socket.on("test", (arg) => {
  console.log(arg)
})
function init(): void {
  getAllRooms();
}

init();
