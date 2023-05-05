import { Room } from "./roomSelection";
import { User } from "./roomSelection";

export function renderUserView(room: Room) {
    console.log(room)
    const upcomingTopics = document.querySelector('.upcoming-topics');
    const main = document.querySelector('.main-content');
    const previousTopics = document.querySelector('.previous-topics');
    const footer = document.querySelector('.footer');
    const header = document.querySelector('.header');

    main!.innerHTML = "";
    header!.innerHTML = "";
    header!.innerHTML = 'Rum Admin: ' + room.admin;
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Användare i rummet: ';
    main!.append(h2);

    renderUserCards(room.users)
}

const renderUserCards = (users: User[]) => {
    console.log('renderUserCards' , users)
    const main = document.querySelector(".main-content");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("user-card-container");
  users.forEach((user : User) => {
    const userCard = document.createElement("div");
    cardContainer.classList.add("user-card")
    const userName = document.createElement("h3");
    userName.innerHTML = user.name;
    
    userCard.appendChild(userName)
    cardContainer?.appendChild(userCard);
  })
  main?.appendChild(cardContainer);
}