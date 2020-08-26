import React from 'react';
import { connect } from 'react-redux';

import * as actionsCreator from '../store/actions';

import Task from './task';
import SideBar from './SideBar';
import DetailDropDown from './DetailDropDown';

class App extends React.Component {

  state = {
    models: [
      {
        title: "first",
        id: 1,
        bgColor: "red"
      },
      {
        title: "second",
        id: 2,
        bgColor: "yellow"
      },
      {
        title: "third",
        id: 3,
        bgColor: "blue"
      },
      {
        title: "forth",
        id: 4,
        bgColor: "green"
      },
      {
        title: "fivth",
        id: 5,
        bgColor: "brown"
      },
    ],
    diffX: 0,
    diffY: 0,
    dragging: false,
    showDrop: false,
    styles: {},
    stylePos: {},
    newTask: {},
  };

  dragStart = (e, id) => {
    const stylePos = this.state.stylePos;
    stylePos[id] = {
      ...this.state.stylePos,
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
    };
    this.setState({
      stylePos,
      dragging: true,
    });
  };

  dragging = (e, id) => {
    const styles = this.state.styles;
    if (this.state.dragging && this.state.stylePos[id]) {
      var left = e.screenX - this.state.stylePos[id].diffX;
      var top = e.screenY - this.state.stylePos[id].diffY;
      styles[id] = {
        left: left,
        top: top,
      };
      this.setState(styles);
    };
  };


  dragEnd = () => {
    this.setState({
      dragging: false
    });
  };

  showDrop = taskId => {
    const newTask = { id: taskId };
    this.setState({ showDrop: true, newTask });
  };



  addTask = () => {
    this.setState({ showDrop: false });
    const newTask = this.state.newTask;
    const taskModel = this.props.tasks.tasksModels[newTask.id];
    taskModel.title = newTask.title;
    this.props.addNewTask(taskModel);
  };

  render() {
    const initialPosition = { left: "100px", top: "100px" };
    const domModels = this.props.tasks.domTasks.map(task =>
      <div
        className="tasks-container"
        key={task.id}
        style={this.state.styles[task.id] ? this.state.styles[task.id] : initialPosition}
        onMouseDown={(e) => this.dragStart(e, task.id)}
        onMouseMove={(e) => this.dragging(e, task.id)}
        onMouseUp={this.dragEnd}
      >
        <Task
          task={task}
          key={task.id}
        />
      </div>
    )

    return (
      <div className="Row">




        <div className="col-md-2">
          <SideBar
            addTask={(this.showDrop)}
          />
        </div>



        {
          this.state.showDrop
          && <div className="col-md-2">
            <DetailDropDown
              addTask={(this.addTask)}
              addTitle={e => this.setState({ newTask: { ...this.state.newTask, title: e.target.value } })}
            />
          </div>
        }


        {domModels}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewTask: task => dispatch(actionsCreator.addTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
