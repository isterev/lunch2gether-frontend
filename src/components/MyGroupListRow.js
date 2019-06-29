"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import { format } from 'date-fns'

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

    formatToNiceDate(group){
        
        let d1 = new Date(this.props.group.dateFrom);
        let d2 = new Date(this.props.group.dateTo);

        if(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate())
            return format(d1, "MMMM Do, YYYY H:mm aa") + " - " +  format(d2, "H:mm aa");

        else
            return format(d1, "MMMM Do, YYYY H:mm aa") + " - " +  format(d2, "MMMM Do, YYYY H:mm aa");
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn>{this.formatToNiceDate(this.props.group)}</TableColumn>
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