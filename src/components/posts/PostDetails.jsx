import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../../managers/PostManager';
import { HumanDate } from '../utils/HumanDate';

/* 
- Define post details function
- useParams to get specific url id pass to getPostById
- use GET response to display post details on page
- use useState() once response is returned and useEffect() on initial render
- Display title, category, img url, tags, and details, author username (link to author detail view)
- buttons for view comments (redirect to comment view), delete/edit, and emoji reactions
- render jsx
*/
export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  const getAndSetPost = async () => {
    const postObject = await getPost(postId);
    setPost(postObject);
  };

  useEffect(() => {
    getAndSetPost();
  }, [postId]);

  return (
    <div>
      <h1>{post.title}</h1>
      <button
        onClick={() => {
          navigate(`/edit-post/${postId}`);
        }}
      >
        Edit Post
      </button>
      <div>edit/delete button, category</div>
      <img src={post.image_url} alt="img from user post" />
      <aside>tags</aside>
      <div>
        <div>By: {post.username}</div>
        <div>
          Published: <HumanDate date={post.publication_date} />
        </div>
        <div>comment button</div>
        <div>emojis</div>
      </div>
      <div>{post.content}</div>
    </div>
  );
};
