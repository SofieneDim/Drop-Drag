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
    styles: {
      "1": { left: "8px", top: "80px" },
      "2": { left: "8px", top: "197px" },
      "3": { left: "8px", top: "310px" },
      "4": { left: "8px", top: "425px" },
    },
    dragging: false,
    showDrop: false,
    linkMode: false,
    fromOrigin: false,
    firstLinkTaskId: null,
    secondLinkTaskId: null,
    stylePos: {},
    newTask: { taskId: 0, modelId: 0 },
  };

  dragStart = (e, taskId) => {
    if (this.state.linkMode)
      this.linkTasks(taskId);
    else {
      this.addTask_2(taskId);
      const stylePos = this.state.stylePos;
      stylePos[taskId] = {
        ...this.state.stylePos,
        diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
        diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      };
      this.setState({
        stylePos,
        dragging: true,
        fromOrigin: true,
      });
    };
  };

  linkTasks = async taskId => {
    if (!this.state.firstLinkTaskId)
      return this.setState({ firstLinkTaskId: taskId });
    else {
      await this.setState({ secondLinkTaskId: taskId });
      const task = this.props.tasks.domTasks.filter(item => item.id === this.state.firstLinkTaskId)[0];
      this.props.updateTask({
        task,
        link: this.state.secondLinkTaskId,
      });
      this.props.addArrow(task.id, this.state.secondLinkTaskId);
      this.setState({ linkMode: false, firstLinkTaskId: null, secondLinkTaskId: null });
    };
  };

  dragging = (e, id) => {
    if (this.state.dragging && this.state.stylePos[id]) {
      const styles = this.state.styles;
      var left = e.screenX - this.state.stylePos[id].diffX;
      var top = e.screenY - this.state.stylePos[id].diffY;
      styles[id] = {
        left: left,
        top: top,
      };
      this.setState(styles);
    };
  };


  dragEnd = (e, taskId) => {
    this.setState({
      dragging: false
    });
    if (this.state.fromOrigin) return this.setState({ fromOrigin: false });
    const task = this.props.tasks.domTasks.filter(item => item.id === taskId)[0];
    const domTask = document.getElementById(task.id);
    const left = domTask.getBoundingClientRect().left;
    const top = domTask.getBoundingClientRect().top;
    const newTask = {
      ...task,
      initialPosition: { left, top },
    };
    this.props.updateTask({ taskId, newTask });
  };

  showDrop = (modelId, taskId) => {
    const newTask = { taskId: "task_" + taskId, modelId };
    this.setState({ showDrop: true, newTask });
  };

  addTask = () => {
    this.setState({ showDrop: false });
    const newTask = this.state.newTask;
    const taskModel = { ...this.props.tasks.tasksModels[newTask.modelId] };
    taskModel.title = newTask.title;
    taskModel.id = newTask.taskId;
    this.props.addNewTask(taskModel);
  };

  addTask_2 = taskId => {
    const id = this.props.tasks.domTasks.length;
    const newTaskId = "task_" + id;
    const clickedTask = this.props.tasks.domTasks.filter(item => item.id === taskId)[0];
    const modelId = clickedTask.modelId;
    const taskModel = { ...this.props.tasks.tasksModels[(modelId - 1)] };
    const newTask = {
      ...taskModel,
      taskId: newTaskId,
      id: newTaskId,
      modelId
    };
    this.props.addNewTask(newTask);
  };



  render() {
    const domTasks = this.props.tasks.domTasks.reverse().map(task => {
      const initialPosition = this.props.tasks.tasksModels[task.modelId - 1].initialPosition;
      const classes = task.id === this.state.secondLinkTaskId || task.id === this.state.firstLinkTaskId
        ? "tasks-container-border-bg"
        : !this.state.linkMode ? "tasks-container" : "tasks-container-border";
      return <div
        className={classes}
        key={task.id}
        id={task.id}
        style={this.state.styles[task.id] ? this.state.styles[task.id] : initialPosition}
        onMouseDown={(e) => this.dragStart(e, task.id)}
        onMouseMove={(e) => this.dragging(e, task.id)}
        onMouseUp={(e) => this.dragEnd(e, task.id)}
      >
        <Task
          task={task}
          key={task.id}
        />
      </div>
    });

    return (
      <div className="Row">
        <div className="col-md-2">
          <SideBar
            addTask={this.addTask_2}
            linkMode={() => this.setState({ linkMode: true })}
          />
        </div>
        {
          this.state.showDrop
          && <div className="col-md-2">
            <DetailDropDown
              addTask={this.addTask}
              addTitle={e => this.setState({ newTask: { ...this.state.newTask, title: e.target.value } })}
            />
          </div>
        }
        {domTasks}
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
    updateTask: data => dispatch(actionsCreator.updateTask(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
