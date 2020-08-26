import * as actionsTypes from './actionsTypes';

export const addTask = task => {
    return dispatch => {
        dispatch({
            type: actionsTypes.ADD_TASK,
            data: task
        });
    };
};

export const updateTask = data => {
    return dispatch => {
        dispatch({
            type: actionsTypes.UPDATE_TASK,
            data: data
        });
    };
};