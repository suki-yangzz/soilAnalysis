import React, {Component} from 'react';
import {withCookies} from 'react-cookie';

class EnvironmentSoil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                Environment Soil
            </div>
        );
    }
}

export default withCookies(EnvironmentSoil)