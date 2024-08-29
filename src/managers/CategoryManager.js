// define addCategory() function that does a 'POST' fetch to 'http://localhost:8088/categories

export const addCategory = async (categoryObj) => {
    const response = await fetch(
        "http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(categoryObj)
        }
    )

    return await response.json()
}