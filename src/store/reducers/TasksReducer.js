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
            initialPosition: { left: "9px", top: "80px" },
        },
        "2": {
            id: 2,
            icon: home,
            color: "green",
            Form: "circle",
            initialPosition: { left: "9px", top: "200px" },
        },
        "3": {
            id: 3,
            icon: money,
            color: "red",
            Form: "circle",
            initialPosition: { left: "9px", top: "310px" },
        },
        "4": {
            id: 4,
            icon: letter,
            color: "brown",
            Form: "circle",
            initialPosition: { left: "9px", top: "425px" },
        },
    },
    domTasks: [
        {
            id: 1,
            modelId: 1,
            icon: userMale,
            color: "grey",
            Form: "circle",
            link: [],
        },
        {
            id: 2,
            modelId: 2,
            icon: home,
            color: "green",
            Form: "circle",
            link: [],
        },
        {
            id: 3,
            modelId: 3,
            icon: money,
            color: "red",
            Form: "circle",
            link: [],
        },
        {
            id: 4,
            modelId: 4,
            icon: letter,
            color: "brown",
            Form: "circle",
            link: [],
        },
    ],
};

const tasksReducer = function (state = initialState, action) {
    let domTasks = null;
    switch (action.type) {
        case actionTypes.ADD_TASK:
            domTasks = state.domTasks.push(action.data);
            return updateObject(state, domTasks);
        case actionTypes.UPDATE_TASK:
            domTasks = [...state.domTasks];
            for (let task of domTasks)
                if (task.id === action.data.task.id)
                    task.link = action.data.link;
            return updateObject(state, [...domTasks]);
        default:
            return state;
    };
};

export default tasksReducer;