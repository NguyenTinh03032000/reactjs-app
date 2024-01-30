import React, { Component } from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import VocabularyList from '../Vocabulary/VocabularyList';
import Login from '../user/login/Login';
import AppHeader from '../common/AppHeader';
import { Layout, notification } from 'antd';
import { ACCESS_TOKEN } from '../constants';
const { Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: true
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        getCurrentUser().then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogin() {
        notification.success({
            message: "Technical App",
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
        notification[notificationType]({
            message: 'Technical App',
            description: description,
        });
    }

    render() {
        return (
            <Layout className='app-container' >
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser} />
                <Content className='app-content'>
                    <div className='container'>
                        <Switch>
                            <Route exact path="/" render={(props) => <VocabularyList isAuthenticated={this.state.isAuthenticated}
                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props}
                            />}></Route>
                            <Route exact path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}
export default withRouter(App);
