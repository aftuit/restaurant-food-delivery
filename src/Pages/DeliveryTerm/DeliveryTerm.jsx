import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import SimpleMap from "../../components/Location/Location"
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
            title: "Lorem ipsum dolor sit.!",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`,
        },
        {
            id: 2,
            expanded: "panel2",
            title: "Lorem ipsum dolor sit.?",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`
        },
        {
            id: 3,
            expanded: "panel3",
            title: "Lorem ipsum dolor sit.Lorem ipsum dolor sit.?",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`
        },
        {
            id: 4,
            expanded: "panel4",
            title: "Lorem ipsum dolor sit.",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`
        },
        {
            id: 5,
            expanded: "panel5",
            title: "Lorem ipsum dolor sit.",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`
        },
        {
            id: 6,
            expanded: "panel6",
            title: "Lorem ipsum dolor sit.",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem perspiciatis ab illum reprehenderit fuga ipsa aperiam recusandae! Hic facere quia esse in ipsa a, minus maxime perspiciatis omnis qui.`
        },
    ]

    return (
        <div className='delivery-content'>
            <Title title={'Yetkazib berish tartibi'} />
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
                                            <Typography sx={{ width: '80%', flexShrink: 0 }}>
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
                    <div className="right-side-col" id={"location"}>
                        <SimpleMap />
                    </div>
                </div>

                <div className="time-table-wrap mt-3">
                    <div className="wrapper d-flex a-center j-between">
                        <div className="left">
                            <h3 className='font-semibold text-dk'>Yetkazib berish vaqti:</h3>
                            <p className="font-regular text-dk mt-1">10:00-21:00</p>
                        </div>
                        <div className="right">
                            <h3 className='font-semibold text-dk'>Ish vaqti:</h3>
                            <p className="font-regular text-dk mt-1">08:00-21:00</p>
                        </div>
                    </div>

                    <h3 className='font-semibold text-dk mt-2'>Минимальный заказ:</h3>
                    <p className="font-regular text-dk mt-1">Бесплатная доставка пешим курьером при сумме заказа от 400 ₽
                        Доставка оператором такси от любой суммы заказа - по тарифам
                        перевозчика.</p>
                </div>
            </Container>
        </div>
    )
}

export default DeliveryTerm