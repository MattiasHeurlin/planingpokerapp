const adminContainer = document.querySelector('#app') as HTMLDivElement;

export function printAdminView (){
    createAddNewTopic();
    createUpcomingTopics();
    createStartVoting();
}

function createAddNewTopic(){
    const addNewTopicContainer = document.createElement('div') as HTMLDivElement;
    const addTopicTitle = document.createElement('p') as HTMLParagraphElement;
    const addTopicInput = document.createElement('input') as HTMLInputElement;
    const addNewTopicBtn = document.createElement('button') as HTMLButtonElement;

    addTopicTitle.innerText = 'Lägg till topic';
    addTopicInput.placeholder = 'Ny topic';
    addNewTopicBtn.innerText = 'Lägg till';

    adminContainer.appendChild(addNewTopicContainer);
    addNewTopicContainer.appendChild(addTopicTitle);
    addNewTopicContainer.appendChild(addTopicInput);
    addNewTopicContainer.appendChild(addNewTopicBtn);
}

function createUpcomingTopics(){
    const upcomingTopicsContainer = document.createElement('div') as HTMLDivElement;
    const upcomingTopicsTitle = document.createElement('h3') as HTMLHeadingElement;
    const topicContainer = document.createElement('div') as HTMLDivElement;
    const removeUpcomingTopicBtn = document.createElement('button') as HTMLButtonElement;
    const upcomingTopic = document.createElement('p') as HTMLParagraphElement;
    const moveTopicUpBtn = document.createElement('button') as HTMLButtonElement; 
    const moveTopicDownBtn = document.createElement('button') as HTMLButtonElement;
    
    upcomingTopicsTitle.innerText = 'Kommande topics';
    removeUpcomingTopicBtn.innerText = '-';
    upcomingTopic.innerText =  'Test';
    moveTopicDownBtn.innerText = 'Ner';
    moveTopicUpBtn.innerText = 'Upp';

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
    
    startVotingBtn.innerText = 'Starta röstningen';

    adminContainer.appendChild(startVotingContainer);
    startVotingContainer.appendChild(startVotingBtn);
}


