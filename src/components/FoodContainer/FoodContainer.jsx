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