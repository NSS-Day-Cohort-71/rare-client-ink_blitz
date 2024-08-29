import { useEffect, useState } from 'react';
import { postList } from '../../managers/PostManager';
import { HumanDate } from '../utils/HumanDate.js';
import { Link, useNavigate } from 'react-router-dom';

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    postList().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/createPost')}>Add Post</button>
      {posts.map((post, index) => (
        <div key={index} value={post.id}>
          <div>
            <img src={post.image_url} />
          </div>
          <Link to={`/postDetails/${post.id}`}>
            <div>{post.title}</div>
          </Link>
          <div>{post.content}</div>
          <button onClick={() => navigate(`/edit-post/${post.id}`)}>
            Edit
          </button>
          <div>
            <HumanDate date={post.publication_date} />
          </div>
          <div>{post.username}</div>
        </div>
      ))}
    </div>
  );
};
