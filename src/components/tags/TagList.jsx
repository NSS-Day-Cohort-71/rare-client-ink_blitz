import { useEffect, useState } from 'react';
import { getAllTags } from '../../managers/TagManager';
import { useNavigate } from 'react-router-dom';

// define TagList() function
export const AllTags = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const getTags = async () => {
    const tagData = await getAllTags();
    setTags(tagData);
  };
  useEffect(() => {
    getTags();
  });

  return (
    <div>
      <button onClick={() => navigate('/createTag')}>Create Tag</button>
      {tags.map((tag) => {
        return (
          <div>
            <button>edit</button> <button>delete</button> {tag.label}
          </div>
        );
      })}
    </div>
  );
};
