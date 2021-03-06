import React, { useState } from 'react'
import Head from "../../components/Head/Head";
import Cafe from "../../components/Cafe/Cafe";
import Filter from "../../components/Filter/Filter";
import Contact from "../../components/Contact/Contact";
import FoodContainer from '../../components/FoodContainer/FoodContainer';
import { useFood } from "../../Context/foodsContext";
import { LangContext } from '../../Context/localization';
import axios from "axios";
import Loader from '../../components/Loader/Loader';
import { API_URL } from "../../util/const";
import "./style.scss";
const Home = () => {

    const {lang, languageType} = React.useContext(LangContext);

    const [filterItem, setFilterItem] = useState(
        JSON.parse(window.localStorage.getItem("filtered")) || { path: "goshtli", title: "GOSHTLITAOMLAR", currentItem: 0 }
    )
    const [foodDatas, setFoodDatas] = useFood();
    React.useEffect(() => {
        axios.get(`${API_URL}${filterItem.path ? "/taomlar/" : ""}${filterItem.path}/`)
            .then(res => {
                setFoodDatas(res.data)
            })
    }, [filterItem, setFoodDatas])

    return (
        <div>
            <Head />
            <main className='bg-dark'>
                <Filter
                    filterItem={filterItem}
                    setFilterItem={setFilterItem}
                    lang={lang}
                    languageType={languageType}
                />
                <div className="cards">

                    {
                        !foodDatas ?
                            <Loader /> :
                            filterItem.path === "" ?
                                foodDatas?.map((foodData, index) => {
                                    return (index !== 0) && (
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
                    <Cafe
                        lang={lang}
                        languageType={languageType}
                    />
                <Contact
                    lang={lang}
                    languageType={languageType}
                />
            </main>
        </div>
    )
}

export default Home