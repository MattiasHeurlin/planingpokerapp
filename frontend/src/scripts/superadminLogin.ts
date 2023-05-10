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
        //Add function to render content when login ok
    }) 
}