import React, { Component } from 'react';

import { Tasks } from '../api/tasks';

export default class Task extends Component {

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked }
        })
    }

    render() {
        console.log(this.props.task);
        const taskClassName = this.props.task.checked ? 'checked' : '';
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

                <span className="text">
                    <strong>{this.props.task.username} </strong>  {this.props.task.text}
                </span>
            </li>
        );
    }
}