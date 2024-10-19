import React, { useEffect } from 'react';
import './BlogModal.css'; // We'll create this file for styles

const BlogModal = ({ post, onClose, formatDate }) => {
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    const renderContent = (content) => {
        return content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title">{post.title}</h5>
                            <p className="text-muted">- {post.author}, {formatDate(post.timestamp)}</p>
                        </div>
                        <button type="button" className="close-button" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        {renderContent(post.content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
