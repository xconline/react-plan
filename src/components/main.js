import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './home';
import HomePage from './homePage';
class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/home" component={Home} />
                <Route path="/" component={HomePage} />
            </div>
        );
    }
}
export default Main;
