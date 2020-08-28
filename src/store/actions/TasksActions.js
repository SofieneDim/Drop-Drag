import * as actionsTypes from './actionsTypes';
import axios from '../../api/axios-orders';

export const addTask = task => {

    return async dispatch => {

        const url = "http://localhost:5000/add-dom-task";
        try {
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            };

            const data = {
                id: task.id, modelId: task.modelId, initialPosition: task.initialPosition
            };

            const response = await axios.post(url, data, headers);
            if (response.status === 200) {
                console.log('response:', response.data)

                getTasks();

            };
        } catch (error) {
            console.error(error);
        };

        console.log('dispatch')
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

export const getTasks = () => {
    return async dispatch => {
        const url = "http://localhost:5000";
        let tasks = {};
        try {
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            };
            const response = await axios.get(url, { headers: headers });
            if (response.status === 200) {
                tasks = response.data;
            };
        } catch (error) {
            console.error(error);
        };
        dispatch({
            type: actionsTypes.SET_TASKS_MODELS,
            data: tasks.tasksModels,
        });
    };
};