import React from 'react'
import FoodCard from '../FoodCard/FoodCard';
import Title from "../Title/Title";
import Slider from "react-slick";
import axios from "axios";
import { API_URL } from '../../util/const';
import "./style.scss";

const FoodContainer = ({ parentData, title, data, path }) => {



  const [accessuar, setAccessuar] = React.useState('')

  React.useEffect(() => {
    axios.get(`${API_URL}/taomlar/accessory/`)
      .then((res) => { setAccessuar(res.data) }
      )
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: data?.length > 4 ? 4 : data?.length,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  var settingsAccess = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: accessuar?.results?.length > 4 ? 4 : accessuar?.results?.length,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  return (
    <div className="food-container">
      <div className="mt-3"></div>
      <Title title={'Profin'} />

      <div className="food-content">
        <Slider {...settings}>
          {
            data?.map((food) => {
              return <FoodCard
                key={food.id}
                food={food}
                path={parentData.url ?? path}
                foodDataFromParent={parentData}
                data={data}
              />
            })
          }
        </Slider>
      </div>
      <div className="mt-3"></div>
      <Title title={'Aksessuarlar'} />

      <div className="food-content">
        <Slider {...settingsAccess}>
          {
            accessuar?.results?.map((food) => {
              return <FoodCard
                key={food.id}
                path={'accessory'}
                food={food}
                foodDataFromParent={parentData}
              />
            })
          }
        </Slider>
      </div>

    </div>
  )
}

export default FoodContainer;