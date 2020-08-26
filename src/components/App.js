import React from 'react';

import DraggableArea from "./DraggableArea";
import { connect } from 'react-redux';

class App extends React.Component {

    state = {
        arrows: [],
        arrowsIds: [],
    };

    componentDidMount = async () => {

        console.log(document.getElementById(44)) // the arrow appear here for the first time
        this.setArrow();
    };

    componentWillMount = async prevProps => {
        console.log('Mount')

        const arrows = this.state.arrows;

        arrows.push(
            <canvas id={44} key={1} width="500" height="500" style={{ position: "absolute" }} />
        );

        await this.setState({ arrows });
    };

    setArrow = async (idFrom, idTo) => {
        console.log('Arrow')
        for (let task of this.props.tasks.domTasks) {
            if (task.link !== 0) {

                const arrowId = this.state.arrowsIds.length + 1;
                const arrowsIds = this.state.arrowsIds
                arrowsIds.push(arrowId);

                // if (!document.getElementById(arrowId)) return;
                

                const arrows = this.state.arrows;

                arrows.push(
                    <canvas id={arrowId} key={arrowId} width="500" height="500" style={{ position: "absolute" }} />
                );

                // await this.setState({ arrows, arrowsIds });

                // console.log('document.getElementById(arrowId)', document.getElementById(arrowId))


                const ctx = document.getElementById(arrowId).getContext("2d");
                console.log('ctx', ctx)


                return
                ctx.beginPath();


                const domTask_1 = document.getElementById(idFrom);
                const domTask_2 = document.getElementById(idTo);
                if (!domTask_1) return

                const fromx = domTask_1.getBoundingClientRect().x + 30;
                const fromy = domTask_1.getBoundingClientRect().y + 30;

                const tox = domTask_2.getBoundingClientRect().x + 15;
                const toy = domTask_2.getBoundingClientRect().y + 30;

                canvas_arrow(ctx, fromx, fromy, tox, toy);
                ctx.stroke();


                function canvas_arrow(context, fromx, fromy, tox, toy) {
                    var headlen = 10; // length of head in pixels
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
        };
    };

    render() {
        // console.log('this.state.arrows', this.state.arrows)
        // console.log('document.getElementById(arrowId', document.getElementById(44))
        this.setArrow();
        return ([
            [...this.state.arrows],
            <DraggableArea
                key="2"
            // dragging={this.componentWillUpdate}
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