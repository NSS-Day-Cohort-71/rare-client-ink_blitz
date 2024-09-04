// define addCategory() function that does a 'POST' request to 'http://localhost:8088/categories'

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

// define getAllCategories() function to do a 'GET' request to 'http://localhost:8088/categories'
export const getAllCategories = async () => {
    const response = await fetch("http://localhost:8088/categories")
    const categories = await response.json()
    
    return categories
}

export const getCategoryById = async (categoryId) => {
    const response = await fetch(`http://localhost:8088/categories/${categoryId}`)
    return await response.json()
} 

export const editCategory = async (categoryObj) => {
    return await fetch(
        `http://localhost:8088/categories/${categoryObj.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(categoryObj)
        }
    );
}