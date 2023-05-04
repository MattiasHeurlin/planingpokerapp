const app = document.querySelector<HTMLDivElement>("#app")!;

export interface Rooms {
  admin: string;
  users: Users[];
  usersWhoLeft: string[];
  topics: Topics[];
}
export interface Users {
  name: string;
  id: string; // socket id
}
export interface Topics {
  title: string;
  score: number;
}
export function getAllRooms() {
  fetch("http://localhost:3000/rooms")
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        console.log("No rooms found");
      }
      renderRooms(data);
    });
}

export function renderRooms(rooms: Rooms[]) {
  const div = document.createElement("div");
  div.classList.add("room-select-container");
  

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    const inputContainer = document.createElement("div");
    const roomName = document.createElement("h2");
    roomName.innerText = room.admin;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = 'Skriv in ditt namn'
    const button = document.createElement("button");
    
    button.innerText = "Gå med";
    button.addEventListener("click", () => {
      // joinRoom(input.value, i), Ska ske genom socket.io.
    });

    inputContainer.append(input, button);
    roomDiv.append(roomName, inputContainer);
    div.append(roomDiv);
  }
;
  app.append(div);
}
