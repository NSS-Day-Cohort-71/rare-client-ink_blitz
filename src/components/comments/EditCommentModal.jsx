import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditCommentModal = ({ isOpen, onRequestClose, comment, onSave }) => {
  const [editedComment, setEditedComment] = useState('');

  // Set the initial state when the modal opens
  useEffect(() => {
    if (comment) {
      setEditedComment(comment.content);
    }
  }, [comment]);

  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleSave = () => {
    const updatedComment = { ...comment, content: editedComment };
    onSave(updatedComment);  // Pass the updated comment back to the parent component
    onRequestClose()
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Comment"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>Edit Comment</h2>
      <textarea
        value={editedComment}
        onChange={handleInputChange}
        rows="10"
        cols="30"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default EditCommentModal;

