// create getPostById fetch

export const addPost = async (postObject) => {
  const response = await fetch('http://localhost:8088/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(postObject),
  });

  return await response.json();
};

export const getPost = async (postId) => {
  const response = await fetch(`http://localhost:8088/posts/${postId}`);
  return await response.json();
};

export const editPost = async (post) => {
  const response = await fetch(`http://localhost:8088/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (response.status === 204) {
    // No content, return an empty object or some indication of success
    return {};
  }

  return await response.json();
};
