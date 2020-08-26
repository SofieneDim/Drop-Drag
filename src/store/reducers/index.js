import { combineReducers } from 'redux';

import tasksReducer from './TasksReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
});

export default rootReducer;