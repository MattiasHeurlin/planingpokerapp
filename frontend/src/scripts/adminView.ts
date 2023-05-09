import { Room } from "./roomSelection";
//import { renderUserCards } from "./userView";
import { socket } from "./main";

const adminContainer = document.querySelector('#adminView') as HTMLDivElement;
adminContainer.classList.add('grid')

export function printAdminView (room: Room){
    console.log(room)
    createAddNewTopic();
    createUpcomingTopicsAdmin();
    createStartVoting();
    createNextTopicBtn();
    createCurrentTopic(room);
    createPreviousTopics(room);
    createEndBtn();
    //renderUserCards(room.users);
}

// export default function getRoom(/*e*/) {

//     //let id = e.target.id;

//     fetch(`http://localhost:3000/rooms/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         if (data.length === 0) {
//           console.log("No rooms found");
//         }
//         printAdminView(/*data*/);
//       });
//   }

function createAddNewTopic(){
    const addNewTopicContainer = document.createElement('div') as HTMLDivElement;
    const addTopicTitle = document.createElement('p') as HTMLParagraphElement;
    const addTopicInput = document.createElement('input') as HTMLInputElement;
    const addNewTopicBtn = document.createElement('button') as HTMLButtonElement;

    addNewTopicContainer.classList.add('admin-add-topic')
    addTopicTitle.innerText = 'Lägg till topic';
    addTopicInput.placeholder = 'Ny topic';
    addNewTopicBtn.innerText = 'Lägg till';

    adminContainer.appendChild(addNewTopicContainer);
    addNewTopicContainer.appendChild(addTopicTitle);
    addNewTopicContainer.appendChild(addTopicInput);
    addNewTopicContainer.appendChild(addNewTopicBtn);
}

function createUpcomingTopicsAdmin(/*room*/){

    const upcomingTopicsContainer = document.createElement('div') as HTMLDivElement;
    const upcomingTopicsTitle = document.createElement('h3') as HTMLHeadingElement;
    const topicContainer = document.createElement('div') as HTMLDivElement;
    const removeUpcomingTopicBtn = document.createElement('button') as HTMLButtonElement;
    const upcomingTopic = document.createElement('p') as HTMLParagraphElement;
    const moveTopicUpBtn = document.createElement('button') as HTMLButtonElement; 
    const moveTopicDownBtn = document.createElement('button') as HTMLButtonElement;

    upcomingTopicsContainer.classList.add('admin-upcoming-topics')
    upcomingTopicsTitle.innerText = 'Kommande topics';
    removeUpcomingTopicBtn.innerText = '-';
    upcomingTopic.innerText =  'Test';
    moveTopicDownBtn.innerText = 'Ner';
    moveTopicUpBtn.innerText = 'Upp';

    moveTopicDownBtn.addEventListener('click', (e: any) => {
        const direction = e.currentTarget.innerText.toLowerCase()
        socket.emit('changeTopicOrder', direction)
    })

    adminContainer.appendChild(upcomingTopicsContainer);
    upcomingTopicsContainer.appendChild(upcomingTopicsTitle);
    upcomingTopicsContainer.appendChild(topicContainer);
    topicContainer.appendChild(removeUpcomingTopicBtn);
    topicContainer.appendChild(upcomingTopic);
    topicContainer.appendChild(moveTopicUpBtn);
    topicContainer.appendChild(moveTopicDownBtn);
}

function createStartVoting(){
    const startVotingContainer = document.createElement('div') as HTMLDivElement;
    const startVotingBtn = document.createElement('button') as HTMLButtonElement;
    
    startVotingContainer.classList.add('admin-start-vote')
    startVotingBtn.innerText = 'Starta röstningen';

    adminContainer.appendChild(startVotingContainer);
    startVotingContainer.appendChild(startVotingBtn);
}

function createNextTopicBtn(){
    const nextTopicContainer = document.createElement('div') as HTMLDivElement;
    const nextTopicBtn = document.createElement('button') as HTMLButtonElement;
    
    nextTopicContainer.classList.add('admin-next-topic')
    nextTopicBtn.innerText = 'Nästa topic';

    adminContainer.appendChild(nextTopicContainer);
    nextTopicContainer.appendChild(nextTopicBtn);
}

function createCurrentTopic(room: Room){

    console.log(room.currentTopic)
    const currentTopicContainer = document.createElement('div') as HTMLDivElement;
    const currentTopicTitleContainer = document.createElement('div') as HTMLDivElement;
    const currentTopicTitle = document.createElement('p') as HTMLParagraphElement;
    const userAndAverageValueContainer = document.createElement('div') as HTMLDivElement;
    const averageValueContainer = document.createElement('div') as HTMLDivElement;
    const averageValueTitle = document.createElement('p') as HTMLParagraphElement;
    const averageValue = document.createElement('p') as HTMLParagraphElement;

    currentTopicContainer.classList.add('admin-main-content')
    currentTopicTitle.innerText = `${room.currentTopic[0].title}`;
    averageValueTitle.innerText = 'Medelvärde';
    averageValue.innerText = `${room.currentTopic[0].score}`;

    adminContainer.appendChild(currentTopicContainer);
    currentTopicContainer.appendChild(currentTopicTitleContainer);
    currentTopicTitleContainer.appendChild(currentTopicTitle);
    currentTopicContainer.appendChild(userAndAverageValueContainer);
    userAndAverageValueContainer.appendChild(averageValueContainer);
    averageValueContainer.appendChild(averageValueTitle);
    averageValueContainer.appendChild(averageValue);
}

function createPreviousTopics(room: Room){
    console.log(room.finishedTopics)
    const previousTopicContainer = document.createElement('div') as HTMLDivElement;
    const previousTopicsTitle = document.createElement('h3') as HTMLHeadingElement;
    
    previousTopicContainer.classList.add('admin-previous-topics')
    previousTopicsTitle.innerText = 'Tidigare topics';
    previousTopicContainer.appendChild(previousTopicsTitle);

    for (let i = 0; i < room.finishedTopics.length; i++) {
        const topicContainer = document.createElement('div') as HTMLDivElement;
        const previousTopic = document.createElement('p') as HTMLParagraphElement;
        previousTopic.innerText = room.finishedTopics[i].title;
        previousTopicContainer.appendChild(topicContainer);
        topicContainer.appendChild(previousTopic); 
    }

    adminContainer.appendChild(previousTopicContainer);
}

function createEndBtn(){
    const endContainer = document.createElement('div') as HTMLDivElement;
    const endBtn = document.createElement('button') as HTMLButtonElement;
    
    endContainer.classList.add('admin-end')
    endBtn.innerText = 'Avsluta';

    adminContainer.appendChild(endContainer);
    endContainer.appendChild(endBtn);
}


