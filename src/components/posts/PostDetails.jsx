import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../../managers/PostManager";
import { HumanDate } from "../utils/HumanDate";
import "../../styles/postStyles.css";
import { getPostTags } from "../../managers/PostTagManager";

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
  const [postTags, setPostTags] = useState([]);

  const getAndSetPost = async () => {
    const postObject = await getPost(postId);
    setPost(postObject);
  };
  const getAndSetPostTags = async () => {
    const postTagData = await getPostTags(postId);
    setPostTags(postTagData);
  };

  useEffect(() => {
    getAndSetPost();
    getAndSetPostTags();
  }, [postId]);

  const handleDeletePost = async (postId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirm) {
      await deletePost(postId);
      navigate("/myPosts");
    }
  };

  return (
    <div>
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
        <div>
          category:
          {post.category_label}
        </div>
        <div className="postImages">
          <img src={post.image_url} alt="img from user post" />
        </div>
        <aside>tags</aside>
        <div>
          <div>By: {post.username}</div>
          <div>
            Published: <HumanDate date={post.publication_date} />
          </div>
          <div>
            <button onClick={() => navigate(`/postComments/${post.id}`)}>
              View Comments
            </button>
          </div>
          <div>emojis</div>
        </div>
        <div>{post.content}</div>
      </div>
      <div>
        <aside>
          Tags:
          {postTags.map((tag) => {
            return (
              <div key={tag.id}>
                <p>{tag.label}</p>
              </div>
            );
          })}
          <button onClick={() => navigate(`/tag-selection/${postId}`)}>
            manage tags
          </button>
        </aside>
      </div>
    </div>
  );
};
