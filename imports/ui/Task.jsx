import React, { Component } from 'react';

export default class Task extends Component {

    render() {
        console.log(this.props.task);
        return (
            <li> {this.props.task.text} </li>
        );
    }
}