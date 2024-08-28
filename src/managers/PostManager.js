// create getPostById fetch

export const addPost = async (postObject) => {
    const response = await fetch(
        'http://localhost:8088/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
            body: JSON.stringify(postObject)
        }
    )

    return await response.json()
}

export const getPost = async (postId) => {
    const response = await fetch(
        `http://localhost:8088/posts/${postId}`)
        return await response.json()
}