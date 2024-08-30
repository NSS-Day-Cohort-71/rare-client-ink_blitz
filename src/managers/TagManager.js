// define addTag() function that does a 'POST' fetch to 'http://localhost:8088/tags

export const addTag = async (tagObj) => {
  const response = await fetch('http://localhost:8088/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(tagObj),
  });

  return await response.json();
};

export const getAllTags = async () => {
  const response = await fetch('http://localhost:8088/tags');
  const tags = await response.json();
  return tags;
};
