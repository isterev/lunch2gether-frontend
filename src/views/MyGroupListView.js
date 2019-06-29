"use strict";

import React from 'react';

import { MyGroupList } from '../components/MyGroupList';
import GroupService from '../services/GroupService';

export class MyGroupListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        GroupService.getMyGroups().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    deleteGroup(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        GroupService.deleteGroup(id).then((message) => {

            let groupIndex = this.state.data.map(group => group['_id']).indexOf(id);
            let groups = this.state.data;
            groups.splice(groupIndex, 1);
            this.setState({
               data: [...groups],
               loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MyGroupList data={this.state.data} onDelete={(id) => this.deleteGroup(id)}/>
        );
    }
}
