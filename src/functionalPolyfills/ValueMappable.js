export default class ValueMappable {
    constructor (object) {
        this.object = object;
    }
    map (f) {
        const mapped = {};
        for (const key of Object.keys(this.object) ) {
            mapped[key] = f(this.object[key]);
        }

        return new ValueMappable(mapped);
    }
}