import * as actionsTypes from './actionsTypes';
import axios from '../../api/axios-orders';

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

export const getTasksModels = data => {



    return async dispatch => {
        const url = "http://localhost:5000"; //"https://jsonplaceholder.typicode.com/todos/1"


        try {
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            };
            const response = await axios.get(url, { headers: headers });
            if (response.status === 200) {
                console.log('response.status:', response)

            };



            axios.get(url)
                .then((response) => {
                    console.log("GET Response")
                    console.log(response.data);
                    data = response.data;

                    response.send(data);
                })
                .catch(function (error) {
                    console.log("Error in fetching market updates");
                });
        } catch (error) {
            console.error(error);
        }


        dispatch({
            type: actionsTypes.SET_TASKS_MODELS,
            data: data
        });
    };
};