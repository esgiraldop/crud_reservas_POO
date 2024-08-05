import { dashboard } from "./pages/private/dashboard.js";
import { login } from "./pages/public/login.js";

let users = [];
let reservations = [];


if(!localStorage.getItem('users') && !localStorage.getItem('bookings')){

    users = JSON.parse(localStorage.getItem('users')) || [
        { 
            name: 'Admin',
            password: '123',
            roll: '1' 
        },
        {
            name: 'Erick',
            password: '123',
            roll: '0'
        }
    ];
    
    reservations = JSON.parse(localStorage.getItem('reservations')) || [
        { name: 'The netherlands', state: true, user:'Erick' },
        { name: 'Belgium', state: false, user:'Admin' },
        { name: 'Paris', state: false, user:'Erick' }
        
    ];
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('reservations', JSON.stringify(reservations));

}


document.addEventListener("DOMContentLoaded", () => {
    users = JSON.parse(localStorage.getItem('users')) || users;
    reservations = JSON.parse(localStorage.getItem('reservations')) || reservations;

    login(users);

    if(localStorage.getItem('token')){
        dashboard(reservations);
    }

});




