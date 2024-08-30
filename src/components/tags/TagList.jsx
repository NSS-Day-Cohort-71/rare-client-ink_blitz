import { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";

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
  }, []);

  const handleDeleteTag = async (tagId) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteTag(tagId);
      await getTags(); // Ensure tags are re-fetched after deletion
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/createTag")}>Create Tag</button>
      {tags.map((tag) => {
        return (
          <div key={tag.id}>
            <button>edit</button>
            <button onClick={() => handleDeleteTag(tag.id)}>delete</button>
            {tag.label}
          </div>
        );
      })}
    </div>
  );
};
