import { useEffect, useState } from 'react';
import { getAllTags } from '../../managers/TagManager';
import { useNavigate, useParams } from 'react-router-dom';
import { addPostTag, getPostTags, removePostTag } from '../../managers/PostTagManager';

export const TagSelection = () => {
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const { postId } = useParams();
  const [checkedTags, setCheckedTags] = useState([]);
  const navigate = useNavigate();

  const fetchTags = async () => {
    const tagData = await getAllTags();
    setTags(tagData);
  };
  const fetchPostTags = async () => {
    const postTagData = await getPostTags(postId);
    setPostTags(postTagData);
  };

  useEffect(() => {
    fetchTags();
    fetchPostTags();
  }, [postId]);

  useEffect(() => {
    const mappedPostTags = postTags.map((postTag) => ({
      id: postTag.tag_id, // Ensure id matches tag.id
    }));
    setCheckedTags(mappedPostTags);
  }, [postTags]);

  // Check if the current tag exists in checkedTags
  const isTagChecked = (tagId) => {
    return checkedTags.some((checkedTag) => checkedTag.id === tagId);
  };

  const handleTagSelect = (e, tag) => {
    let onlyChecked = [];
    if (e.target.checked) {
      onlyChecked = [...checkedTags, tag];
      setCheckedTags(onlyChecked);
    } else {
      onlyChecked = checkedTags.filter((t) => t.id !== tag.id);
      setCheckedTags(onlyChecked);
    }
  };

  const handleSave = async () => {
    let newCheckedTags = checkedTags.filter(
      (checkedTag) =>
        !postTags.some((postTag) => postTag.tag_id === checkedTag.id)
    );

    let uncheckedTags = postTags.filter(
      (postTag) =>
        !checkedTags.some((checkedTag) => checkedTag.id === postTag.tag_id)
    );

    console.log('New tags to be added:', newCheckedTags);

    await Promise.all(
      newCheckedTags.map(async (checkedTag) => {
        const postTagToSend = { tag_id: checkedTag.id, post_id: postId };
        await addPostTag(postTagToSend);
      })
    );

    await Promise.all(
      uncheckedTags.map(async (postTag) => {
        // Assuming you have a function like removePostTag
        await removePostTag(postTag.id);
      })
    );

    // Fetch the updated post tags
    await fetchPostTags();

    // Navigate to the updated PostDetails
    navigate(`/postDetails/${postId}`);
  };

  return (
    <>
      {tags.map((tag) => (
        <div key={tag.id}>
          <label>
            <input
              type="checkbox"
              checked={isTagChecked(tag.id)}
              onChange={(e) => handleTagSelect(e, tag)} // Handle checkbox change if needed
            />
            {tag.label}
          </label>
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </>
  );
};
