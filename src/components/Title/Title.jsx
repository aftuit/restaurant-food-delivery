import React from 'react'
import {Container} from '@mui/material';
import "./style.scss";
const Title = ({title}) => {
  return (
    <div className='title-wrap'>
        <Container>
            <h2 className={'font-regular'}>{title}</h2>
        </Container>
    </div>
  )
}

export default Title