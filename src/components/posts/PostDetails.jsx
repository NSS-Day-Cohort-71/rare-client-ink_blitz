import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPost } from '../../managers/PostManager';
import { HumanDate } from '../utils/HumanDate';
import "/root/workspace/python/rare/client/src/styles/postStyles.css"

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

  const handleDeletePost = async (postId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirm) {
      await deletePost(postId);
      navigate('/myPosts');
    }
  };

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
      <button onClick={() => handleDeletePost(post.id)}>Delete</button>
      <div>category</div>
      <div className='postImages'>
      <img src={post.image_url} alt="img from user post" />
      </div>
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
