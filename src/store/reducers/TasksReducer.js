import * as actionTypes from '../actions/actionsTypes';
import updateObject from '../../utils/updateObject';
import task from '../../components/task';

// import userMale from '../../assets/icons/user-male.png';
// import home from '../../assets/icons/home.png';
// import money from '../../assets/icons/money.png';
// import letter from '../../assets/icons/secured-letter.png';

const initialState = {
    tasksModels: {},
    domTasks: [],
};

const tasksReducer = function (state = initialState, action) {
    let domTasks = null;
    switch (action.type) {
        case actionTypes.ADD_TASK:
            domTasks = [...state.domTasks];
            domTasks.push(action.data);
            const newState = {
                ...state,
                domTasks: domTasks,
            };
            return newState;
        case actionTypes.UPDATE_TASK:
            domTasks = [...state.domTasks];
            if (action.data.link)
                for (let task of domTasks)
                    if (task.id === action.data.task.id)
                        task.link = action.data.link;

            if (action.data.initialState)
                for (let task of domTasks)
                    if (task.id === action.data.task.id)
                        task.initialPosition = action.data.initialState;
            return updateObject(state, [...domTasks]);

        case actionTypes.SET_TASKS_MODELS:
            domTasks = action.data;
            Object.values(domTasks).map(task => task.modelId = task.id)
            const tasks = { domTasks: action.data, tasksModels: action.data };
            return updateObject(state, tasks);

        default:
            return state;
    };
};

export default tasksReducer;