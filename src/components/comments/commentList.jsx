// add

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addComment, getAllComments } from "../../managers/CommentManager";
import { getPost } from "../../managers/PostManager";

export const AllComments = ({ token }) => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [post, setPost] = useState({});
  const content = useRef();
  const { postId } = useParams();

  useEffect(() => {
    getAllComments().then((commentArray) => {
      setComments(commentArray);
    });
    getPost(postId).then((postData) => {
      setPost(postData);
    });
  }, [postId]);

  useEffect(() => {
    const sortedComments = comments.filter(
      (comment) => comment.post_id === post.id
    );
    setFilteredComments(sortedComments);
  }, [comments, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommentObject = {
      author_id: token,
      post_id: postId,
      content: content.current.value,
    };
    await addComment(newCommentObject);
    content.current.value = "";
    getAllComments().then((commentArray) => {
      setComments(commentArray);
    });
  };

  return (
    <div>
      <h1>
        <Link to={`/postDetails/${post.id}`}>{post.title}</Link>'s Comments
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="30"
          required
          placeholder="Type your comment here..."
          className="textarea"
          ref={content}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {filteredComments.map((comment) => {
          return (
            <div key={comment.id}>
              <ul>
                <li>{comment.content}</li>
                <li>{comment.username}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
