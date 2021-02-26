import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider, withCookies} from 'react-cookie';
import AppNavbar from "./components/common/AppNavbar";
import EnvironmentSoil from "./components/layout/environment/EnvironmentSoil";

class App extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/api/user', {credentials: 'include'});
        const body = await response.text();
        if (body === '') {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, user: JSON.parse(body)})
        }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('/api/logout', {
            method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}
        }).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        const message = this.props.user ?
            <span>Welcome, {this.props.user.name}! </span> :
            <span>Please log in first.</span>;

        return (
            <CookiesProvider>
                <AppNavbar isAuthenticated={this.state.isAuthenticated} user={this.state.user}/>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/Home' component={Home}/>
                        <Route path='/EnvSoil' component={EnvironmentSoil}/>
                        {/*<Route path='/groups' exact={true} component={GroupList}/>*/}
                        {/*<Route path='/groups/:id' component={GroupEdit}/>*/}
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default withCookies(App);