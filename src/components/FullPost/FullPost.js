import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    async componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                const url = 'posts/' + this.props.id
                axios.get(url).then(res => {
                    this.setState({loadedPost: res.data});
                    this.props.resetError();
                }).catch(err => {
                    if(err) {
                        this.props.axiosError();
                    }
                });
            }
        }
    }

    deletePostHandler = async() => {
        const url = 'posts/' + this.props.id
        const deletePost = await axios.delete(url);
        if(deletePost.status === 200) {
            this.props.deleteItem(this.props.id);
            this.setState({loadedPost: null});
        }
    };

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={() => this.deletePostHandler()}>Delete</button>
                    </div>
                </div>
            );
        }
        if(this.props.errorOccured === true) {
            post = <p style={{textAlign: 'center'}}>Selected post can not be shown!!!</p>
        }
        return post;
    }
}

export default FullPost;