import React from 'react';
import { connect } from 'react-redux';

import './css/SideBar.css';
import Task from './task';

class sideBar extends React.Component {



    render() {

        const tasks = this.props.tasksModels
        const values = Object.values(tasks).map(task =>
            <button
                key={task.id}
                id="side-bar-button"
                onClick={() => this.props.addTask(task.id)}
            >
                <Task
                    task={task}
                />
            </button>
        );

        return (
            <div className="row side-bar">
                <span
                    className="col-md-12"
                    id="side-bar-title"
                >
                    Tools
                </span>
                <button onClick={this.props.linkMode}>
                    Link Tasks
                </button>
                {values}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        tasksModels: state.tasks.tasksModels,
    };
};

export default connect(mapStateToProps)(sideBar);