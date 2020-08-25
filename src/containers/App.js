import React from 'react';

import Model from './model';

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
    styles: {},
    stylePos: {},
  };

  dragStart = (e, id) => {
    const stylePos = this.state.stylePos;
    stylePos[id] = {
      ...this.state.stylePos,
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
    }
    this.setState({
      stylePos,
      dragging: true,
    });
  };

  dragging = (e, id) => {
    const styles = this.state.styles;

    if (this.state.dragging) {
      var left = e.screenX - this.state.stylePos[id].diffX;
      var top = e.screenY - this.state.stylePos[id].diffY;


      styles[id] = {
        left: left,
        top: top,
      }
      this.setState(styles);
    }

  }


  dragEnd = () => {
    this.setState({
      dragging: false
    });
  }

  addItem = () => {

  }

  render() {

    const domModels = this.state.models.map(model =>
      <div
          className="model-container_2"
          style={this.state.styles[model.id]}
          onMouseDown={(e) => this.dragStart(e, model.id)}
          onMouseMove={(e) => this.dragging(e, model.id)}
          onMouseUp={this.dragEnd}
        >
          <Model
            title={model.title}
            key={model.id}
            className="model-container"
            style={this.state.styles[model.id]}
            model={{model}}
            onMouseDown={(e) => this.dragStart(e, model.id)}
            onMouseMove={(e) => this.dragging(e, model.id)}
            onMouseUp={this.dragEnd}
          />
        </div>
    )

    return (
      <div className="App">
        {domModels}

        {/* <div
          className="model-container_2"
          style={this.state.styles[1]}
          onMouseDown={(e) => this.dragStart(e, 1)}
          onMouseMove={(e) => this.dragging(e, 1)}
          onMouseUp={this.dragEnd}
        >
          <Model
            title={"model.title"}
            key={"model.id"}
            className="model-container"
            style={this.state.styles[1]}
            model={{
              title: "first",
              id: 1,
              bgColor: "red"
            }}
            onMouseDown={(e) => this.dragStart(e, 1)}
            onMouseMove={(e) => this.dragging(e, 1)}
            onMouseUp={this.dragEnd}
          />
        </div> */}

        {/* <button onClick={this.addItem}>
        Add
        </button> */}
      </div>
    );
  };
}

export default App;
