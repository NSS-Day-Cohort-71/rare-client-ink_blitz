// define CreatePost() function
// return form JSX
// with Title, Image URL, and Article content inputs
// a category select dropdown, tag checkboxes, and a Publish button
// handleSubmit function called when Publish button is clicked
// define post object
// call addPost() function
// application navigates to "Post Details View"

import { useEffect, useRef, useState } from "react";
import { addPost } from "../../managers/PostManager.js";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../managers/TagManager.js";
import { addPostTag } from "../../managers/PostTagManager.js";
import { getAllCategories } from "../../managers/CategoryManager.js";

export const CreatePost = ({ token }) => {
  const title = useRef();
  const imageUrl = useRef();
  const content = useRef();
  const navigate = useNavigate();
  // const categoryId = useRef() | consider useState() for category dropdown per Chat
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const fetchTags = async () => {
    const tagData = await getAllTags();
    setTags(tagData);
  };

  const fetchCategories = async () => {
    const categoryData = await getAllCategories();
    setCategories(categoryData);
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const handleTagSelect = (event, tag) => {
    let onlyChecked = [];
    if (event.target.checked) {
      onlyChecked = [...checkedTags, tag];
      setCheckedTags(onlyChecked);
    } else {
      onlyChecked = [...checkedTags].filter((t) => t.id !== tag.id);
      setCheckedTags(onlyChecked);
    }
  };

  const handleCategory = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPostObject = {
      user_id: token,
      title: title.current.value,
      image_url: imageUrl.current.value,
      content: content.current.value,
      category_id: selectedCategory,
    };

    const newPostId = await addPost(newPostObject);
    for (const tag of checkedTags) {
      const postTag = {
        tag_id: tag.id,
        post_id: newPostId,
      };
      await addPostTag(postTag);
    }
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
          <select onChange={handleCategory}>
            <option value="0" disabled>
              (Category select)
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <div className="control">
            {/* <label>Tag</label> */}
            <div>
              {tags.map((tag) => (
                <div key={tag.id}>
                  <input
                    onChange={(event) => handleTagSelect(event, tag)}
                    type="checkbox"
                  />{" "}
                  {tag.label}
                </div>
              ))}
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
