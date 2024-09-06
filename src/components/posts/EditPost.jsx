import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPost } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";

export const EditPost = ({ token }) => {
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
  });
  const { postId } = useParams();
  const title = useRef();
  const image_url = useRef();
  const content = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const getAndSetPost = async () => {
    const postObject = await getPost(postId);
    setPost(postObject);
  };

  const fetchCategories = async () => {
    const categoryData = await getAllCategories();
    setCategories(categoryData);
  };

  useEffect(() => {
    getAndSetPost();
    fetchCategories();
  }, [postId]);

  useEffect(() => {
    setSelectedCategory(post.category_id);
  }, [post]);

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

  const handleCategoryChange = (e) => {
    const copy = { ...post };
    copy.category_id = parseInt(e.target.value);
    setSelectedCategory(copy.category_id);
    setPost(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPostObject = { id: postId, ...post };

    await editPost(editedPostObject);
    navigate(`/postDetails/${postId}`);
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
              ref={image_url}
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
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
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
