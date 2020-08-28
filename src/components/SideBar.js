import React from 'react';
import { connect } from 'react-redux';

import './css/SideBar.css';
import Task from './task';

class sideBar extends React.Component {

    state = {
        taskId: 15,
    };

    addTask = async modelId => {
        await this.setState({ taskId: this.state.taskId + 1 });
        this.props.addTask(modelId, this.state.taskId);
    };

    render() {
        const tasks = { ...this.props.tasksModels }
        const tasksModels = Object.values(tasks).map(model =>
            <button
                key={model.id}
                id="side-bar-button"
            // onClick={() => this.addTask(model.id)}
            >
                <Task
                    task={model}
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
                {tasksModels}
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