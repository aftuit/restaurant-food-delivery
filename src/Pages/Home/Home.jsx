import React, { useState } from 'react'
import Head from "../../components/Head/Head";
import Cafe from "../../components/Cafe/Cafe";
import Filter from "../../components/Filter/Filter";
import Contact from "../../components/Contact/Contact";
import FoodContainer from '../../components/FoodContainer/FoodContainer';
import { useFood } from "../../Context/foodsContext";
import { useSearch } from "../../Context/searchContext";
import axios from "axios";
import Loader from '../../components/Loader/Loader';
import { API_URL } from "../../util/const";
import "./style.scss";
const Home = () => {

    const [filterItem, setFilterItem] = useState(
        JSON.parse(window.localStorage.getItem("filtered")) || { path: "", title: "", currentItem: 0 }
    )

    const [foodDatas, setFoodDatas] = useFood();
    // const [search, setSearch] = useSearch();

    React.useEffect(() => {
        axios.get(`${API_URL}${filterItem.path ? "/taomlar/" : ""}${filterItem.path}/`)
            .then(res => {
                setFoodDatas(res.data)
            })
            .catch(err => console.log(err))
    }, [filterItem])


    return (
        <div>
            <Head />
            <main className='bg-dark'>
                <Filter filterItem={filterItem} setFilterItem={setFilterItem} />
                <div className="cards">

                    {
                        !foodDatas ?
                            <Loader /> :
                            filterItem.path === "" ?
                                foodDatas?.map((foodData, index) => {
                                    if (index !== 0) return (
                                        <FoodContainer
                                            key={foodData.code}
                                            title={foodData.name}
                                            parentData={foodData}
                                            data={foodData.data}
                                        />
                                    )
                                }) :
                                <FoodContainer
                                    title={filterItem.title}
                                    parentData={foodDatas}
                                    data={foodDatas.results}
                                    path={filterItem.path}
                                />
                    }
                </div>

                <Cafe />
                <Contact />
            </main>
        </div>
    )
}

export default Home