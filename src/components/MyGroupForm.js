"use strict";

import {Card, Button, FontIcon, TextField} from 'react-md';
import {withRouter} from 'react-router-dom';

import {AlertMessage} from './AlertMessage';
import Page from './Page';

import React, {Component} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

import {Form, Datepicker, Input, Textarea, SubmitBtn} from 'react-formik-ui';


const style = {maxWidth: 500};


class MyGroupForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {

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
    getSchema(){
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
            <Page>
                <Card style={style} className="md-block-centered">
                    <Formik
                        initialValues={{
                            dateFrom: '',
                            dateTo: '',
                            place: '',
                            description: '',
                            maxMembers: ''
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
                                    hint='Choose start date and time'
                                    required
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
                                    hint='Choose start date and time'
                                    required
                                />

                                <Input
                                    name='place'
                                    label='Place'
                                    hint='Denote a place to meet'
                                    required
                                />

                                <Textarea
                                    name='description'
                                    label='Description'
                                    hint='Write a description'
                                />

                                <Input
                                    name='maxMembers'
                                    label='Maximal Number of Members'
                                    hint='Select the Maximal Number of Members'
                                    required
                                />


                                <SubmitBtn/>
                            </Form>


                        )}
                    />
                </Card>
            </Page>
        )
    }


}

export default withRouter(MyGroupForm);