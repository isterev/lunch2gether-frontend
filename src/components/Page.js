"use strict";

import React from 'react';

import Header from './Header';
import { Footer } from './Footer';


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <section>
                <Header title={this.state.title} />
                <div style={divSty}>
                {this.props.children}
                </div>
                <Footer />
            </section>
        );
    }
}

const divSty ={
    backgroundImage: 'url(https://imgp1.schaer.com/sites/default/files/2016-08/HeaderArticle31_Freunde%20essen%20zusammen.jpg)',
    //backgroundSize: 'cover',
    backgroundSize: '100% 100%',  //adjust the size of the picture
    backgroundRepeat: 'no-repeat',
};