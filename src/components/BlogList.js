import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./BlogList.css";

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching posts');
            setLoading(false);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
                data: { id: id }
            });
            fetchPosts();
        } catch (err) {
            setError('Error deleting post');
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        const formattedDate = date.toLocaleString('en-GB', options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${ampm}`;
        return `${formattedDate} ${formattedTime}`;
    }

    if (loading) return <div className="text-center"><br /><p className="spinner-border" role="status"></p><span className="visually-hidden"><br />Loading...</span></div>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container my-4">
            <div className="text-center mb-4">
                <Link to="/create">
                    <button className="btn btn-primary">Create Post</button>
                </Link>
            </div>
            {posts.length === 0 ? (
                <p className="text-center">No posts available.</p>
            ) : (
                <div className="card-columns">
                    {posts.map(post => (
                        <div className="card shadow-sm" style={{ borderRadius: '1rem' }}>
                            <div className="card-body">
                                <h5 className="card-title text-dark font-weight-bold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                                    {post.title}
                                </h5>
                                <p className="card-text">{post.content}</p>
                                <p className="card-text text-muted">
                                    - {post.author}, {formatDate(post.timestamp)}
                                </p>
                                <div className="d-flex justify-content-between mt-3">
                                    <Link to="/create" state={{ post }}>
                                        <button className="btn btn-outline-primary">Edit</button>
                                    </Link>
                                    <button className="btn btn-outline-danger" onClick={() => deletePost(post.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
