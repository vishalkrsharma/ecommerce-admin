import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    category: '',
    parentCategory: '',
  });
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const res = await axios.get('/api/categories');
    const { data } = res;
    setCategories(data);
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    if (editedCategory) {
      const res = await axios.put('/api/categories', { category, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      const res = await axios.post('/api/categories', { category });
    }
    setCategory({ category: '', parentCategory: '' });

    getCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategory({
      category: category.name,
      parentCategory: category.parent?._id,
    });
  };

  const deleteCategory = (category) => {
    swal
      .fire({
        title: 'Are you sure ?',
        text: `Do you want to delete ${category.name} ?`,
        showCancelButton: true,
        showCancelButtonText: 'Cancel',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        confirmButtonColor: '#dd5555',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete('./api/categories?_id=' + category._id);
          getCategories();
        }
      });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <label htmlFor='category'>{editedCategory ? `Edit Category ${editedCategory.name}` : 'New Category Name'}</label>
        <input type='text' id='category' placeholder='Category Name' value={category.category} name='category' onChange={handleChange} />

        <label htmlFor='parentCategory'>Select Parent Category</label>
        <select name='parentCategory' value={category.parentCategory} id='parentCategory' onChange={handleChange}>
          <option value=''>No parent category</option>
          {categories.length > 0
            ? categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            : null}
        </select>
        <button type='submit' className='btn-primary py-1'>
          Save
        </button>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0
            ? categories.map((cat, ind) => (
                <tr key={ind}>
                  <td>{cat.name}</td>
                  <td>{cat?.parent?.name}</td>
                  <td>
                    <button className='btn-primary mr-2' onClick={() => editCategory(cat)}>
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(cat)} className='btn-primary'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
