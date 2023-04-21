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
  const [properties, setProperties] = useState([]);

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
    const data = {
      category,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      const res = await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      const res = await axios.post('/api/categories', data);
    }
    setCategory({ category: '', parentCategory: '' });
    setProperties([]);
    getCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategory({
      category: category.name,
      parentCategory: category.parent?._id,
    });
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
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

  const addProperty = () => {
    setProperties((prevProperties) => {
      return [...prevProperties, { name: '', values: '' }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prevProperties) => {
      return [...prevProperties].filter((p, ind) => {
        return ind !== indexToRemove;
      });
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

        <label htmlFor='properties' className='block'>
          Properties
        </label>
        <button type='button' className='btn-default' onClick={addProperty}>
          Add New Property
        </button>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className='flex gap-1 my-2'>
              <input
                type='text'
                value={property.name}
                className='mb-0'
                onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder='property name (example: color)'
              />
              <input
                type='text'
                className='mb-0'
                onChange={(ev) => handlePropertyValuesChange(index, property, ev.target.value)}
                value={property.values}
                placeholder='values, comma separated'
              />
              <button onClick={() => removeProperty(index)} type='button' className='btn-red'>
                Remove
              </button>
            </div>
          ))}

        <div className='flex gap-1'>
          {editedCategory && (
            <button
              type='button'
              className='btn-default py-1 mt-2'
              onClick={() => {
                setEditedCategory(null);
                setCategory({});
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type='submit' className='btn-primary py-1 mt-2'>
            Save
          </button>
        </div>
      </form>

      {!editedCategory && (
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
                      <button onClick={() => deleteCategory(cat)} className='btn-red'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
