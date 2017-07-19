import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks';

window.Tasks = Tasks;

import Task from './Task';

class App extends Component {
    renderTasks() {
        return this.props.tasks
            .map((task) => {
                return <Task key={task._id} task={task} />
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = this.refs.textInput.value.trim();

        Tasks.insert({
            text,
            createdAt: new Date()
        });

        this.refs.textInput.value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    }
}, App);