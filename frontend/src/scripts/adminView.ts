const adminContainer = document.querySelector('#app') as HTMLDivElement;

export function printAdminView (){
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


