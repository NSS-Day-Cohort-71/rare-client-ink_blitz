import { useEffect, useState } from 'react';
import { deletePost, postList } from '../../managers/PostManager';
import { useNavigate } from 'react-router-dom';
import { HumanDate } from '../utils/HumanDate';
import "/root/workspace/python/rare/client/src/styles/postStyles.css"

export const MyPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  const getAndSetPosts = () => {
    postList().then((postsArray) => {
      const userPosts = postsArray.filter(
        (post) => parseInt(token) === post.user_id
      );
      setAllPosts(userPosts);
    });
  };
  useEffect(() => {
    getAndSetPosts();
  }, [token]);

  const handleDeletePost = async (postId) => {
    let confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      await deletePost(postId);
      getAndSetPosts();
    }
  };
  return (
    <>
      <div>
        <button onClick={() => navigate('/createPost')}>Add Post</button>
        {allPosts.map((myPost) => (
          <div key={myPost.id} className='postBorder'>
            <div>
              <h1>{myPost.username}</h1>
            </div>
            <section>
              <div>
                <div>
                  <h2>{myPost.title}</h2>
                </div>
                <div>
                  Published: <HumanDate date={myPost.publication_date} />
                </div>
              </div>
              <div className='postImages'>
                <img src={myPost.image_url} alt="img from post" />
              </div>
              <div className='buttons'>
                <div>{myPost.author_name}</div>
                <div>{myPost.reaction_count}</div>
                <button
                  onClick={() => {
                    navigate(`/edit-post/${myPost.id}`);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeletePost(myPost.id)}>
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};
