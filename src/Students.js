import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents, getCampuses } from './store';
import { IoIosClose } from 'react-icons/io';
import NewStudent from './NewStudent';

class Students extends Component {

    
    constructor () {
        super();
        this.goToSingleStudent = this.goToSingleStudent.bind(this);
        this.addingNewStudent = this.addingNewStudent.bind(this);
        this.state = {
            newStudent: false
        }
    }

    addingNewStudent () {
        this.setState(prevState => ({newStudent: !prevState.newStudent}))
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
            <div>
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
                {(this.state.newStudent === false) ? <button type="submit" className="btn btn-primary" onClick={() => this.addingNewStudent()}>Add New Student</button> : <NewStudent title="New Student" addingNewStudent={this.addingNewStudent} />}
            </div>
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
