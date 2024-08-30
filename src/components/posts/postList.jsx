import { useEffect, useState } from 'react';
import { deletePost, postList } from '../../managers/PostManager';
import { HumanDate } from '../utils/HumanDate.js';
import { Link, useNavigate } from 'react-router-dom';
import "/root/workspace/python/rare/client/src/styles/postStyles.css"

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    postList().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  const handleDeletePost = async (postId) => {
    let confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      await deletePost(postId);
      postList().then((postArray) => {
        setPosts(postArray);
      });
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/createPost')}>Add Post</button>
      {posts.map((post, index) => (
        <div key={index} value={post.id} className='postBorder'>
          <div className='postImages'>
            <img src={post.image_url} alt="img from post" />
          </div>
          <Link to={`/postDetails/${post.id}`}>
            <div>{post.title}</div>
          </Link>

          <div>{post.content}</div>
            <div className='buttons'>
            <button onClick={() => navigate(`/edit-post/${post.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          <div/>

          <div>
            Published: <HumanDate date={post.publication_date} />
          </div>
          <div>By: {post.username}</div>
        </div>
      ))}
    </div>
  );
};
