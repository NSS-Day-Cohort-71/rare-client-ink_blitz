// define addPost(post_object) function
    // make POST request to 'http://localhost:8088/posts)

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