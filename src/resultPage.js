import React from 'react';

import { Redirect } from 'react-router-dom';

class ResultPage extends React.Component {

    state = {
        redirectTo: null,
    };

    redirectTo = distination => {
        const distinationLink = distination;
        this.setState({ redirectTo: distinationLink });
    };

    render() {
        if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
        const distinations = Object.values(this.props).map(distination => {
            return <button
                key={distination}
                onClick={() => this.redirectTo(distination)}
            >
                {distination}
            </button>;
        });

        return (
            <div>
                <h1>Result</h1>
                {distinations}
            </div>
        );
    };
};

export default ResultPage;