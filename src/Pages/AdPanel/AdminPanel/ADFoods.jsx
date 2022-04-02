import React, {useState} from 'react'
import {Button, TextField, InputLabel, MenuItem, Select} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {API_URL} from '../../../util/const';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Loader from "../../../components/Loader/Loader";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';


const ADFoods = ({state, setState, getFoods, search, filtered}) => {

    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("baliqlitaom");
    const [store, setStore] = useState("profil");
    const [img, setImg] = useState(null);
    const [imageItem, setImageItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEdting, setIsEditing] = useState(false);
    const [idItem, setIdItem] = useState(null);
    const [filteredState, setFilteredState] = React.useState([]);


    React.useEffect(() => {
        if (filtered !== "all") {
            setFilteredState(state?.filter(item => item.code === filtered))
        } else {
            setFilteredState(state?.filter((item, index) => index > 0))
        }
    }, [search, filtered, state])

    const showModal = () => setShow(!show);

    const fd = new FormData();
    const formEl = React.useRef(null);

    function getValues() {
        showModal();
        setIsEditing(false)
        setIdItem(null)
        setLoading(false)
        setImageItem("");
        setImg("");
        formEl.current.reset();
        setCategory("baliqlitaom");
        setStore('profil');
    }

    function getCategoryMethod(value) {
        switch (value) {
            case 'yaxnataom':
                return 'YAXNATAOMLAR';
            case 'qaynoqtaom':
                return 'QAYNOQTAOMLAR';
            case 'goshtli':
                return 'GOSHTLITAOMLAR';
            case 'baliqlitaom':
                return 'BALIQLITAOMLAR';
            default:
                return 'BALIQLITAOMLAR';
        }
    }

    function getTitleMethod(value) {
        switch (value) {
            case 'goshtli':
                return 'Alyumin';
            case 'baliqlitaom':
                return 'PVH';
            case 'qaynoqtaom':
                return 'Thermo';
            case 'yaxnataom':
                return 'Stanok va uskunalar';
            default:
                return '-----';
        }
    }

    const addProduct = (evt) => {

        evt.preventDefault();
        setLoading(true);
        const {name, description, price} = evt.target.elements;

        const id = new Date();

        fd.append("id", id.getTime())
        fd.append("image", imageItem)
        fd.append("name", name.value)
        fd.append("description", description.value)
        fd.append("price", price.value)
        fd.append("is_added", false)
        if (store === "accessory") {
            fd.append('model_code', getCategoryMethod(category))
        } else {
            fd.delete("model_code")
        }
        axios.post(`${API_URL}/taomlar/${store === 'profil' ? category : store}/`, fd)
            .then(() => {
                getFoods();
                getValues();
                formEl.current.reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Mahsulot qo'shildi !!!",
                    showConfirmButton: false,
                    timer: "1000"
                })

            })
            .catch(() => {
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Xatolik !!!',
                    showConfirmButton: false,
                    timer: "1000"
                })
            })

    }

    function editItem(id, category, store) {
        showModal();
        setIsEditing(true)
        setIdItem(id)
        setCategory(category)
        setStore(store)
    }

    const saveFile = (evt) => {
        setImg(window.URL.createObjectURL(evt.target.files[0]))
        setImageItem(evt.target.files[0])
    }

    const deleteItem = (category, id, name) => {
        axios.delete(`${API_URL}/taomlar/${category}/${id}/`)
            .then(() => {
                getFoods();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${name} o'chirildi !!!`,
                    showConfirmButton: false,
                    timer: "1000"
                })
            })
            .catch(() => {
                axios.get(API_URL).then(res => setState(res.data))
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Xatolik !!!`,
                    showConfirmButton: true,
                })

            })
    }

    const editProduct = (evt) => {

        evt.preventDefault();
        setLoading(true);
        const {name, description, price} = evt.target.elements;

        fd.append("image", imageItem)
        fd.append("name", name.value)
        fd.append("description", description.value)
        fd.append("price", price.value)
        fd.append("is_added", false)


        axios.patch(`${API_URL}/taomlar/${category}/${idItem}/`, fd)
            .then(() => {
                getFoods();
                getValues();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Ma'lumot o'zgartirildi !!!",
                    showConfirmButton: false,
                    timer: "1000"
                })

            })
            .catch(() => {
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Xatolik !!!",
                    showConfirmButton: false,
                    timer: "1000"
                })
            })

    }

    return (
        <div className='admin-foods'>

            <Button className='text-wh mt-2 add-btn'
                    onClick={showModal}
            >
                Xomashiyo qo'shish
            </Button>
            <div className={`modal-card ${show && 'show'}`}>
                <form onSubmit={isEdting ? editProduct : addProduct} ref={formEl}>
                    <div className={`w-100 ${isEdting && 'd-none'}`}>
                        <InputLabel id="demo-" className='w-100'>Kategoriya</InputLabel>
                        <Select
                            disabled={isEdting}
                            className='w-100'
                            labelId="demo-"
                            value={category}
                            onChange={(evt) => setCategory(evt.target.value)}
                        >
                            <MenuItem value="baliqlitaom">PVX</MenuItem>
                            <MenuItem value="goshtli">Alyumin</MenuItem>
                            <MenuItem value="qaynoqtaom">Therma</MenuItem>
                            <MenuItem value="yaxnataom">Stanok va uskunalar</MenuItem>

                        </Select>
                        {
                            category !== 'yaxnataom' &&
                            <>
                                <InputLabel id="demo-d" className='mt-1 w-100'>Bo'lim</InputLabel>
                                <Select
                                    disabled={isEdting}
                                    className='w-100'
                                    labelId="demo-d"
                                    value={store}
                                    onChange={(evt) => setStore(evt.target.value)}
                                >
                                    <MenuItem value="profil">Profil</MenuItem>
                                    <MenuItem value="accessory">Aksessuar</MenuItem>
                                </Select>
                            </>
                        }

                    </div>

                    <div className='w-100 mt-2'>
                        {
                            img &&
                            <span className="remove-img"
                                  onClick={() => setImg(null)}
                            ><ClearOutlinedIcon/></span>
                        }
                        <img
                            className={`${img && 'show'}`}
                            src={img}
                            alt=""
                        />
                        <TextField
                            required
                            type="file"
                            name="image"
                            accept=".png, .svg, .jpg, .jpeg"
                            helperText="Please enter product picture"
                            onChange={saveFile}/>
                    </div>
                    <div className='w-100 mt-2'>
                        <TextField required label="Name" color="primary" type="text" name="name"/>
                    </div>

                    <div className='w-100 mt-2'>
                        <TextField required label="Description" color="primary" type="text" name="description"/>
                    </div>

                    <div className='w-100 mt-2'>
                        <TextField required label="Narxi (so'm)" color="primary" type="number" name="price"/>
                    </div>

                    <div className='d-flex j-between mt-1'>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="end"
                            endIcon={<SaveIcon/>}
                            variant="contained"
                        >
                            Saqlash
                        </LoadingButton>
                        <Button
                            type="button"
                            onClick={getValues}
                            variant="contained"
                            color="error">Bekor qilish</Button>
                    </div>
                </form>

            </div>
            <div className={` ${show && "opacity"}`}></div>

            {
                !state ?
                    <Loader/> :
                    filteredState?.map((parentData) => {
                        return (
                            <div className={`table-content mt-3`} key={parentData.url}>

                                <h2>{getTitleMethod(parentData.url)}</h2>
                                <table className='foods-table w-100 mt-2'>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Rasm</th>
                                        <th>Nomi</th>
                                        <th>Ma'lumot</th>
                                        <th>Bo'limi</th>
                                        <th>Narxi</th>
                                        <th>Tahrir</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {

                                        parentData?.data.map((item, index) => {
                                            if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                                return (
                                                    <tr key={item.id}>
                                                        <td><b>{index + 1}</b></td>
                                                        <td>
                                                            <img src={API_URL + item.image} alt="error"/>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>
                                <span>
                                  {`${item.description.substr(0, 8)}...`}
                                </span>
                                                        </td>
                                                        <td>Profil</td>
                                                        <td>{item.price} so'm</td>
                                                        <td>
                                                            <Button color="secondary" variant="outlined"
                                                                    onClick={() => editItem(item.id, parentData.url, 'profil')}>
                                                                <EditIcon type="button"/>
                                                            </Button>
                                                            <Button type="button" className="delete"
                                                                    onClick={() => deleteItem(parentData.url, item.id, item.name)}>
                                                                <DeleteForeverIcon/>
                                                            </Button></td>
                                                    </tr>
                                                )
                                            } else {
                                                return (<></>)
                                            }
                                        })
                                    }

                                    {
                                        parentData?.accessory_data.map((item, index) => {
                                            if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                                return (
                                                    <tr key={item.id}>
                                                        <td><b>{index + parentData?.data.length + 1}</b></td>
                                                        <td>
                                                            <img src={API_URL + item.image} alt="error"/>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>
                                <span>
                                  {`${item.description.substr(0, 8)}...`}
                                </span>
                                                        </td>
                                                        <td>Aksessuar</td>
                                                        <td>{item.price} so'm</td>
                                                        <td>
                                                            <Button color="secondary" variant="outlined"
                                                                    onClick={() => editItem(item.id, 'accessory', 'accessory')}>
                                                                <EditIcon type="button"/>
                                                            </Button>
                                                            <Button type="button" className="delete"
                                                                    onClick={() => deleteItem('accessory', item.id, item.name)}>
                                                                <DeleteForeverIcon/>
                                                            </Button></td>
                                                    </tr>
                                                )
                                            } else {
                                                return (<></>)
                                            }
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default ADFoods