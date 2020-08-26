import React, { Component } from "react";

render() {

    return (
        <div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

            <div id="div1" style="width: 100px; height: 100px; top:0; left:0; background:#e53935 ; position:absolute;"></div>
            <div id="div2" style="width: 100px; height: 100px; top:0; left:300px; background:#4527a0 ; position:absolute;"></div>
            <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="50" stroke="red" /></svg>
        </div>
    );
}
}

export default SceneWithDrawables;