import React, { useState } from 'react'
import { Button, TextField, InputLabel, MenuItem, Select } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { API_URL } from '../../../util/const';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Loader from "../../../components/Loader/Loader";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';



const ADFoods = ({ state, setState, getFoods, search, filtered }) => {

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("baliqlitaom");
  const [img, setImg] = useState(null);
  const [imageItem, setImageItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdting, setIsEditing] = useState(false);
  const [idItem, setIdItem] = useState(null);
  const [filteredState, setFilteredState] = React.useState([]);


  React.useEffect(() => {
    if (filtered !== "all") {
      setFilteredState(state?.filter(item => item.code === filtered))
    } else {
      setFilteredState(state?.filter((item, index) => index > 0))
    }
  }, [search, filtered, state])


  const showModal = () => setShow(!show);

  const fd = new FormData();
  const formEl = React.useRef(null);

  function getValues() {
    showModal();
    setIsEditing(false)
    setIdItem(null)
    setLoading(false)
    setImageItem("");
    setImg("");
    formEl.current.reset();
    setCategory("baliqlitaom")
  }

  const addProduct = (evt) => {

    evt.preventDefault();
    setLoading(true);
    const { name, description, weight, price } = evt.target.elements;

    fd.append("image", imageItem)
    fd.append("name", name.value)
    fd.append("description", description.value)
    fd.append("weight", weight.value)
    fd.append("price", price.value)
    fd.append("is_added", false)

    axios.post(`${API_URL}/taomlar/${category}/`, fd)
      .then(res => {
        getFoods();
        getValues();
        formEl.current.reset();
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

  function editItem(id, category) {
    showModal();
    setIsEditing(true)
    setIdItem(id)
    setCategory(category)

  }

  const saveFile = (evt) => {
    setImg(window.URL.createObjectURL(evt.target.files[0]))
    setImageItem(evt.target.files[0])
  }

  const deleteItem = (category, id, name) => {
    axios.delete(`${API_URL}/taomlar/${category}/${id}/`)
      .then(res => {
        getFoods();
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

  const editProduct = (evt) => {

    evt.preventDefault();
    setLoading(true);
    const { name, description, weight, price } = evt.target.elements;

    fd.append("image", imageItem)
    fd.append("name", name.value)
    fd.append("description", description.value)
    fd.append("weight", weight.value)
    fd.append("price", price.value)
    fd.append("is_added", false)

    axios.put(`${API_URL}/taomlar/${category}/${idItem}/`, fd)
      .then(res => {
        getFoods();
        getValues();
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

  return (
    <div className='admin-foods'>

      <Button className='text-wh mt-2 add-btn'
        onClick={showModal}
      >
        Add Product
      </Button>
      <div className={`modal-card ${show && 'show'}`}>
        <form onSubmit={isEdting ? editProduct : addProduct} ref={formEl}>
          <div className="w-100">
            <InputLabel id="demo-" className='w-100'>Category</InputLabel>
            <Select
              disabled={isEdting}
              className='w-100'
              labelId="demo-"
              value={category}
              onChange={(evt) => setCategory(evt.target.value)}
            >
              <MenuItem value="baliqlitaom">Baliqli Taom</MenuItem>
              <MenuItem value="goshtli">Go'shtli Taom</MenuItem>
              <MenuItem value="ichimliklar">Ichimlik</MenuItem>
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="qaynoqtaom">Qaynoq Taom</MenuItem>
              <MenuItem value="suyuqtaom">Suyuq Taom</MenuItem>
              <MenuItem value="yaxnataom">Yaxna Taom</MenuItem>
            </Select>
          </div>

          <div className='w-100 mt-2'>
            {
              img &&
              <span className="remove-img"
                onClick={() => setImg(null)}
              ><ClearOutlinedIcon /></span>
            }
            <img
              className={`${img && 'show'}`}
              src={img}
              alt=""
            />
            <TextField
              type="file"
              name="image"
              helperText="Please enter product picture"
              onChange={saveFile} />
          </div>
          <div className='w-100 mt-2'>
            <TextField label="Name" color="primary" type="text" name="name" />
          </div>

          <div className='w-100 mt-2'>
            <TextField label="Description" color="primary" type="text" name="description" />
          </div>
          {
            category === "ichimliklar" ?
              <div className='w-100 mt-2'>
                <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="weight"
                  className='w-100'
                >
                  <MenuItem value={'0.5L'}>0.5 L</MenuItem>
                  <MenuItem value={'1L'}>1 L</MenuItem>
                  <MenuItem value={'1.5L'}>1.5 L</MenuItem>
                  <MenuItem value={'2L'}>2 L</MenuItem>
                </Select>
              </div> :
              <div className='w-100 mt-2'>
                <TextField label="Weight (г)" color="primary" type="number" name="weight" />
              </div>
          }


          <div className='w-100 mt-2'>
            <TextField label="Price (₽)" color="primary" type="number" name="price" />
          </div>

          <div className='d-flex j-between mt-1'>
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
              onClick={getValues}
              variant="contained"
              color="error">Cancel</Button>
          </div>
        </form>

      </div>
      <div className={` ${show && "opacity"}`}></div>
      {
        !state ?
          <Loader /> :
          filteredState?.map((parentData) => {
            return (
              <div className={`table-content mt-3`} key={parentData.url}>
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
                        if (item.name.toLowerCase().includes(search.toLowerCase())) {
                          return (

                            <tr key={item.id}>
                              <td><b>{index + 1}</b></td>
                              <td>
                                <img src={API_URL + item.image} alt="error" />
                              </td>
                              <td>{item.name}</td>
                              <td>
                                <span>
                                  {`${item.description.substr(0, 8)}...`}
                                </span>
                              </td>
                              <td>{item.weight ? `${item.weight} г` : item.size}</td>
                              <td>{item.price}₽</td>
                              <td>
                                <Button color="secondary" variant="outlined" onClick={() => editItem(item.id, parentData.url)}>
                                  <EditIcon type="button" />
                                </Button>
                                <Button type="button" className="delete" onClick={() => deleteItem(parentData.url, item.id, item.name)}>
                                  <DeleteForeverIcon />
                                </Button></td>
                            </tr>
                          )
                        } else {
                          return (<></>)
                        }
                      })
                    }

                  </tbody>
                </table>
              </div>
            )
          })
      }

    </div>
  )
}

export default ADFoods