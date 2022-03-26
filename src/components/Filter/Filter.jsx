import React from 'react';
import { useFood } from '../../Context/foodsContext';
import {Container} from "@mui/material";
import "./style.scss";
const Filter = ({ filterItem, setFilterItem }) => {

    const [setFoodDatas] = useFood(true);
  
    const items = [
        { id: 0, value: "Bсе", path: "" },
        { id: 1, name: "Yaxna taomlar", value: "Холодные закуски", path: "yaxnataom" },
        { id: 2, name: "Issiq taomlar", value: "Горячие закуски", path: "qaynoqtaom" },
        { id: 3, name: "Go'shtli taomlar", value: "Мясные блюда", path: "goshtli" },
        { id: 4, name: "Baliqli taomlar", value: "Рыбные блюда", path: "baliqlitaom" },
        { id: 5, name: "Pitsa", value: "Питса", path: "pizza" },
        { id: 6, name: "Ichimliklar", value: "Напитки", path: "ichimliklar" },
    ]

    const changeCurrentItem = (item) => {
        setFoodDatas(null)
        setFilterItem({ path: item.path, title: item.name, currentItem: item.id });
        window.localStorage.setItem("filtered", JSON.stringify({
            path: item.path,
            title: item.name,
            currentItem: item.id
        }))
    }

    return (
        <div className="filter-form bg-dark">
            <Container>
                <div className='filter-content d-flex a-center'>
                    <div className="item-filter w-100">
                        <ul className='d-flex j-between'>
                            {
                                items.map((item) => {
                                    return (
                                        <li key={item.id}
                                            onClick={() => changeCurrentItem(item)}
                                            className={`${filterItem.currentItem === item.id ? "active" : ""}`}
                                        >{item.value}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Filter