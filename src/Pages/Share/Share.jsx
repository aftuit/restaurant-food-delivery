import React from 'react'
import { Container } from '@mui/material'
import Title from "../../components/Title/Title";
import Item from './Item/Item';
import axios from 'axios';
import {API_URL} from "../../util/const";
import "./style.scss";
const Share = () => {

    React.useEffect(() => {
        axios.get(`${API_URL}/advertising/`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <div className='share-content'>

            <Title title={'АКЦИИ'} />

            <Container>
                <div className="row_itms">
                    {
                        [...Array(20)].map(item => {
                            return (
                                <Item />
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Share