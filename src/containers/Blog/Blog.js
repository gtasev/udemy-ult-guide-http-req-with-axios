import React, { Component } from 'react';
// import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios'

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: null
    }

    async componentDidMount() {
        let posts = await axios.get('posts');
        posts = posts.data.slice(0,4);
        const updatedPosts = posts.map(post => {
            return {
                ...post,
                author: 'Max'
            }
        })
        this.setState({posts: updatedPosts})
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    newPostAddedHandler(newPost) {
        const newPosts = [...this.state.posts];
        newPosts.push(newPost)
        this.setState({posts: newPosts})
    }

    itemDeletedHandler(id) {
        let postsHelper = [...this.state.posts];
        postsHelper.splice(postsHelper.findIndex(ele => ele.id === id), 1);
        this.setState({posts: postsHelper, selectedPostId: null});
    }

    errorHandler() {
        this.setState({error: true, selectedPostId: null})
    }

    resetErrorHandler() {
        this.setState({error: null});
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                            id={this.state.selectedPostId} 
                            deleteItem={(id) => this.itemDeletedHandler(id)}
                            axiosError={() => this.errorHandler()}
                            resetError={() => this.resetErrorHandler()}
                            errorOccured={this.state.error}
                            />
                </section>
                <section>
                    <NewPost newPostAdded={(newPost) => this.newPostAddedHandler(newPost)}/>
                </section>
            </div>
        );
    }
}

export default Blog;