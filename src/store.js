/* eslint-disable default-case */
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
    students: [],
    campuses: []
}

const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_CAMPUSES = 'GOT_CAMPUSES';

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
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store
