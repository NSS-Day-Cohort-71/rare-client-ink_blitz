export const addPostTag = async (postTagObj) => {
  return await fetch('http://localhost:8088/postTags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(postTagObj),
  });
};
export const getPostTags = async (postId) => {
  const response = await fetch(`http://localhost:8088/postTags/${postId}`);
  const postTags = await response.json();
  return postTags;
};
