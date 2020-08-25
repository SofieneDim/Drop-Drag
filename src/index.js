import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import initialData from './initialData';
import '@atlaskit/css-reset';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';


class Main extends React.Component {
  state = initialData;

  onDragEnd = () => {
    console.log('onDragEnd: ');
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {this.state.columOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
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
