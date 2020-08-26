import * as actionsTypes from './actionsTypes';

export const addTask = taskModel => {
    return dispatch => {
        dispatch({
            type: actionsTypes.ADD_TASK,
            data: taskModel
        });
    };
};