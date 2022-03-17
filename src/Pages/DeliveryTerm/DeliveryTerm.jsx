import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import Title from '../../components/Title/Title';
import "./style.scss";

const DeliveryTerm = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const terms = [
        {
            id: 1,
            expanded: "panel1",
            title: "У наших курьеров всегда должна быть сдача!",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`,
        },
        {
            id: 2,
            expanded: "panel2",
            title: "Вам что-то не довезли?",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`
        },
        {
            id: 3,
            expanded: "panel3",
            title: "Не понравился продукт?",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`
        },
        {
            id: 4,
            expanded: "panel4",
            title: "Если появились замечания",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`
        },
        {
            id: 5,
            expanded: "panel5",
            title: "Оплата Visa, MasterCard и МИР",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`
        },
        {
            id: 6,
            expanded: "panel6",
            title: "Реквизиты",
            text: `Мы очень внимательно следим за качеством нашей работы, 
                    поэтому, если у вас будут какие-либо замечания или предложения, 
                    то обязательно сообщайте их нам`
        },
    ]

    return (
        <div className='delivery-content'>  
                <Title title={'Условия доставки'}/>
            <Container>
                <div className="delivery-content-wrap">


                    <div className="left-side-col">
                        {
                            terms.map(term => {
                                return (
                                    <Accordion
                                    key={term.id}
                                        expanded={expanded === term.expanded}
                                        onChange={handleChange(term.expanded)}
                                        className="accordion-item-title"
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${term.id}bh-content`}
                                            id={`panel${term.id}bh-header`}
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                {term.title}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className="accordion-item-text"
                                        >
                                            <Typography>
                                                {term.text}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                    <div className="right-side-col">
                        <img src="/assets/img/location.png" className="w-100" alt="" />
                    </div>
                </div>

                <div className="time-table-wrap mt-3">
                    <div className="wrapper d-flex a-center j-between">
                    <div className="left">
                        <h3 className='font-semibold text-wh'>График работы доставки:</h3>
                        <p className="font-regular text-wh-50 mt-1">с 10:00-21:00</p>
                    </div>
                    <div className="right">
                        <h3 className='font-semibold text-wh'>График работы кафе:</h3>
                        <p className="font-regular text-wh-50 mt-1">с 08:00-21:00</p>
                    </div>
                    </div>

                    <h3 className='font-semibold text-wh mt-2'>Минимальный заказ:</h3>
                    <p className="font-regular text-wh-50 mt-1">Бесплатная доставка пешим курьером при сумме заказа от 400 ₽
                        Доставка оператором такси от любой суммы заказа - по тарифам
                        перевозчика.</p>
                </div>
            </Container>
        </div>
    )
}

export default DeliveryTerm