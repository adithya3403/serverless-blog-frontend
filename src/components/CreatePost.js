import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Get the post data if editing
    const postData = location.state?.post;
    const isEditing = Boolean(postData);

    useEffect(() => {
        if (isEditing) {
            setTitle(postData.title);
            setContent(postData.content);
            setAuthor(postData.author);
        }
    }, [isEditing, postData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!title || !content) {
            setError('Title and Content are required.');
            return;
        }

        try {
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/posts`;
            const method = isEditing ? 'put' : 'post';

            await axios({
                method,
                url: apiUrl,
                data: {
                    ...(isEditing && { id: postData.id }),
                    title,
                    content,
                    author
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setMessage(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
            if (!isEditing) {
                setTitle('');
                setContent('');
                setAuthor('');
            }
            navigate('/');
        } catch (err) {
            setError('Error creating/updating post.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4" style={{ fontWeight: 'normal', color: '#444' }}>
                {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit} style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.05)', padding: '20px', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#555' }}>Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#555' }}>Content:</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="6"
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}
                        placeholder="Write your content here..."
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#555' }}>Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    {isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
