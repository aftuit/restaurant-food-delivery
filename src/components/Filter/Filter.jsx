import React, { useState, useRef } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { IconButton, Container } from '@mui/material';
import { useFood } from '../../Context/foodsContext';
import { useSearch } from '../../Context/searchContext';
import "./style.scss";
const Filter = ({ filterItem, setFilterItem }) => {

    const [isSearching, setIsSearching] = useState(true);

    const inputEl = useRef(null);

    const [setFoodDatas] = useFood(true);
    const [search, setSearch] = useSearch();

    function handleSearch() {
        inputEl.current.focus();
        setIsSearching(!isSearching);
        console.log(inputEl)
    }

    const searchItem = (evt) => {
        setSearch(evt.target.value)
        // setFoodDatas(
        //     foodDatas.filter(item => item.data.filter(childItem => childItem.name.toLowerCase().includes(search.toLowerCase())))
        // )
    }
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
                <div className='filter-content'
                    style={{
                        display: isSearching ? 'flex' : 'block',
                        alignItems: isSearching ? 'center' : ''
                    }}
                >
                    <div className={`${isSearching ? 'searching' : ''} search-filter d-flex a-center`}>
                        <IconButton aria-label="search"
                            onClick={() => handleSearch()}
                        >
                            <SearchOutlinedIcon className="search" />
                        </IconButton>
                        <input
                            ref={inputEl}
                            onChange={(e)=>searchItem(e)}
                            value={search}
                            type="text"
                            placeholder={"search..."}
                            style={{ display: `${isSearching ? 'none' : ''}` }}
                        />
                        {
                            search.length > 0 &&
                            <IconButton aria-label="delete"
                                onClick={() => setSearch('')}
                            >
                                <ClearOutlinedIcon className="cancel" />
                            </IconButton>
                        }
                    </div>
                    <div className="item-filter"
                        style={{ width: isSearching ? '100%' : '', display: isSearching ? '' : 'none' }}
                    >
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