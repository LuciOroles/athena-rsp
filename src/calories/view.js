import h from 'hyperscript'
import hh from 'hyperscript-helpers';
import {showFormMessage, 
    mealInputMsg, 
    caloriesInputMsg,
    saveMealMsg } from './update';

const { pre, div, h1, button, form, label, input } = hh(h);

function filedSet(labelText, inputValuee, oninput, id) {
    return div([
        label({ className: 'db mb1' }, labelText),
        input({
            id,
            className: 'pa2 input-reset ba w-100 mb2',
            type: 'text',
            value: inputValuee,
            onkeyup: oninput
        })
    ])
}

function buttonSet(dispatch) {
    return div([
        button({
            className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
            type: 'submit'
        }, 'Save'),
        button({
            className: 'f3 pv2 ph3 bg-light-gray dim',
            type: 'button',
            onclick: ()=>dispatch(showFormMessage(false))
        }, 'Cancel')
    ])
}



function formView(dispatch, model) {
    console.log('model', model);
    const { description, calories, showForm } = model;

    if (showForm) {
        return form({
            className: 'w-100 mv2',
            onsubmit: e=>{
                e.preventDefault();
                dispatch(saveMealMsg);
            }
        },
            [
                filedSet('Meal', description, e=>{
                    e.target.focus();
                   return dispatch(mealInputMsg(e.target.value)); }, 'meal' ),
                filedSet('Calories', calories || '', 
                e=>dispatch(caloriesInputMsg(e.target.value)), 'calories' ),
                buttonSet(dispatch)
            ]
        );
    }
    else {
       return    button({
            className: 'f3 pv2 ph3 bg-blue white bn',
            onclick: ()=> dispatch(showFormMessage(true))
        },
            'Add meal'
        )
    }

}

export function updateInputs(msg) {
    console.log (msg);
    let updateArray=[];

    updateArray.forEach((el, index)=>{
        console.log(el);
    })
}

function view(dispatch, model) {

    return div({
        className: 'mw6 center'
    },
        [
            h1({
                className: 'f2 pv2 bb'
            }, 'Calorie couter'),
            formView(dispatch, model),
            pre(JSON.stringify(model, null, 3))
        ]
    );

}

export default view;