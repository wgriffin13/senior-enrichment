import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewStudent } from './store';

class NewStudent extends Component {

    constructor () {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.requestAddNewStudent(this.state)
        this.props.addingNewStudent()
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        return (
            <div className="m-3">
                <h2>{this.props.title}</h2>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstName" className="form-control" placeholder="Enter first name (required)" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="lastName" className="form-control" placeholder="Enter last name (required)" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="email" className="form-control" placeholder="Enter email (required)" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="imageUrl" className="form-control" placeholder="Enter student image URL" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>GPA</label>
                        <input name="gpa" className="form-control" placeholder="Enter GPA" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAddNewStudent: (student) => dispatch(addNewStudent(student))
    }
}

export default connect(null, mapDispatchToProps)(NewStudent)
