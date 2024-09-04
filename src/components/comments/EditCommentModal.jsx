import React, { useState } from 'react';
import Modal from 'react-modal';

const EditCommentModal = ({ isOpen, onRequestClose, comment, onSave }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleSave = () => {
    const updatedComment = { ...comment, content: editedComment };
    onSave(updatedComment);
    onRequestClose();
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
