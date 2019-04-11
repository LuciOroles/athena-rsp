import initModel  from './calories/model';
import  view  from './calories/view';
import  update from './calories/update';
import updateInputs from './calories/view';

console.log(initModel);

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    // let rootNode = createElement(currentView);
        node.appendChild(currentView);

    function dispatch(msg) {
        console.log('msg @ dispacth', msg);
        model = update(msg, model);
        updateInputs(msg);
        // const updatedView = view(dispatch, model);
        // // const patchs = diff(currentView, updatedView);
        // //     rootNode = patch(rootNode, patchs);
        // node.replaceChild(updatedView, currentView);
        // currentView = updatedView;
    }
}

const node=    document.getElementById("app");

app(initModel, update, view, node);