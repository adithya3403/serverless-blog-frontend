import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts`, { data: { id } });
            fetchPosts();
        } catch (err) {
            setError('Error deleting post');
        }
    };

    if (loading) return <div className="text-center"><br /><p className="spinner-border" role="status"></p><span className="visually-hidden"><br />Loading...</span></div>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Blog Posts</h2>
            <div className="text-center mb-4">
                <Link to="/create">
                    <button className="btn btn-primary">Create Post</button>
                </Link>
            </div>
            {posts.length === 0 ? (
                <p className="text-center">No posts available.</p>
            ) : (
                <div className="row">
                    {posts.map(post => (
                        <div className="col-md-4 mb-4" key={post.id}>
                            <div className="card shadow-sm" style={{ borderRadius: '8px', borderColor: '#f0f0f0' }}>
                                <div className="card-body" style={{ backgroundColor: '#fafafa' }}>
                                    <h5 className="card-title" style={{ color: '#007bff', fontWeight: '500' }}>{post.title}</h5>
                                    <p className="card-text" style={{ color: '#555' }}>{post.content}</p>
                                    <p className="card-text text-muted"><strong>Author:</strong> {post.author}</p>
                                    <p className="card-text text-muted"><strong>Timestamp:</strong> {new Date(post.timestamp).toLocaleString()}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to="/create" state={{ post }}>
                                            <button className="btn btn-outline-primary">Edit</button>
                                        </Link>
                                        <button className="btn btn-outline-danger" onClick={() => deletePost(post.id)}>Delete</button>
                                    </div>
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
