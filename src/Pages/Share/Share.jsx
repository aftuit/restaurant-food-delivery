import React from 'react'
import { Container, Grid } from '@mui/material'
import Title from "../../components/Title/Title";
import Item from './Item/Item';
import axios from 'axios';
import { API_URL } from "../../util/const";
import Loader from "../../components/Loader/Loader"
import "./style.scss";
const Share = () => {

    const [adverts, setAdverts] = React.useState('')

    React.useEffect(() => {
        axios.get(`${API_URL}/advertising/`)
            .then(res => {
                // console.log(res)
                setAdverts(res.data)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])

    return (
        <div className='share-content'>

            <Title title={'АКЦИИ'} />
            <Container>
                    <Grid container spacing={3}>
                    {
                        adverts.length === 0 ?
                            <Loader /> :
                            adverts?.map(item => {
                                return (
                                    <Grid item xs={4} key={item.id}>
                                        <Item
                                            
                                            descriptions={item.descriptions}
                                            image={item.image}
                                            start={item.start}
                                            title={item.title}
                                            finish_date={item.finish_date}
                                            type={false}
                                        />
                                    </Grid>
                                )
                            })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Share