function Car({ doors, state, color }) {
    this.doors = doors || 4;
    this.state = state || "new";
    this.color = color || "silver";
}


function Truck({ state, wheelSize, color }) {
    this.state = state || "used";
    this.wheelSize = wheelSize || "large";
    this.color = color || "blue";
}


function VehicleFactory() {

}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function (options) {
    switch (options.vehicleType) {
        case "car":
            this.vehicleClass = Car;
            break;
        case "truck":
            this.vehicleClass = Truck;
            break
    }

    return new this.vehicleClass(options);
}

export default VehicleFactory;