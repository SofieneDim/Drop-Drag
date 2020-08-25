import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import initialData from './initialData';
import '@atlaskit/css-reset';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';


class Main extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) return;

    if(
      destination.droppableID === source.droppableId 
      && destination.index=== source.index
    ) return;

    const column = this.state.columns[source.droppableId];
    const newTasksIds = Array.from(column.taskIds);
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTasksIds,
    };

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {this.state.columOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return [<Column key={column.id} column={column} tasks={tasks} />,
            <Column key={column.id} column={column} tasks={tasks} />];
        })}
      </DragDropContext>
    );
  };
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
