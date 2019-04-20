/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
    students: [],
    campuses: [],
    singleCampus: {},
    singleStudent: {}
}

const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_SINGLE_CAMPUS = 'GOT_SINGLE_CAMPUS';
const GOT_SINGLE_STUDENT = 'GOT_SINGLE_STUDENT';
const NEW_CAMPUS = 'NEW_CAMPUS';
const NEW_STUDENT = 'NEW_STUDENT';

const newStudent = (student) => (
    {
        type: NEW_STUDENT,
        student
    }
)

const newCampus = (campus) => (
    {
        type: NEW_CAMPUS,
        campus
    }
)

const gotSingeStudent = (student) => (
    {
        type: GOT_SINGLE_STUDENT,
        singleStudent: student
    }
)

const gotSingleCampus = (campus) => (
    {
        type: GOT_SINGLE_CAMPUS,
        singleCampus: campus
    }
)

const gotStudents = (students) => (
    {
        type: GOT_STUDENTS,
        students
    }
)

const gotCampuses = (campuses) => (
    {
        type: GOT_CAMPUSES,
        campuses
    }
)

export const addNewStudent = (student) => {
    return (dispatch) => {
        axios.post('/api/students', student)
            .then(response => response.data)
            .then(data => {
                dispatch(newStudent(data))
            })
    }
}

export const addNewCampus = (campus) => {
    return (dispatch) => {
        axios.post('/api/campuses', campus)
            .then(response => response.data)
            .then(data => {
                dispatch(newCampus(data))
            })
    }
}

export const getSingleStudent = (studentId) => {
    return (dispatch) => {
        axios.get('/api/students/' + studentId)
            .then(response => response.data)
            .then(data => {
                dispatch(gotSingeStudent(data))
            })
    }
}

export const getSingleCampus = (campusId) => {
    return (dispatch) => {
        axios.get('/api/campuses/' + campusId)
            .then(response => response.data)
            .then(data => {
                dispatch(gotSingleCampus(data))
            })
    }
}

export const getStudents = () => {
    return (dispatch) => {
        axios.get('/api/students')
            .then(response => response.data)
            .then(data => {
                dispatch(gotStudents(data))
            })
    }
}

export const getCampuses = () => {
    return (dispatch) => {
        axios.get('/api/campuses')
            .then(response => response.data)
            .then(data => {
                dispatch(gotCampuses(data))
            })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_STUDENTS:
            return {...state, students: action.students}
        case GOT_CAMPUSES:
            return {...state, campuses: action.campuses}
        case GOT_SINGLE_CAMPUS:
            return {...state, singleCampus: action.singleCampus}
        case GOT_SINGLE_STUDENT:
            return {...state, singleStudent: action.singleStudent}
        case NEW_CAMPUS:
            return {...state, campuses: [...state.campuses, action.campus]}
        case NEW_STUDENT:
            return {...state, students: [...state.students, action.student]}
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store
