import React from 'react';

import Model from './model';

class App extends React.Component {

  state = {
    models: [
      { title: "first" },
      { title: "second" },
      { title: "third" },
      { title: "forth" },
      { title: "fivth" },
      { title: "six" },
      { title: "seventh" },
    ],
    diffX: 0,
    diffY: 0,
    dragging: false,
    styles: {},
  };

  dragStart = e => {
    console.log("eeee")
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true
    })
  }

  dragging = e => {

    if(this.state.dragging) {
      var left = e.screenX - this.state.diffX;
      var top = e.screenY - this.state.diffY;

      this.setState({
          styles: {
              left: left,
              top: top
          }
      });
  }
  }

  dragEnd = () => {
    this.setState({
      dragging: false
    });
  }

  render() {

    const domModels = this.state.models.map(model =>
      <Model
        title={model.title}
        style={this.state.styles}
        onMouseDown={this.dragStart}
        onMouseMove={this.dragging}
        onMouseUp={this.dragEnd}
      />)

    return (
      <div className="App">
        {/* {domModels} */}
        <div
          className="model-container"
          style={this.state.styles}
          onMouseDown={this.dragStart}
          onMouseMove={this.dragging}
          onMouseUp={this.dragEnd}
        >
          <Model
            title={"model.title"}
          />
        </div>
      </div>
    );
  };
}

export default App;
