import React from 'react';
import Item from "../../Share/Item/Item";
import { Button } from "@mui/material";
import "../../Share/style.scss";
import axios from "axios";
import { API_URL } from '../../../util/const';
import Swal from 'sweetalert2';

const ADShare = ({ shares, getShares }) => {

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


  return (
    <div className="advert">

      <Button>Add Advertisement</Button>



      <div className="row_itms">
        {
          shares?.map(share => {
            return (
              <Item
                key={share?.id}
                id={share.id}
                descriptions={share?.descriptions}
                image={share?.image}
                start={share?.start}
                title={share?.title}
                finish_date={share?.finish_date}
                deleteAdvertItem={deleteAdvertItem}
                type={true}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ADShare