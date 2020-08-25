import React from 'react';
import './model.css';


const model = props => {

    
    return (
        <div
            className="model-container"
            style={{ backgroundColor: props.model.bgColor }}
            onMouseDown={(e) => props.onMouseDown(e, props.model.id)}
            onMouseMove={(e) => props.onMouseMove(e, props.model.id)}
            onMouseUp={props.onMouseUp}
        >
            {/* <label>{props.title}</label> */}
        </div>
    )
}

export default model;