import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../managers/PostManager';

export const EditPost = ({ token }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const title = useRef();
  const imageUrl = useRef();
  const content = useRef();

  const getAndSetPost = async () => {
    const postObject = await getPost(postId);
    setPost(postObject);
  };

  useEffect(() => {
    getAndSetPost();
  }, [postId]);

  const handleTitleChange = (e) => {
    const copy = { ...post };
    copy.title = e.target.value;
    setPost(copy);
  };

  const handleImgUrlChange = (e) => {
    const copy = { ...post };
    copy.image_url = e.target.value;
    setPost(copy);
  };

  const handleContentChange = (e) => {
    const copy = { ...post };
    copy.content = e.target.value;
    setPost(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPostObject = {
      user_id: token,
      title: title.current.value,
      image_url: imageUrl.current.value,
      content: content.current.value,
      category_id: 2,
    };
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSubmit}>
        <h1 className="title">New Post</h1>

        <div className="field">
          <div className="control">
            <input
              required
              placeholder="Title"
              value={post.title}
              className="input"
              type="text"
              ref={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              placeholder="Image URL"
              className="input"
              type="text"
              value={post.image_url}
              ref={imageUrl}
              onChange={handleImgUrlChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <textarea
              rows="10"
              cols="50"
              required
              placeholder="Article content"
              className="textarea"
              ref={content}
              value={post.content}
              onChange={handleContentChange}
            />
          </div>
        </div>

        <div className="field">
          <select>
            <option value="0" disabled>
              (Category select)
            </option>
          </select>
        </div>

        <div className="field">
          <div className="control">
            {/* <label>Tag</label> */}
            <div>
              <input type="checkbox" /> Tag
            </div>
          </div>
        </div>

        <div className="field">
          <button className="button is-link" type="submit">
            Publish
          </button>
        </div>
      </form>
    </section>
  );
};
