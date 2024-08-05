
export class Person {
    constructor(name, password,roll=0) {
        this.name = name;
        this.password = password;
        this.roll = roll
    };

    addReservation(){
        console.log("Reserva agregada");
    }
}

export class RegularPerson extends Person{
    register(){
        console.log("registered sucessfully");
    }
}

export class Admin extends Person {
    addUser(name, array){
        array.push(name);
        console.log(`User ${name} added successfully!`);
    };
    delete(){
        console.log("User deleted");
    }
    updateReservation(){
        console.log("Reservation updated");
    }
}
