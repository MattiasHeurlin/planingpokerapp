const app = document.getElementById('app');

export function adminLogin() {
    const adminBtn: HTMLButtonElement = document.createElement('button');
    adminBtn.innerText = 'Admin';
    adminBtn.classList.add('adminBtn');
    app!.append(adminBtn);

    adminBtn.addEventListener('click', () => {
        renderAdminLoginForm()
    });
}

function renderAdminLoginForm() {
    const adminLoginForm: HTMLFormElement = document.createElement('form');
    const heading: HTMLHeadingElement = document.createElement('h1');
    const username: HTMLInputElement = document.createElement('input');
    const password: HTMLInputElement = document.createElement('input');
    const usernameLabel: HTMLLabelElement = document.createElement('label');
    const passwordLabel: HTMLLabelElement = document.createElement('label');
    const loginBtn: HTMLButtonElement = document.createElement('button');
    const loginMsg: HTMLParagraphElement = document.createElement('p');
    
    heading.innerHTML = 'Logga in';
    usernameLabel.innerHTML = 'Användarnamn';
    passwordLabel.innerHTML = 'Lösenord';
    loginBtn.innerText = 'Logga In';

    username.type = 'text';
    password.type = 'password';
    loginBtn.type = 'submit';
    
    adminLoginForm.classList.add('adminLoginContainer');
    username.classList.add('adminLoginUsername');
    password.classList.add('adminLoginPassword');
    usernameLabel.classList.add('usernameLabel');
    passwordLabel.classList.add('passwordLabel');
    loginBtn.classList.add('adminLoginBtn');
    loginMsg.classList.add('loginMsg');

    usernameLabel.append(username);
    passwordLabel.append(password);
    adminLoginForm.append(heading, usernameLabel, passwordLabel, loginBtn, loginMsg);
    app!.innerHTML = '';
    app!.append(adminLoginForm);

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const loginData: object = {
            username: username.value,
            password: password.value
        }
        adminLoginCheck(loginData);
    })
} 

export async function adminLoginCheck (loginData: object) {
    const loginMsg = document.querySelector('.loginMsg');

    fetch('http://localhost:3000/admin', {
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
        //Add function to render content when login ok
    }) 
}