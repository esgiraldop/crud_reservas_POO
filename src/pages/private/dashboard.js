import { Reservation } from "../../classes/Reservations.js";

export const dashboard = (arrayBookings) => {
    const root = document.getElementById('root');

    const addBookings = (arrayBookings) => {
        let elements = '';
        
        const login = JSON.parse(localStorage.getItem('login'));
        if(arrayBookings.length === 0)return
        let reservas = arrayBookings.filter(reserva => reserva.user === login.name)

        if(login.roll === '1'){
            reservas = arrayBookings;
        }

        reservas.forEach((element, index) => {
            const row = `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.state}</td>
                    <td>${element.user}</td>
                    <td><button class="delete" data-index="${index}">Delete</button></td>
                    <td><button class="update" data-index="${index}">Update</button></td>
                </tr>
            `;
            elements += row;
        });
        return elements;
    }

    const renderDashboard = () => {
        const elements = addBookings(arrayBookings);
        const dashboardHtml = `
            <table>
                <thead>
                    <tr>
                        <th>Reservas</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    ${elements}
                </tbody>
            </table>
            <button id="add">Agregar reserva</button>
            <button id="logout">Salir</button>
        `;
        root.innerHTML = dashboardHtml;

        const $deleteButtons = document.getElementsByClassName('delete');
        for (let i = 0; i < $deleteButtons.length; i++) {
            $deleteButtons[i].addEventListener('click', () => {
                const index = $deleteButtons[i].getAttribute('data-index');
                arrayBookings.splice(index, 1); 
                renderDashboard(); 
            });
        }

        const $add = document.getElementById('add');
        $add.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('login'));
            const booking = prompt('Ingrese la descripcion de la reserva: ')
            const book = new Reservation(booking, false, user.name);
            
            const bookingsSetLocalStorage = JSON.parse(localStorage.getItem('reservations'));
            bookingsSetLocalStorage.push(book);
            localStorage.setItem('reservations', JSON.stringify(bookingsSetLocalStorage));
            window.location.reload();
        });

        const $logout = document.getElementById('logout');
        $logout.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            window.location.reload();
        });

        const $update = document.getElementsByClassName('update');
        for (let i = 0; i < $update.length; i++) {
            $update[i].addEventListener('click', () => {
                const newBooking = prompt('Ingrese el nuevo destino de la reserva');
                if (newBooking !== null) {
                    const index = $update[i].getAttribute('data-index');
                    arrayBookings[index].name = newBooking; 
                    updateLocalStorage(arrayBookings);
                    renderDashboard();
                }
            });
        }
    }

    

    const updateLocalStorage = (arrayBookings) => {
        localStorage.setItem('bookings', JSON.stringify(arrayBookings));
    }

    renderDashboard(); 
}
