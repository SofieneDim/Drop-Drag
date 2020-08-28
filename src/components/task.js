import React from 'react';
import './css/task.css';


const task = props => {


    return (
        <div
            className="col-md-12 row"
            key={props.task.id}
        >
            <div className="col-md-12">
                <img id="task-icon"
                    alt="" src={props.task.icon}
                    style={{ pointerEvents: "none", backgroundColor: props.task.color }}
                />
            </div>
            <div className="col-md-12">
                <label>{props.task.title}</label>
            </div>
        </div>
    )
}

export default task;