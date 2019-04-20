import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleStudent } from './store';
import { Link } from 'react-router-dom';

class SingleStudent extends Component {

    componentDidMount () {
        this.props.requestGetSingleStudent(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                <div className="row mt-3 no-gutters">
                    <div className="col-md-6">
                        <img src={this.props.singleStudent.imageUrl} className="img-fluid float-left" />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <h2>{this.props.singleStudent.firstName} {this.props.singleStudent.lastName}</h2>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <h5>{this.props.singleStudent.email}</h5>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <h5>GPA: {this.props.singleStudent.gpa}</h5>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                    {(this.props.singleStudent.campus === null || this.props.singleStudent.campus === undefined) ? <h5>Campus: student does not have a campus!</h5> :
                        (<h5>Campus: <Link to={`/campuses/${this.props.singleStudent.campus.id}`}>{this.props.singleStudent.campus.name}</Link></h5>)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleStudent: state.singleStudent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetSingleStudent: (id) => dispatch(getSingleStudent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
