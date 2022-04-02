import React from 'react';
import { useFood } from '../../Context/foodsContext';
import {Container} from "@mui/material";
import "./style.scss";
const Filter = ({ filterItem, setFilterItem, lang, languageType }) => {

    const [setFoodDatas] = useFood(true);

    const items = [
        { id: 0, name: "GOSHTLITAOMLAR", value: "Alyumin", path: "goshtli" },
        { id: 1, name: "BALIQLITAOMLAR", value: "PVH", path: "baliqlitaom" },
        { id: 2, name: "QAYNOQTAOMLAR", value: "Thermo", path: "qaynoqtaom" },
        { id: 3, name: "YAXNATAOMLARLAR", value: "Stanok va uskunalar", path: "yaxnataom" },
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
        <div className="filter-form bg-dark mt-1">
            <Container>
                <div className='filter-content d-flex a-center'>
                    <div className="item-filter w-100">
                        <ul className='d-flex j-between'>
                            {
                                items.map((item, index) => {
                                    return (
                                        <li key={item.id}
                                            onClick={() => changeCurrentItem(item)}
                                            className={`font-semibold ${filterItem.currentItem === item.id ? "active" : ""}`}
                                        >{lang[languageType].filter[index]}</li>
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