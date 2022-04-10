import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Container} from '@mui/material';
import SimpleMap from "../../components/Location/Location"
import Title from '../../components/Title/Title';
import "./style.scss";
import {LangContext} from "../../Context/localization";

const DeliveryTerm = () => {
    const {lang, languageType} = React.useContext(LangContext);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='delivery-content'>
            <Title title={lang[languageType].delivery.title}/>
            <Container>
                <div className="delivery-content-wrap">


                    <div className="left-side-col">
                        {
                            lang[languageType].delivery.points.map(term => {
                                return (
                                    <Accordion
                                        key={term.id}
                                        expanded={expanded === term.expanded}
                                        onChange={handleChange(term.expanded)}
                                        className="accordion-item-title"
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls={`panel${term.id}bh-content`}
                                            id={`panel${term.id}bh-header`}
                                        >
                                            <Typography sx={{width: '80%', flexShrink: 0}}>
                                                {term.title}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className="accordion-item-text"
                                        >
                                            <Typography>
                                                {term.info}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                    <div className="right-side-col" id={"location"}>
                        <SimpleMap/>
                    </div>
                </div>
                <div className="time-table-wrap mt-3">
                    <div className="wrapper d-flex a-center j-between">
                        <div className="right">
                            <h3 className='font-semibold text-dk'>{lang[languageType].delivery.time.title}</h3>
                            <p className="font-regular text-dk mt-1">08:00-21:00</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DeliveryTerm