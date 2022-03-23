import React from 'react';
import Item from "../../Share/Item/Item";
import { Button, TextField, Container, Grid } from "@mui/material";
import axios from "axios";
import { API_URL } from '../../../util/const';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { AnimatePresence } from "framer-motion";
import Swal from 'sweetalert2';
import "../../Share/style.scss";

const ADShare = ({ shares, setShares, search, getShares }) => {

  const [img, setImg] = React.useState(null)
  const [imgItem, setImgItem] = React.useState(null)
  const [showModal, setShowModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [idItem, setIdItem] = React.useState(null);
  // const [filteredAd, setFilteredAd] = React.useState(shares);

  // React.useEffect(() => {
  //   setFilteredAd(shares??[])
  //   setShares(filteredAd.filter(e=>e.title.toLowerCase().includes(search.toLowerCase())))
  // }, [filteredAd, search, setShares, shares])

  console.log('search:', search)

  const formElement = React.useRef(null);

  function getNewValues() {
    formElement.current.reset();
    setImgItem("");
    setImg("");
    setLoading(false);
    setShowModal(false)
    setIdItem(null);
    setIsEditing(false);
  }

  const addAdverts = (evt) => {

    evt.preventDefault();
    setLoading(true);
    const { title, descriptions, finish_date } = evt.target.elements;

    const fd = new FormData();
    fd.append("title", title.value)
    fd.append("descriptions", descriptions.value)
    fd.append("image", imgItem)
    fd.append("finish_date", finish_date.value)

    axios.post(`${API_URL}/advertising/`, fd)

      .then(res => {
        console.log(res);
        getShares();
        getNewValues()
      })
      .catch(err => console.error(err));
  }

  const saveFile = (evt) => {
    setImg(window.URL.createObjectURL(evt.target.files[0]))
    setImgItem(evt.target.files[0])
  }

  const deleteAdvertItem = (id, title) => {
    axios.delete(`${API_URL}/advertising/${id}/`)
      .then(res => {
        console.log(res)
        getShares();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${title} deleted successfully !`,
          showConfirmButton: false,
          timer: "1000"
        })
      })
      .catch(err => {
        console.error(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Something wrong !`,
          showConfirmButton: false,
          timer: "2000"
        })
      })
  }

  const editItem = (id) => {
    setShowModal(true);
    setIsEditing(true);
    setIdItem(id);
  }


  const editAdvert = (evt) => {

    evt.preventDefault();
    setLoading(true);
    const { title, descriptions, finish_date } = evt.target.elements;


    const fd = new FormData();
    fd.append("title", title.value)
    fd.append("descriptions", descriptions.value)
    fd.append("image", imgItem)
    fd.append("finish_date", finish_date.value)

    axios.put(`${API_URL}/advertising/${idItem}/`, fd)

      .then(res => {
        console.log(res);
        getShares();
        getNewValues();
      })
      .catch(err => console.error(err));
  }



  return (
    <div className="advert">

      <Button onClick={() => setShowModal(true)}>Add Advertisement</Button>

      <div className={`add-modal ${showModal ? "active" : ""}`}>
        <form onSubmit={isEditing ? editAdvert : addAdverts} id="form_" ref={formElement}>
          <div className="mt-2 w-100">
            <TextField required className="mt-2 w-100" label="Name" color="primary" type="text" name="title" />
          </div>
          <div className="mt-2 w-100">
            <TextField required className="mt-2 w-100" label="Descriptions" color="primary" type="text" name="descriptions" />
          </div>

          <div className="mt-2 w-100">
            <img src={img} alt="" className={img && "show"} />

            <TextField required className="mt-2 w-100" color="primary" type="file" onChange={saveFile} />
          </div>
          <div className="mt-2 w-100">
            <span style={{ color: "#000" }}>Finish time</span>
            <TextField required className="mt-2 w-100" color="primary" type="date" name="finish_date" />
          </div>

          <div className="d-flex j-between a-center mt-2">
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>

            <Button type="button" variant="contained" color="error" onClick={getNewValues}>CANCEL</Button>
          </div>
        </form>
      </div>

      <div className={` ${showModal && "opacity"}`}></div>

      <Container>
        <Grid container spacing={3}>
          <AnimatePresence>
            {
              shares?.filter(e => e.title.toLowerCase().includes(search.toLowerCase())).map(share => {
                return (
                  <Grid item xs={4} key={share?.id}>
                    <Item
                      id={share.id}
                      descriptions={share?.descriptions}
                      image={share?.image}
                      start={share?.start}
                      title={share?.title}
                      finish_date={share?.finish_date}
                      deleteAdvertItem={deleteAdvertItem}
                      editItem={editItem}
                      type={true}
                    />
                  </Grid>
                )
              })
            }
          </AnimatePresence>
        </Grid>
      </Container>
    </div>
  )
}

export default ADShare