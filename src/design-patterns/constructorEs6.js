class Kindom {
    constructor ( name, capital ) {
        this.name= name;
        this.capital= capital
    }

    toString() {
        return `The ${this.name} with capital @ ${this.capital}`
    }
}

export {Kindom}