function gizmo (id) {
    return  {
        id: id,
        toString: function() {
            return "gizmo " + this.id;
        }
    }
}

function hoozit(id) {
    var that = gizmo(id);
    that.test = function (testid) {
        return testid===this.id;
    }
    return that;
}


export default function () {
    let aGizmo = gizmo("12zrV");
    let aHoozit = hoozit("ra31vv");

    return  {
        giz: aGizmo.toString(),
        hoz: aHoozit.toString()
    }
}
