import React, { Component } from 'react';
import {Link} from 'react-router';

class About extends Component {
    render() {
        return (
            <section name="about">
                <h1>About</h1>
                <Link to="/">
                    Go to home
                </Link>
                <Link to="/ramdom">
                    Go to ramdom
                </Link>
            </section>
        );
    }
}

export default About;