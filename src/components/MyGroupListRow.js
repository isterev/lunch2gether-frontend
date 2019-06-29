"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import UserService from '../services/UserService';


export class MyGroupListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    onDelete(){}

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn>{new Date(this.props.group.dateFrom).toLocaleString()} -  {new Date(this.props.group.dateTo).toLocaleString()}</TableColumn>
                <TableColumn>{this.props.group.place}</TableColumn>
                <TableColumn> {this.props.group.members.length}/{this.props.group.maxMembers}</TableColumn>
                {UserService.isAuthenticated() ?
                    <TableColumn><Link to={`/edit/${this.props.group._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                }
                {UserService.isAuthenticated() ?
                    <TableColumn><Button onClick={() => this.props.onDelete(this.props.group._id)} icon>delete</Button></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
                }
                <TableColumn><Link to={`/show/${this.props.group._id}`}>More Details...</Link></TableColumn>

            </TableRow>
        );
    }
}