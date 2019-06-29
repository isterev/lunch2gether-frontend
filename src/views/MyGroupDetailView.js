"use strict";

import React from 'react';

import { MyGroupDetail } from '../components/MyGroupDetail';
import GroupService from '../services/GroupService';


export class MyGroupDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        GroupService.getGroup(id).then((data) => {
            this.setState({
                group: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteGroup(id) {
        GroupService.deleteGroup(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MyGroupDetail group={this.state.group} onDelete={(id) => this.deleteGroup(id)}/>
        );
    }
}
