import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Tasks } from '../api/tasks';

export default class Task extends Component {

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }

    render() {
        console.log(this.props.task);
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private
        })
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                    {this.props.task.private ? 'Private' : 'Public'}
                </button>

                <span className="text">
                    <strong>{this.props.task.username} </strong>  {this.props.task.text}
                </span>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    showPrivateButton: PropTypes.bool.isRequired
}