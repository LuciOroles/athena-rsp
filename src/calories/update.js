import * as R from 'ramda';

export const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    MEAL_INPUT: 'MEAL_INPUT',
    CALORIES_INPUT: 'CALORIES_INPUT',
    SAVE_MEAL: 'SAVE_MEAL'
};

export function mealInputMsg(description) {
    return {
        type: MSGS.MEAL_INPUT,
        description: description
    }
}

export function caloriesInputMsg(description) {
    console.log('caloriesIn ', description);
    return {
        type: MSGS.CALORIES_INPUT,
        description: description
    }
}




export function showFormMessage(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    }
}

export const saveMealMsg = { type: MSGS.SAVE_MEAL };

function update(msg, model) {
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            const  {showForm}  = msg;
            return { ...model, showForm, description: '', calories: 0 }
        }
        case MSGS.MEAL_INPUT: {
            const {description} = msg;
            return { ...model, description };
        }
        case MSGS.CALORIES_INPUT: {
            const calories  =  R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.description);
            // console.log('calories ', calories, msg.description);
            return {...model, calories};
        }
        case MSGS.SAVE_MEAL: {
            return add(msg, model)
        }
        default: {
            return model;
        }
    }
}


function add(msg, model) {
    const {nextId, description, calories} = model; //unpacking
    const meal = {id: nextId, description, calories};
    const meals = [...model.meals, meal];
    return {
        ...model,
        meals,
        nextId: nextId+1,
        description: '',
        calories: 0,
        showForm: false
    };
}



export default update;