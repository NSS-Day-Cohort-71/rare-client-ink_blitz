
import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { Link, useNavigate, useParams } from "react-router-dom"

// define CategoryList() function
    // define 'categories, setCategories' variable with useState() hook
    // define 'newCategory, setNewCategory' variable with useState() hook

    // define getAndSetCategories() function that fetches categories with getAllCategories()

    // define useEffect() hook that calls getAndSetCategories() on initial render

    // define useEffect() hook with newCategory in the dependency array
    // that calls getAndSetCategories() again when a new category is created

    // return JSX with list of categories as clickable items

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    // const [newCategory, setNewCategory] = useState()

    const getAndSetCategories = async () => {
        const categoriesArr = await getAllCategories()
        setCategories(categoriesArr)
    }

    useEffect(() => {
        getAndSetCategories()
    }, [])

    return (
        <section>
            <h1>Categories</h1>
            <button onClick={() => navigate('/createCategory')}>Create Category</button>
            {categories.map((category) => {
                return (
                    <div key={category.id}>
                        <button onClick={() => navigate(`/edit-category/${category.id}`)}>
                            Edit
                        </button>
                        <button>
                            Delete
                        </button>
                        <ul>
                            <Link to={`/categories/${category.id}`}>
                                <li>
                                    {category.label}
                                </li>
                            </Link>
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}