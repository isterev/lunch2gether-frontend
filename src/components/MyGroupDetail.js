"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Grid, Cell, Button } from 'react-md';
import {Datepicker, Form, Input, Textarea} from "react-formik-ui";
import {Formik} from "formik";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from './Page';
import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class MyGroupDetail extends React.Component {

    constructor(props) {
        super(props);

        if(props.group != undefined) {
            this.state = {
                dateFrom : props.group.dateFrom,
                dateTo : props.group.dateTo,
                place : props.group.place,
                description: props.group.description,
                maxMembers: props.group.maxMembers
            };
        } else {
            this.state = {
                dateFrom : '',
                dateTo : '',
                place : '',
                description: '',
                maxMembers: ''
            };
        }

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
            <Page>
                <Card style={style} className="md-block-centered">
                    <Grid className="grid-example" >
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Link to={{pathname: `/edit/${this.props.group._id}`, state : {group : this.props.group}}}><Button icon>mode_edit</Button></Link>
                                : <Link to={'/login'}><Button icon>mode_edit</Button></Link>
                            }
                        </Cell>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ?
                                <Button onClick={() => this.onDelete(this.props.group)} icon>delete</Button>
                                :   <Link to={'/login'}><Button icon>delete</Button></Link>
                            }
                        </Cell>
                    </Grid>

                    <CardTitle title={"Group Details"} />

                    <CardText>
                        <Formik
                            initialValues={{
                                dateFrom: this.state.dateFrom,
                                dateTo: this.state.dateTo,
                                place: this.state.place,
                                description: this.state.description,
                                maxMembers: this.state.maxMembers
                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.onSubmit}
                            render={() => (
                                <Form mode='structured'>

                                    <Datepicker
                                        name='dateFrom'
                                        label='Start Date and Time'
                                        selectsStart
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        disabled
                                    />

                                    <Datepicker
                                        name='dateTo'
                                        label='End Date and Time'
                                        selectsEnd
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        disabled
                                    />

                                    <Input
                                        name='place'
                                        label='Place'
                                        disabled
                                    />

                                    <Textarea
                                        name='description'
                                        label='Description'
                                        disabled
                                    />

                                    <Input
                                        name='maxMembers'
                                        label='Maximal Number of Members'
                                        disabled
                                    />

                                    <Button type="reset" raised secondary className="md-cell md-cell--2" onClick={(() => history.go(-1))}>
                                        Back
                                    </Button>

                                </Form>


                            )}
                        />
                    </CardText>
                </Card>
            </Page>
        );
    }
}