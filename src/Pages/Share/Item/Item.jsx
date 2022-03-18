import React from 'react'
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = ({
    id,
    descriptions,
    image,
    title,
    finish_date,
    deleteAdvertItem,
    editItem,
    type
}) => {

    const [month, setMonth] = React.useState('')

    function getDate(finish_date) {
        switch (finish_date.substr(5, 2)) {
            case "01": return setMonth("January");
            case "02": return setMonth("February");
            case "03": return setMonth("March");
            case "04": return setMonth("April");
            case "05": return setMonth("May");
            case "06": return setMonth("June");
            case "07": return setMonth("July");
            case "08": return setMonth("August");
            case "09": return setMonth("September");
            case "10": return setMonth("October");
            case "11": return setMonth("November");
            case "12": return setMonth("December");
            default: return setMonth("");
        }
    }

    React.useEffect(() => {
        getDate(finish_date)
    }, [finish_date])


    return (
        <div className={`${type ? "ad" : "sha"} share-item-card mt-2`}>
            <div className="div">
                <div className="img-wrap">
                    <img src={image} alt="" />

                </div>
                <div className="card--body text-wh">
                    <span style={{color: "#000"}}>{id}</span>
                    <h3 className="font-semibold">{title ?? "title"}</h3>
                    <p className="font-regular">
                        {descriptions}
                    </p>
                    <p className='deadline'>
                        До {finish_date.substr(0, 4)} {month} {finish_date.substr(8, 2)}
                    </p>
                </div>

                {
                    type &&
                    <div className="card--footer d-flex j-between">
                        <Button 
                        color="secondary" 
                        type="button" 
                        variant="contained"
                        onClick={()=>editItem(id)}
                        >
                            <EditIcon size="small" /> Edit
                        </Button>
                        
                        <Button 
                        color="error" 
                        type="button" 
                        variant="contained"
                        onClick={()=>deleteAdvertItem(id, title)}
                        >
                            <DeleteIcon size="small" /> Delete
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
export default Item