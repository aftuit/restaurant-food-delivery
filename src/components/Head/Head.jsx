import React from "react";
import Silder from "react-slick";
import axios from "axios";
import { API_URL } from "../../util/const";
import "./style.scss";

const Head = () => {

    const [state, setState] = React.useState(null)

    React.useEffect(() => {
        axios.get(`${API_URL}/advertising/`)
            .then(res => {
                setState(res.data)
            })
            .catch(err => console.error(err))
    }, [])


    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    return (
        <div className="head-content">

            <Silder {...settings}>
                {
                    state?.map(item => <img
                                        key={item.id}
                                        width={'w-100'}
                                        src={item?.image}
                                        alt={item?.name} />)
                }
            </Silder>
        </div>
    )
}

export default Head;