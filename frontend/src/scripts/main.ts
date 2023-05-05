import '../style.css';
import { io } from "socket.io-client";
import { getAllRooms } from './roomSelection';
const app = document.querySelector('#app');

export const socket = io('http://localhost:3000');

socket.emit("test");

socket.on("test", (arg) => {
  console.log(arg)
})
function init(): void {
  getAllRooms();
}

socket.on("userAlreadyInRoom", (data) => {
  console.log(data);
  const error = document.createElement("p");
  error.innerText = "Namnet är upptaget, välj ett annat";
  app!.append(error);
});

init();
