
function Person(spec) {
    var person = spec;
    //metods
    person.getDisplayName= getDisplayName;

    return person;

    function getDisplayName() {
        return this.firstName + " " + this.lastName;
    }
}

function Employ (spec) {
    var employee = Person(spec); // var that = otherConstructor(spec)
    employee.id = spec.id;
    employee.hourlyRate = spec.hourlyRate;

    //employee methods
    employee.calculatePay = calculatePay;

    return employee;

    function calculatePay(hoursWorked) {
        return employee.hourlyRate*hoursWorked;
    }

export default function () {
    var Romica = Employ({
        firstName: 'Romica',
        lastName: 'Şoia',
        hourlyRate:2,
        id:1
    });
 
    return {
        fullName:(Romica.getDisplayName()),
        banii: Romica.calculatePay(20)
    };
}