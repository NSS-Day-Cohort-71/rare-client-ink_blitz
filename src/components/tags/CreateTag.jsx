// define CreateTag() function
// define useRef() state for category title input

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { addTag } from '../../managers/TagManager';

// define handleSubmit() function that calls addCategory()

// return JSX with form for creating a category
// includes an <h1>, an input, and a button

export const CreateTag = () => {
  const navigate = useNavigate();
  const label = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTagObj = {
      label: label.current.value,
    };

    await addTag(newTagObj);

    navigate('/tags');
    // should navigate to "/tagManager"
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSubmit}>
        <h1 className="title">Create a new tag</h1>

        <div className="field">
          <div className="control">
            <input
              required
              placeholder="Add text"
              className="input"
              type="text"
              ref={label}
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
