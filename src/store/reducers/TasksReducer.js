import * as actionTypes from '../actions/actionsTypes';
import updateObject from '../../utils/updateObject';

import userMale from '../../assets/icons/user-male.png';
import home from '../../assets/icons/home.png';
import money from '../../assets/icons/money.png';
import letter from '../../assets/icons/secured-letter.png';

const initialState = {
    tasksModels: {
        "1": {
            id: 1,
            icon: userMale,
            color: "grey",
            Form: "circle",
        },
        "2": {
            id: 2,
            icon: home,
            color: "green",
            Form: "circle",
        },
        "3": {
            id: 3,
            icon: money,
            color: "red",
            Form: "circle",
        },
        "4": {
            id: 4,
            icon: letter,
            color: "brown",
            Form: "circle",
        },
    },
    domTasks: [{
        id: 1,
        title: "First Task",
        icon: "data:image/png;base64,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",
        color: "grey",
        Form: "circle",
        link: "A"
    }],
};

const tasksReducer = function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            const domTasks = state.domTasks.push(action.data);
            return updateObject(state, domTasks);
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    };
};

export default tasksReducer;