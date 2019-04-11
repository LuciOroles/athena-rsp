import abstractFactory  from './design-patterns/abstractFactory';
import Westeros from './design-patterns/prototypePattern';
import {Kindom} from './design-patterns/constructorEs6';
import run  from './design-patterns/adapterPattern';
import VehicleFactory from './design-patterns/factoryPattern2';
import introGen from './generators/introGen';
import asynquce from './generators/asynquce';

// let jamie = new Westeros.Famillies.Lannister();
//     jamie.swordSkills =9;
//     jamie.wealth=10;
//     jamie.charm=6;
//     console.log(jamie);

// let tyrion = jamie.clone();
//     tyrion.charm=10;
//     tyrion.swordSkills=1;

//     console.log(tyrion);
// let cersei= jamie.clone();
//     cersei.charm=8;
//     cersei.swordSkills=0;
//     console.log(cersei);

// let WesterosI = new Kindom('Westeros', 'King\'s Landing');
//     console.log(WesterosI.toString());

//     run();



// var carFactory = new VehicleFactory();

// var car1 = carFactory.createVehicle({
//     vehicleType: "car",
//     color: "red",
//     doors: 5
// });

// var car2 = carFactory.createVehicle({
//     vehicleType: "truck",
//     wheelSize: "x-tra large",
//     color: "lime"
// })

var country = {
    name: "A country",
    capital: "A capital",
    getInfo: function () {
        return `The ${this.name} has the captial @ ${this.capital}`
    }
};

let uganda = Object.create(country);

// console.log(car1, car2);

uganda.name="Uganda";
uganda.capital="Kampala";
console.log(uganda.getInfo());


introGen();
asynquce();
