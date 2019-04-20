import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents, getCampuses } from './store';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

class Students extends Component {

    
    constructor () {
        super();
        this.goToSingleStudent = this.goToSingleStudent.bind(this);
    }

    goToSingleStudent (id) {
        this.props.history.push(`/students/${id}`);
    }

    componentDidMount () {
        this.props.requestGetStudents()
        this.props.requestGetCampuses()
    }

    render () {
        return (
            <table className="table m-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Campus</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.students.map(student => {
                        return (
                            <tr key={student.id} onClick={() => this.goToSingleStudent(student.id)}>
                                <th scope="row">{student.id}</th>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{(this.props.campuses.filter(campus => campus.id === student.campusId)[0] === undefined) ? '' : (this.props.campuses.filter(campus => campus.id === student.campusId)[0].name)}</td>
                                <td><IoIosClose size="1.5em" color="red" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestGetStudents: () => dispatch(getStudents()),
        requestGetCampuses: () => dispatch(getCampuses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
