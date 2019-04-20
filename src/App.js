import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';

class App extends Component {

    render () {
        return (
            <div className="container">
                <h1>Campuses and Studends</h1>
                <Nav />
                <Switch>
                    <Redirect exact from="/" to="/campuses" />
                </Switch>
                <Route exact path="/campuses/:id" render={({ match }) => <SingleCampus match={match} />} />
                <Route exact path="/campuses" component={Campuses} />
                <Route exact path="/students" component={Students} />
            </div>
        )
    }
}

export default App
