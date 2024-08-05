import { register } from "./register.js";

export const login = (array) => {
    if(localStorage.getItem('token')){
        return
    }
    const root = document.getElementById('root');

    const element = `
        <div id="login-form-container">
            <div id="login-container">
                <input class="name-login" type="text" name="username" placeholder="username" />
                <input class="password-login" type="password" name="password" placeholder="password" />
                <button class="submit-button" id="submit">Login</button>
                <button class="register-button" id="register" >Register</button>
            </div>
        </div>
    `;

    root.innerHTML = "";
    root.innerHTML = element;


    const btnRegister = document.getElementById('register');
    btnRegister.addEventListener('click', () => {
        register(array)
    });

    const $submit = document.getElementById('submit');
    $submit.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        
        const search = array.find(user => user.name === username && user.password === password);
        
        if(search){
            localStorage.setItem('token', '123');
            localStorage.setItem('login', JSON.stringify(search));
            window.location.reload();
        };
    });

}