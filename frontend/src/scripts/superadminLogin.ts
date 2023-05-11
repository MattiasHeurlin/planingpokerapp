const app = document.getElementById('app');

export function superadminLogin() {
    const superadminBtn: HTMLButtonElement = document.createElement('button');
    superadminBtn.innerText = 'Admin';
    superadminBtn.classList.add('superadminBtn');
    app!.append(superadminBtn);

    superadminBtn.addEventListener('click', () => {
        renderSuperadminLoginForm()
    });
}

function renderSuperadminLoginForm() {
    const superadminLoginForm: HTMLFormElement = document.createElement('form');
    const heading: HTMLHeadingElement = document.createElement('h1');
    const username: HTMLInputElement = document.createElement('input');
    const password: HTMLInputElement = document.createElement('input');
    const usernameLabel: HTMLLabelElement = document.createElement('label');
    const passwordLabel: HTMLLabelElement = document.createElement('label');
    const superadminLoginBtn: HTMLButtonElement = document.createElement('button');
    const loginMsg: HTMLParagraphElement = document.createElement('p');
    
    heading.innerHTML = 'Logga in';
    usernameLabel.innerHTML = 'Användarnamn';
    passwordLabel.innerHTML = 'Lösenord';
    superadminLoginBtn.innerText = 'Logga In';

    username.type = 'text';
    password.type = 'password';
    superadminLoginBtn.type = 'submit';
    
    superadminLoginForm.classList.add('superadminLoginContainer');
    username.classList.add('superadminLoginUsername');
    password.classList.add('superadminLoginPassword');
    usernameLabel.classList.add('superadminUsernameLabel');
    passwordLabel.classList.add('superadminPasswordLabel');
    superadminLoginBtn.classList.add('superadminLoginBtn');
    loginMsg.classList.add('superadminLoginMsg');

    usernameLabel.append(username);
    passwordLabel.append(password);
    superadminLoginForm.append(heading, usernameLabel, passwordLabel, superadminLoginBtn, loginMsg);
    app!.innerHTML = '';
    app!.append(superadminLoginForm);

    superadminLoginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const loginData: object = {
            username: username.value,
            password: password.value
        }
        superadminLoginCheck(loginData);
    })
} 

export async function superadminLoginCheck (loginData: object) {
    const loginMsg = document.querySelector('.superadminLoginMsg');

    fetch('http://localhost:3000/superadmin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.message) {
            loginMsg!.innerHTML = data.message;
            return;
        }
        console.log('Superadmin är inloggad')
        renderSessionHistory();
    }) 
}

export function renderSessionHistory() {

    const mockedDataFromDatabase = [ //Mockdata, ska ändras till data från databasen
        {
            admin: { name: 'Joe' },
            previousTopics: [
                { title: 'Skapa admin-vy', score: 5 },
                { title: 'Random topic', score: 3 },
            ],
        },
        {
            admin: { name: 'Jenny' },
            previousTopics: [
                { title: 'Grundläggande styling', score: 1 },
                { title: 'Sätt upp databas', score: 3 },
                { title: 'Skapa login-funktionalitet', score: 1}
            ],
        }
    ]

    const sessionHistoryHeading: HTMLHeadingElement = document.createElement('h1');
    const sessionHistorySubHeading: HTMLHeadingElement = document.createElement('h2');
    const sessionHistoryUl: HTMLUListElement = document.createElement('ul');

    sessionHistoryHeading.innerHTML = 'Planning Poker | Historik';
    sessionHistorySubHeading.innerHTML = 'Klicka på ett namn i listan för att se den sparade sessionen';

    sessionHistoryHeading.classList.add('sessionHistoryHeading');
    sessionHistorySubHeading.classList.add('sessionHistorySubHeading');
    sessionHistoryUl.classList.add('sessionHistoryUl');  

    mockedDataFromDatabase.forEach(session => {
        console.log('session from db mock data =>', session);
        const sessionHistoryLi: HTMLLIElement = document.createElement('li');
        sessionHistoryLi.classList.add('sessionHistoryLi');
        sessionHistoryLi.innerHTML = `Admin: ${session.admin.name}`;
        sessionHistoryUl.append(sessionHistoryLi);

        sessionHistoryLi.addEventListener('click', () => renderSessionInfo(session));
    });

    app!.innerHTML = '';
    app!.append(sessionHistoryHeading, sessionHistorySubHeading, sessionHistoryUl);

    //superadminLogout();
};

function renderSessionInfo(session: any) {
    app!.innerHTML = '';
    
    session.previousTopics.forEach((topic: { title: string; score: number; }) => {
        const topicTitleAndScore: HTMLParagraphElement = document.createElement('p');
        topicTitleAndScore.innerHTML = `Topic: ${topic.title} | Medelvärde: ${topic.score}`;
        topicTitleAndScore.classList.add('topicTitleAndScore');

        app!.append(topicTitleAndScore);
    })
    //superadminBackBtn();
};
