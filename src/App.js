import React from 'react';
import Droppable from './components/Droppable';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {

  onDragEnd = () => {
    console.log('onDragEnd:');
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
        </div>
      </DragDropContext>
    );
  };
}

export default App;
