"use strict";

import React from 'react';
import { Card, Button, TextField } from 'react-md';
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import Styled from "styled-components";
import {Picture} from 'react-responsive-picture';


const style = {
    maxWidth: 500,
    backgroundColor: 'rgb(255, 255, 255, 0.7)',
    margintop: 'auto',
    marginbottom: 'auto',
};


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (

            <Page>

            <div style={divSty}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <Card style={style} className="md-block-centered" >
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Login"
                            id="LoginField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Login is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Login</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <Link to={'/register'} className="md-cell">Not registered yet?</Link>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>

                </Card>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>



            </div>

            </Page>


        );


    }
};

const divSty ={
    color: 'green',
    backgroundImage: 'url(https://imgp1.schaer.com/sites/default/files/2016-08/HeaderArticle31_Freunde%20essen%20zusammen.jpg)',
    WebkitTransition: 'all',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100',
    fontFamily: '"Numans", sans-serif',

};
/*
const style2 = theme =>({
    multilineColor:{
        color: 'black'
    }


});


export const UserLogin2 = Styled(UserLogin)`

    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    font-family: 'Numans', sans-serif;

https://imgp1.schaer.com/sites/default/files/2016-08/HeaderArticle31_Freunde%20essen%20zusammen.jpg



}`;*/

export default withRouter(UserLogin);