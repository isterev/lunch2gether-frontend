"use strict";

import {Card, Button} from 'react-md';
import {withRouter} from 'react-router-dom';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Form, Datepicker, Input, Textarea} from 'react-formik-ui';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from './Page';

const style = {maxWidth: 500};


class MyGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.isUpdate = false;

        if (props.group != undefined) {
            this.state = {
                dateFrom: props.group.dateFrom,
                dateTo: props.group.dateTo,
                place: props.group.place,
                description: props.group.description,
                maxMembers: props.group.maxMembers
            };
            this.isUpdate = true;

        } else {
            this.state = {
                dateFrom: '',
                dateTo: '',
                place: '',
                description: '',
                maxMembers: ''
            };
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to " + (this.isUpdate? "update" : "create") + " this group?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmOk(values)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    confirmOk(values) {

        let group = this.props.group;
        if (group == undefined) {
            group = {};
        }
        group.dateFrom = values.dateFrom;
        group.dateTo = values.dateTo;
        group.place = values.place;
        group.description = values.description;
        group.maxMembers = values.maxMembers;

        this.props.onSubmit(group);
    }


    // validation with yup
    getSchema() {
        return yup.object().shape({
            dateFrom: yup.date()
                .required('Start time is required')
                .typeError("Start time is required"),
            dateTo: yup.date()
                .required('End time is required')
                .typeError("End time is required"),
            place: yup.string()
                .required('Place is required'),
            description: yup.string()
                .required('Description is required'),
            maxMembers: yup.number()
                .required('Maximal number of members is required')
                //.truncate()
                .integer('Must be an integer number')
                .positive('Must be positive')
                .typeError("Maximal number of members is required")
        })
    };

    render() {
        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card style={style} className="md-block-centered">
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
                                <Form mode='themed'>
                                    <br/>
                                    <Datepicker
                                        name='dateFrom'
                                        label='Start Date and Time'
                                        selectsStart
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        hint='Choose start date and time'
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
                                        hint='Choose end date and time'
                                    />

                                    <Input
                                        name='place'
                                        label='Place'
                                        hint='Specify a place to meet'
                                    />

                                    <Textarea
                                        name='description'
                                        label='Description'
                                        hint='Write a detailed description'
                                    />

                                    <Input
                                        name='maxMembers'
                                        label='Maximal Number of Members'
                                        hint='Define the Maximal Number of Members'
                                    />

                                    <Button type="submit" raised primary className="md-cell md-cell--2"
                                            onClick={(() => this.form.submit())}>
                                        Submit
                                    </Button>
                                    <Button type="reset" raised secondary className="md-cell md-cell--2"
                                            onClick={(() => history.go(-1))}>
                                        Cancel
                                    </Button>
                                </Form>


                            )}
                        />
                    </Card>
                </Page>

            </div>
        )
    }


}

export default withRouter(MyGroupForm);