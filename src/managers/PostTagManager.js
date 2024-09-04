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
