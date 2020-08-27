import React from 'react';

import DraggableArea from "./DraggableArea";
import { connect } from 'react-redux';

class App extends React.Component {

    state = {
        arrows: [],
        arrowsIds: [],
    };


    componentDidMount = async prevProps => {
        const ctx = document.getElementById("c").getContext("2d");
        this.displayArrows(ctx, 900, 500, 100, 100);
    };

    displayArrows = (ctx, fromx, fromy, tox, toy) => {
        ctx.beginPath();
        canvas_arrow(ctx, fromx, fromy, tox, toy);
        ctx.stroke();
        function canvas_arrow(context, fromx, fromy, tox, toy) {
            var headlen = 10;
            var dx = tox - fromx;
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        };
    };

    setArrow = async (idFrom, idTo) => {
        const arrowId = "arrow_" + (this.state.arrowsIds.length + 1);
        const arrowsIds = this.state.arrowsIds;
        arrowsIds.push(arrowId);
        await this.setState({ arrowsIds });
        const ctx = document.getElementById(arrowId).getContext("2d");
        ctx.beginPath();
        const domTask_1 = document.getElementById(idFrom);
        const domTask_2 = document.getElementById(idTo);



        const fromx = domTask_1.getBoundingClientRect().x + 30;
        const fromy = domTask_1.getBoundingClientRect().y + 30;

        const tox = domTask_2.getBoundingClientRect().x + 15;
        const toy = domTask_2.getBoundingClientRect().y + 30;

        this.displayArrows(ctx, fromx, fromy, tox, toy);
    };

    render() {

        const arrows = this.state.arrowsIds.map(arrowId =>
            <canvas id={arrowId} key={arrowId} width="500" height="500" style={{ position: "absolute" }} />
        );
        return ([
            <canvas id={"c"} key={5} width="500" height="500" style={{ position: "absolute" }} />,
            ...arrows,
            <DraggableArea
                key="2"
                addArrow={this.setArrow}
            />
        ]
        );
    };
};

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
    };
};

export default connect(mapStateToProps)(App);