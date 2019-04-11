console.log('counter here');

// import h from 'hyperscript'
import hh from 'hyperscript-helpers';
import {h, diff, patch} from 'virtual-dom';
import { createElement } from 'virtual-dom/create-element'

const { div, button } = hh(h);
const initModel = 0;
const MSGS =  {
    ADD: 'ADD',
    SUBSTRACT: 'SUBSTRACT'
};

function view(dispatch, model) {
    return div([
        div({
            className: 'mv2'
        }, `Count: ${model}`
        ),
        button({className: 'pv1 ph2 mr2', onclick: () =>dispatch(MSGS.ADD)}, '+'),
        button({className: 'pv1 ph2', onclick: () => dispatch(MSGS.SUBSTRACT)}, '-')
    ])
}

function view0(dispatch, model) {
  return   div([
        div({
            className: 'mv2'
        }, "test")]);
}


function update(msg, model) {
    switch (msg) {
        case MSGS.ADD:
            return model + 1
        case MSGS.SUBSTRACT:
            return model - 1
        default:
            return model
    }
}

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView); //v2
         node.appendChild(rootNode); //v2 
    // node.appendChild(currentView);

    function dispatch(msg) {
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView); //v2
             rootNode = patch(rootNode, patches); //v2
        // node.replaceChild(updatedView, currentView); v1
        currentView = updatedView;
    }
}

const rootNode = document.getElementById('app');

app(initModel, update, view0, rootNode);
// rootNode.appendChild(view(initModel))