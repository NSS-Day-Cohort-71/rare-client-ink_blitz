// define CreatePost() function
// return form JSX
// with Title, Image URL, and Article content inputs
// a category select dropdown, tag checkboxes, and a Publish button
// handleSubmit function called when Publish button is clicked
// define post object
// call addPost() function
// application navigates to "Post Details View"

import { useRef } from "react";
import { addPost } from "../../managers/PostManager.js";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ token }) => {
  const title = useRef();
  const imageUrl = useRef();
  const content = useRef();
  const navigate = useNavigate();
  // const categoryId = useRef() | consider useState() for category dropdown per Chat

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPostObject = {
      user_id: token,
      title: title.current.value,
      image_url: imageUrl.current.value,
      content: content.current.value,
      category_id: 2,
    };

    const newPostId = await addPost(newPostObject);
    navigate(`/postDetails/${newPostId}`);
    // Add navigate functionality
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
              className="input"
              type="text"
              ref={title}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              placeholder="Image URL"
              className="input"
              type="text"
              ref={imageUrl}
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
