/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampuses } from './store';

class Campuses extends Component {

    componentDidMount () {
        this.props.requestGetCampuses()
    }

    
    render () {
        return (
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
