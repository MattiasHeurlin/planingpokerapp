const adminContainer = document.querySelector('#app') as HTMLDivElement;

export function printAdminView (){
    createAddNewTopic();
    createUpcomingTopics();
    createStartVoting();
    createNextTopicBtn();
    createCurrentTopic();
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

function createNextTopicBtn(){
    const nextTopicContainer = document.createElement('div') as HTMLDivElement;
    const nextTopicBtn = document.createElement('button') as HTMLButtonElement;
    
    nextTopicBtn.innerText = 'Nästa topic';

    adminContainer.appendChild(nextTopicContainer);
    nextTopicContainer.appendChild(nextTopicBtn);
}

function createCurrentTopic(){
    const currentTopicContainer = document.createElement('div') as HTMLDivElement;
    const currentTopicTitleContainer = document.createElement('div') as HTMLDivElement;
    const curretnTopicTitle = document.createElement('p') as HTMLParagraphElement;
    const userAndAverageValueContainer = document.createElement('div') as HTMLDivElement;
    const userContainer = document.createElement('div') as HTMLDivElement;
    const userName = document.createElement('p') as HTMLParagraphElement;
    const userPoints = document.createElement('p') as HTMLParagraphElement;
    const averageValueContainer = document.createElement('div') as HTMLDivElement;
    const averageValueTitle = document.createElement('p') as HTMLParagraphElement;
    const averageValue = document.createElement('p') as HTMLParagraphElement;

    curretnTopicTitle.innerText = 'Test topic just nu';
    userName.innerText = 'Test Namn';
    userPoints.innerText = 'Tänker...';
    averageValueTitle.innerText = 'Medelvärde';
    averageValue.innerText = 'Test 123';

    adminContainer.appendChild(currentTopicContainer);
    currentTopicContainer.appendChild(currentTopicTitleContainer);
    currentTopicTitleContainer.appendChild(curretnTopicTitle);
    currentTopicContainer.appendChild(userAndAverageValueContainer);
    userAndAverageValueContainer.appendChild(userContainer);
    userContainer.appendChild(userName);
    userContainer.appendChild(userPoints);
    userAndAverageValueContainer.appendChild(averageValueContainer);
    averageValueContainer.appendChild(averageValueTitle);
    averageValueContainer.appendChild(averageValue);
}


