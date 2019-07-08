"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar
                //colored
                style={{
                        backgroundColor: '#01FF70',
                        backgroundImage: 'linear-gradient(141deg, #F0FFF0 10%,  #ADFF2F 80%, #F0FFF0 99%)',
                        //backgroundImage: 'linear-gradient(141deg, #F0FFF0 10%, #ADFF2F 51%,  #7CFC00 99%)',
                        //backgroundImage: 'linear-gradient(141deg, #F0FFF0 10%, #ADFF2F 51%,  #7CFC00 60%, #ADFF2F 80%, #F0FFF0 99%)',
                        //backgroundImage: 'linear-gradient(141deg, #F0FFF0 11%, #ADFF2F 30%,  #F0FFF0 50%, #ADFF2F 92%, #F0FFF0 97%)',
                        color: 'white',
                        opacity: '0.95'}}
                nav={<Button onClick={() => this.props.history.push('/')} icon>home</Button>}
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>
        );
    }
};

export default withRouter(Header);