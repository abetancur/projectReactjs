import React, { Component } from 'react';
import PostBody from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Comment from '../../comments/components/Comment.jsx';
import styles from './Post.css';
import api from '../../api.js';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {},
            post: {},
            comments: [],
        };
    }

    async componentDidMount() {
        const [
            post,
            comments
        ] = await Promise.all([
            api.posts.getSingle(this.props.params.id),
            api.posts.getComments(this.props.params.id),
        ]);

        const user = api.users.getSingle(post.userId);

        this.setState({
           loading: false,
            post,
            user,
            comments,
        });
    }

    render() {
        if (this.state.loading) {
            return <Loading/>;
        }
        return (
            <section name="post">
                <PostBody
                    {... this.state.post}
                    user={this.state.user}
                    comments={this.state.comments}
                />
                <section className={styles.main}>
                    {this.state.comments
                        .map(comment => (
                            <Comment key={comment.id} {...comment} />
                        ))
                    }
                </section>
            </section>
        );
    }
}

export default Post;