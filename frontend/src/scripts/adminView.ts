const adminContainer = document.querySelector('#adminView') as HTMLDivElement;
adminContainer.classList.add('grid')
export function printAdminView (){
    createAddNewTopic();
    createUpcomingTopics();
    createStartVoting();
    createNextTopicBtn();
    createCurrentTopic();
    createPreviousTopics();
    createEndBtn();
}

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

function createUpcomingTopics(){
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

    currentTopicContainer.classList.add('admin-main-content')
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

function createPreviousTopics(){
    const previousTopicContainer = document.createElement('div') as HTMLDivElement;
    const previousTopicsTitle = document.createElement('h3') as HTMLHeadingElement;
    const topicContainer = document.createElement('div') as HTMLDivElement;
    const previousTopic = document.createElement('p') as HTMLParagraphElement;

    previousTopicContainer.classList.add('admin-previous-topics')
    previousTopicsTitle.innerText = 'Tidigare topics';
    previousTopic.innerText =  'Test';

    adminContainer.appendChild(previousTopicContainer);
    previousTopicContainer.appendChild(previousTopicsTitle);
    previousTopicContainer.appendChild(topicContainer);
    topicContainer.appendChild(previousTopic);
}

function createEndBtn(){
    const endContainer = document.createElement('div') as HTMLDivElement;
    const endBtn = document.createElement('button') as HTMLButtonElement;
    
    endContainer.classList.add('admin-end')
    endBtn.innerText = 'Avsluta';

    adminContainer.appendChild(endContainer);
    endContainer.appendChild(endBtn);
}


