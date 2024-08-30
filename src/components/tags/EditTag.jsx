import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTag, getTagById } from '../../managers/TagManager';

export const EditTag = () => {
  const [tag, setTag] = useState({ label: '' });
  const { tagId } = useParams();
  const tagLabel = useRef();
  const navigate = useNavigate();

  const fetchTag = async () => {
    const tagData = await getTagById(tagId);
    setTag(tagData);
  };

  useEffect(() => {
    fetchTag();
  }, []);

  const handleTagChange = () => {
    const copy = { ...tag };
    copy.label = tagLabel.current.value;
    setTag(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedTag = { ...tag };
    await editTag(editedTag);
    navigate('/tags');
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSubmit}>
        <h1 className="title">Edit tag</h1>

        <div className="field">
          <div className="control">
            <input
              required
              placeholder="Add text"
              className="input"
              type="text"
              ref={tagLabel}
              value={tag.label}
              onChange={handleTagChange}
            />
          </div>
        </div>

        <div className="field">
          <button className="button is-link" type="submit">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};
