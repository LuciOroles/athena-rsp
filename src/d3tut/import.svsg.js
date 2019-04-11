import * as  d3 from 'd3';

function createCircle(spec) {
    //x, y coords, color
    var circle = spec;
    circle.draw = function (_target) {
        // console.log('taget', _target);
        return _target.append("circle")
            .attr('r', Math.sqrt(spec.r))
            .attr('cx', spec.x)
            .attr('cy', spec.y)
            .attr('fill', spec.color)
    };
    return circle;
}

function groupWrapper() {
    var groupRef = [];
    return {
        getGroupRef() {
            return groupRef;
        },
        addGroupElement(groupSpec) {
            console.log(groupRef.length);
            groupRef[groupRef.length] = createGroup(groupSpec);
            groupSpec.id=groupRef.length;
        }
    }
}

function createGroup(spec) {
    var group = spec;
    ///exepect group.circles

    group.draw = function (elementOfGroup) {
        let _tGroup = spec.target.append("g");
            // console.log(_tGroup)           
            elementOfGroup.draw(_tGroup);
    }

    group.newDraw = function() {
        var _tGroup = spec.target.append("g");
        _tGroup.attr("class", "circle-group");
        group.setOfCircles.forEach((c, i) => {
                    c.x = c.x + (20 * (i + 1));
                    c.y = spec.ycoord ;
                    let c1 = createCircle(c);
                    c1.draw(_tGroup);
        });
    }
    return group;
}

const append = function () {
    let _target = d3.select('body').append('svg');
    let initialX = 50, intialY = 55;

    let circleSet = [
        { x: initialX, y: intialY, r: 90, color: 'green' },
        { x: initialX, y: intialY, r: 80, color: '#333' },
        { x: initialX, y: intialY, r: 10, color: '#f3f3' },
        { x: initialX, y: intialY, r: 20, color: 'orange' }
    ];

    let groupSets = [{ ycoord: 55, setOfCircles: circleSet  }, { ycoord: 155, setOfCircles:circleSet }, { ycoord: 255, setOfCircles: circleSet }]
    let masterGroupWrapper = groupWrapper();
    

    //  _target.attr("transform","scale(3)");

    groupSets.forEach((group)=>{
        let _group1 = createGroup({
            "target": _target,
            setOfCircles: group.setOfCircles,
            ycoord: group.ycoord
        });
        _group1.newDraw();
    });

    // groupSets.forEach((group) => {
    //     let _group1 = createGroup({
    //         "target": _target
    //     });
    //     masterGroupWrapper.addGroupElement(_group1);

    //     circleSet.forEach((c, i) => {
    //         c.x = c.x + (20 * (i + 1));
    //         c.y = group.ycoord;
    //         let c1 = createCircle(c);
    //                 _group1.draw(c1)
    //     });

    // });

};
export default append;