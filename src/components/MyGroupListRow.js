"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import UserService from '../services/UserService';

export class MyGroupListRow extends React.Component {

    constructor(props) {
        super(props);
        this.userId = UserService.getCurrentUser().id;
    }

    onDelete(group) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to delete this group?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.onDelete(group._id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn>{new Date(this.props.group.dateFrom).toLocaleString()} -  {new Date(this.props.group.dateTo).toLocaleString()}</TableColumn>
                <TableColumn>{this.props.group.place}</TableColumn>
                <TableColumn> {this.props.group.members.length}/{this.props.group.maxMembers}</TableColumn>

                { UserService.isAuthenticated() && this.userId === this.props.group.owner ?
                    <TableColumn><Link to={`/edit/${this.props.group._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><br /></TableColumn>
                }

                { UserService.isAuthenticated() && this.userId === this.props.group.owner ?
                    <TableColumn><Button onClick={() => this.onDelete(this.props.group)} icon>delete</Button></TableColumn>
                    : <TableColumn><br /></TableColumn>
                }

                <TableColumn><Link to={`/show/${this.props.group._id}`}>More Details...</Link></TableColumn>

            </TableRow>
        );
    }
}