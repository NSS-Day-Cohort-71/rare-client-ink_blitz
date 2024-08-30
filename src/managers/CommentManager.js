
export const getAllComments = async () => {
    const response = await fetch('http://localhost:8088/comments')
    const comments = await response.json()
    return comments
}

export const addComment = async (commentObj) => {
    const response = await fetch('http://localhost:8088/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(commentObj)
    });

    return await response.json()
}