import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                        <div key={campus.id} className="card" >
                            <img src={campus.imageUrl} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{campus.name}</h5>
                            </div>
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
