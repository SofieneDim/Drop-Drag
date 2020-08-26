import React from 'react';
import './css/task.css';


const task = props => {


    return (
        <div
            className="col-md-12"
            key={props.task.id}
        >
            <img id="task-icon"
                alt="" src={props.task.icon}
                style={{ pointerEvents: "none", backgroundColor: props.task.color }}
            />
            <label>{props.task.title}</label>
        </div>
    )
}

export default task;