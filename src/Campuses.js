/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampuses, deletingCampus } from './store';
import NewCampus from './NewCampus';
import { IoIosClose } from 'react-icons/io';

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
                <div className="card-columns m-3 sm-3 lg-6" style={{columnCount: 3}}>
                    {this.props.campuses.map(campus => {
                        return (
                                <div key={campus.id} className="card" style={{breakInside: 'avoid-column'}}>
                                    <Link to={`/campuses/${campus.id}`}>
                                        <img src={campus.imageUrl} className="card-img-top" />
                                    </Link>
                                        <div className="card-body">
                                            <Link to={`/campuses/${campus.id}`}>
                                                <h5 className="card-title">{campus.name}</h5>
                                            </Link>
                                            <IoIosClose size="1.5em" color="red" onClick={() => this.props.requestDeleteCampus(campus.id)} />
                                        </div>
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
        requestGetCampuses: () => dispatch(getCampuses()),
        requestDeleteCampus: (id) => dispatch(deletingCampus(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)
