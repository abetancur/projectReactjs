import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import api from '../../api.js';
import styles from '../containers/Post.css';


class Post extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            user: {},
            comments: [],
        };
    }

    async componentDidMount() {
        const [
            user,
            comments,
        ] = await Promise.all([
            api.users.getSingle(this.props.id),
            api.posts.getComments(this.props.id),
        ]);

        this.setState({
            loading: false,
            user,
            comments,
        })
    }
    render() {
        return(
            <article id={`post-${this.props.id}`} className={styles.post}>
                <h2 className={styles.title}>
                    <Link to={`/post/${this.props.id}`}>
                        {this.props.title}
                    </Link>
                </h2>
                <p className={styles.body}>
                    {this.props.body}
                </p>
                {!this.props.loading && (
                    <div className={styles.meta}>
                        <Link to={`/user/${this.state.user.id}`} className={styles.link}>
                            {this.state.user.name}
                        </Link>
                        <span className={styles.comments}>hay {this.state.comments.length} comentarios</span>
                    </div>
                )}
            </article>
        )
    }
}

Post.propTypes= {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
};

export default Post;