import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editCategory, getCategoryById } from "../../managers/CategoryManager"

export const EditCategory = () => {
    const { categoryId } = useParams()
    const [category, setCategory] = useState({
        label: ''
    })
    const label = useRef()
    const navigate = useNavigate()

    const getAndSetCategory = async () => {
        const categoryObject = await getCategoryById(categoryId)
        setCategory(categoryObject)
    }

    useEffect(() => {
        getAndSetCategory()
    }, [categoryId])

    const handleLabelChange = () => {
        const copy = { ...category }
        copy.label = label.current.value
        setCategory(copy)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const editedCategoryObject = { ...category }

        await editCategory(editedCategoryObject)
        navigate(`/categoryManager`)
    }

    return (
        <section className="columns is-centered">
            <form className="column is-two-thirds" onSubmit={handleSubmit}>
                <h1 className="title">Edit Category</h1>

                <div className="field">
                <div className="control">
                    <input
                    required
                    className="input"
                    type="text"
                    ref={label}
                    value={category.label}
                    onChange={handleLabelChange}
                    />
                </div>
                </div>

                <div className="field">
                <button className="button is-link" type="submit">
                    Save
                </button>
                </div>
            </form>
        </section>
    )
}