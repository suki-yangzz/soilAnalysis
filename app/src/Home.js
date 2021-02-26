import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataAnalysis from './components/layout/DataAnalysis';
import {Container} from 'react-bootstrap';
import {withCookies} from 'react-cookie';

class Home extends Component {
    render() {
        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <DataAnalysis/>
                </Container>
            </div>
        );
    }
}

export default withCookies(Home);