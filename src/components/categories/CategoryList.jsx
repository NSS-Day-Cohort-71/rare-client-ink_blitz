import { useEffect, useState } from 'react';
import {
  deleteCategory,
  getAllCategories,
} from '../../managers/CategoryManager';
import { Link, useParams } from 'react-router-dom';

// define CategoryList() function
// define 'categories, setCategories' variable with useState() hook
// define 'newCategory, setNewCategory' variable with useState() hook

// define getAndSetCategories() function that fetches categories with getAllCategories()

// define useEffect() hook that calls getAndSetCategories() on initial render

// define useEffect() hook with newCategory in the dependency array
// that calls getAndSetCategories() again when a new category is created

// return JSX with list of categories as clickable items

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  // const [newCategory, setNewCategory] = useState()

  const getAndSetCategories = async () => {
    const categoriesArr = await getAllCategories();
    setCategories(categoriesArr);
  };

  useEffect(() => {
    getAndSetCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    await deleteCategory(categoryId);
    getAndSetCategories();
  };

  return (
    <section>
      <h1>Categories</h1>
      {categories?.map((category) => {
        return (
          <div key={category.id}>
            <ul>
              <li>
                <Link to={`/categories/${category.id}`}>{category.label}</Link>{' '}
                <button onClick={() => handleDelete(category.id)}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        );
      })}
    </section>
  );
};
