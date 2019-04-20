/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampuses } from './store';
import NewCampus from './NewCampus';

class Campuses extends Component {

    constructor () {
        super();
        this.state = {
            newCampus: false
        }
        this.addingNewCampus = this.addingNewCampus.bind(this)
    }

    addingNewCampus () {
        this.setState(prevState => ({newCampus: !prevState.newCampus}))
    }

    componentDidMount () {
        this.props.requestGetCampuses()
    }

    render () {
        return (
            <div>
                <div className="card-deck m-3">
                    {this.props.campuses.map(campus => {
                        return (
                                <div key={campus.id} className="card">
                                    <Link to={`/campuses/${campus.id}`}>
                                        <img src={campus.imageUrl} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{campus.name}</h5>
                                        </div>
                                    </Link>
                                </div>
                        )
                    })}
                </div>
            {(this.state.newCampus === false) ? <button type="submit" className="btn btn-primary" onClick={() => this.addingNewCampus()}>Add New Campus</button> : <NewCampus title="New Campus" addingNewCampus={this.addingNewCampus} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetCampuses: () => dispatch(getCampuses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)
