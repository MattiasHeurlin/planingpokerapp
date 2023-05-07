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

    usernameLabel.append(username);
    passwordLabel.append(password);
    adminLoginForm.append(heading, usernameLabel, passwordLabel, loginBtn);
    app!.innerHTML = '';
    app!.append(adminLoginForm);
} 

//Todo: Add fetch & login functionality