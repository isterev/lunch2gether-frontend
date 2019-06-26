"use strict";

import React from 'react';

import GroupForm from './../components/GroupForm';

import GroupService from '../services/GroupService';


export class GroupFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                group: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.group != undefined) {
            this.setState({
                loading: false,
                group: this.props.location.state.group,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            GroupService.getGroup(id).then((data) => {
                this.setState({
                    group: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    updateGroup(group) {
        if(this.state.group == undefined) {
            GroupService.createGroup(group).then((data) => {
                this.props.history.push('/');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating group'}));
            });
        } else {
            GroupService.updateGroup(group).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating group'}));
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<GroupForm group={this.state.group} onSubmit={(group) => this.updateGroup(group)} error={this.state.error} />);
    }
}
