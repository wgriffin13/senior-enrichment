import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import NotFound from './NotFound';

class App extends Component {

    render () {
        return (
            <div className="container">
                <h1>Campuses and Studends</h1>
                <Nav />
                <Switch>
                    <Redirect exact from="/" to="/campuses" />
                </Switch>
                <Switch>
                    <Route exact path="/campuses/:id" render={({ match }) => <SingleCampus match={match} />} />
                    <Route exact path="/campuses" component={Campuses} />
                    <Route exact path="/students/:id" render={({ match }) => <SingleStudent match={match} />} />
                    <Route exact path="/students" render={({ history }) => <Students history={history} />} />
                    <Route path="/" component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default App
