import React, { useState } from 'react'
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { API_URL } from '../../../util/const';
import ReactReadMoreReadLess from "react-read-more-read-less";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Loader from "../../../components/Loader/Loader";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Swal from 'sweetalert2';
const ADFoods = ({state, setState, getFoods}) => {

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(null);
  const [img, setImg] = useState(null);
  const [imageItem, setImageItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = () => setShow(!show);


  React.useEffect(() => {
    getFoods();
  }, [getFoods])


  const addProduct = (evt) => {
    evt.preventDefault();
    setLoading(true);
    const { name, description, weight, price } = evt.target.elements;

    const fd = new FormData();

    fd.append("image", imageItem)
    fd.append("name", name.value)
    fd.append("description", description.value)
    fd.append("image", imageItem)
    fd.append("weight", weight.value)
    fd.append("price", price.value)
    fd.append("is_added", false)

    axios.post(`${API_URL}/taomlar/${category}/`, fd)
      .then(res => {
        console.log(res)
        setShow(false);
        setLoading(false)
        axios.get(API_URL).then(res => setState(res.data))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Product added successfully !!!",
          showConfirmButton: false,
          timer: "1000"
        })

      })
      .catch(err => {
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Something wrong !",
          showConfirmButton: false,
          timer: "1000"
        })
      })
  }

  const saveFile = (evt) => {
    setImg(window.URL.createObjectURL(evt.target.files[0]))
    setImageItem(evt.target.files[0])
  }

  const deleteItem = (category, id, name) => {
    axios.delete(`${API_URL}/taomlar/${category}/${id}/`)
      .then(res => {
        axios.get(API_URL).then(res => setState(res.data))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${name} deleted successfully !`,
          showConfirmButton: false,
          timer: "1000"
        })

      })
      .catch(res => {
        axios.get(API_URL).then(res => setState(res.data))
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Something went wrong !`,
          showConfirmButton: true,
        })

      })
  }



  return (
    <div className='admin-foods'>
      <Button className='text-wh mt-2 add-btn'
        onClick={showModal}
      >
        Add Product

      </Button>

      <div className={`modal-card ${show && 'show'}`}>
        <form onSubmit={addProduct}>

          <div>
            <label htmlFor="name">Category</label>
            <select onChange={(evt) => setCategory(evt.target.value)}>
              <option value="baliqlitaom">Baliqli Taom</option>
              <option value="goshtli">Go'shtli Taom</option>
              <option value="ichimliklar">Ichimlik</option>
              <option value="pizza">Pizza</option>
              <option value="qaynoqtaom">Qaynoq Taom</option>
              <option value="suyuqtaom">Suyuq Taom</option>
              <option value="yaxnataom">Yaxna Taom</option>
            </select>
          </div>

          <div>
            {
              img &&
              <span className="remove-img"
                onClick={() => setImg(null)}
              >
                <ClearOutlinedIcon />
              </span>
            }
            <img
              className={`${img && 'show'}`}
              src={img}
              alt=""

            />
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={saveFile}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='name' name="name" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea type="text" id="description" placeholder='description' name="description" />
          </div>
          {
            category === "ichimliklar" ?
              <div>
                <label htmlFor="size">Size (L)</label>
                <select name="weight" id='size'>
                  <option value="0.5L">0.5L</option>
                  <option value="1L">1L</option>
                  <option value="1.5L">1.5L</option>
                </select>
              </div> :
              <div>
                <label htmlFor="weight">Weight (г)</label>
                <input type="number" id="weight" placeholder='weight' name="weight" />
              </div>
          }


          <div>
            <label htmlFor="price">Price (₽)</label>
            <input type="number" id="price" placeholder='price' name="price" />
          </div>

          <div className='d-flex j-between'>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
            <Button
              type="button"
              onClick={showModal}
              variant="contained"
              color="error">Cancel</Button>
          </div>
        </form>

      </div>
      <div className={` ${show && "opacity"}`}></div>


      {
        !state ?
          <Loader /> :
          state?.map((parentData, index) => {
            return index !== 0 ? (
              <div className="table-content mt-3" key={parentData.code}>
                <h2>{parentData.name}</h2>
                <table className='foods-table w-100 mt-2'>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Weight</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      parentData?.data.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td><b>{index + 1}</b></td>
                            <td>
                              <img src={API_URL + item.image} alt="error" />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <ReactReadMoreReadLess
                                charLimit={20}
                                ellipsis="..."
                                readMoreText=""
                                readLessText=""
                              >
                                {item.description}
                              </ReactReadMoreReadLess>
                            </td>
                            <td>{item.weight ? `${item.weight} г` : item.size}</td>
                            <td>{item.price}₽</td>
                            <td>
                              <Button type="button" onClick={() => deleteItem(parentData.url, item.id, item.name)}>
                                <DeleteForeverIcon />
                              </Button></td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
              </div>
            ) : (<></>)
          })
      }


    </div>
  )
}

export default ADFoods