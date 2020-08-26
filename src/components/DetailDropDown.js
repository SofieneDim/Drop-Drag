import React from 'react';
import './css/DetailDropDown.css';

const DetailDropDown = props => {

    // const [showbody, toggle] = useState(true);

    // window.onclick = function (event) {
    //     const self = document.getElementById('SideMenu-user-name-container');
    //     if (self && !self.contains(event.target))
    //         toggle(false);
    // }

    return (
        <React.Fragment>
            <div id="dropdown-body" >
                <div id="dropdown-header">
                    <div id="dropdown-header-sub-container">
                        <label>New Task Details</label>
                    </div>
                </div>
                <div className="row" id="dropdown-footer">
                    <div className="col-md-12">
                        <input
                            type="text"
                            onChange={props.addTitle}
                        />
                    </div>
                    <div className="col-md-12">
                        <button onClick={() => props.addTask()}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DetailDropDown;