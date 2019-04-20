import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewCampus } from './store';

class NewCampus extends Component {

    constructor () {
        super();
        this.state = {
            name: '',
            address: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.requestAddNewCampus(this.state)
        this.props.addingNewCampus()
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
                        <label>Name</label>
                        <input name="name" className="form-control" id="inputName" placeholder="Enter name (required)" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input name="address" className="form-control" id="inputAddress" placeholder="Enter address (required)" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="imageUrl" className="form-control" id="inputImageUrl" placeholder="Enter campus image URL" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" className="form-control" id="inputDescription" rows="3" placeholder="Enter description" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAddNewCampus: (campus) => dispatch(addNewCampus(campus))
    }
}

export default connect(null, mapDispatchToProps)(NewCampus)
