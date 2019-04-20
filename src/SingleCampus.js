import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleCampus } from './store';

class SingleCampus extends Component {

    componentDidMount () {
        this.props.requestGetSingleCampus(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                {(this.props.singleCampus.id === undefined) ? <div className="mt-3 text-center"><h2><b>No campus found</b></h2></div> :
                (<div>
                    <div className="row mt-3 no-gutters">
                        <div className="col-md-6">
                            <img src={this.props.singleCampus.imageUrl} className="img-fluid float-left" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <h2>{this.props.singleCampus.name}</h2>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <h5>{this.props.singleCampus.address}</h5>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <p>{this.props.singleCampus.description}</p>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        {(this.props.singleCampus.students === undefined) ? '' : this.props.singleCampus.students.map((student, idx) => {
                            return (
                                <li key={student.id} className="list-group-item">{idx + 1} - {student.firstName} {student.lastName}</li>
                            )
                        })}
                        {(this.props.singleCampus.students === undefined) ? '' :
                            (this.props.singleCampus.students.length > 0 ? '' : <li className="list-group-item">No students at this campus.</li>)}
                    </ul>
                 </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleCampus: state.singleCampus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetSingleCampus: (id) => dispatch(getSingleCampus(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
