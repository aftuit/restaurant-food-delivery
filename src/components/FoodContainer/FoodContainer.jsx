import React from 'react'
import FoodCard from '../FoodCard/FoodCard';
import Title from "../Title/Title";
import { useFood } from '../../Context/foodsContext';
import Slider from "react-slick";
import "./style.scss";

const FoodContainer = ({ parentData, title, data, path }) => {

    const [foodDatas] = useFood();

    const addItem = (item, foodDataFromParent) => {
        console.log(item.id);
        console.log(foodDataFromParent);
        console.log(foodDatas);
        // setFoodDatas(
        //     foodDatas.map(food => {
        //         if(food.code === foodDataFromParent.code) {
        //             food.data.map(value => {
        //                 if(value.id === item.id){
        //                     return {
        //                         ...value,
        //                         is_added: true
        //                     }
        //                 } else return value
        //             })
        //         }
        //             // {
        //             //     ...food,
        //             //     is_added: true
        //             // }
        //             // : food
        //     })
        // )
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
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
                                path={parentData.url??path}
                                food={food}
                                addItem={addItem}
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