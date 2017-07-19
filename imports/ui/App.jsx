import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks';
import AccountsUIWrapper from './AccountsUIWrapper';

import Task from './Task';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideComopleted: false
        }
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideComopleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = currentUserId === task.owner

            return <Task
                key={task._id}
                task={task}
                showPrivateButton={showPrivateButton}
            />
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = this.refs.textInput.value.trim();

        Meteor.call('tasks.insert', text);

        this.refs.textInput.value = '';
    }

    toggleCompleted() {
        this.setState({
            hideComopleted: !this.state.hideComopleted
        })
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List {this.props.incompleteCount}</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    {this.props.currentUser ?
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    return {

        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user()
    }
}, App);