import React, { Component } from 'react';
import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import styles from './Profile.css';
import api from '../../api.js';
import { FormattedMessage } from 'react-intl'

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            user:{},
            posts: [],
            loading: true,
        };
    }

    async componentDidMount() {
        const [
            user,
            posts,
        ] = await Promise.all([
            api.users.getSingle(this.props.params.id),
            api.users.getPosts(this.props.params.id)
        ]);

        this.setState({
            user,
            posts,
            loading: false,
        });
    }
    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        return (
            <section name="Profile">
                <section className={styles.main}>
                    <h2>
                        <FormattedMessage
                            id="profile.name"
                            values={{
                                name: this.state.user.name
                            }}
                        />
                     </h2>

                    <fieldset>
                        <legend>
                            <FormattedMessage id="profile.info"/>
                        </legend>
                        <input type="email" value={this.state.user.email} disabled />
                    </fieldset>

                    {this.state.user.address && (
                        <fieldset>
                            <legend>Address</legend>
                            <address>
                                {this.state.user.address.street}  <br/>
                                {this.state.user.address.suite}  <br/>
                                {this.state.user.address.city}  <br/>
                                {this.state.user.address.zipcode}  <br/>
                            </address>
                        </fieldset>
                    )}
                </section>

                <section>
                    {this.state.posts
                        .map(post => (
                            <Post
                                key={post.id}
                                user={this.state.user}
                                {...post}
                            />
                        ))
                    }
                </section>

            </section>
        );
    }
}

export default Profile;