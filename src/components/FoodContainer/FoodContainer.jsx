import React from 'react'
import FoodCard from '../FoodCard/FoodCard';
import Title from "../Title/Title";
import Slider from "react-slick";
import "./style.scss";

const FoodContainer = ({ parentData, title, data, path }) => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: data.length > 4 ? 4 : data.length,
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

            <Title title={title} />

            <div className="food-content">
                    <Slider {...settings}>
                        {

                            data?.map((food) => {
                                return <FoodCard
                                    key={food.id}
                                    path={parentData.url ?? path}
                                    food={food}
                                    foodDataFromParent={parentData}
                                    data={data}
                                />
                            })
                        }
                    </Slider>
            </div>
        </div>
    )
}

export default FoodContainer;