import React from 'react';
import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';
import "./style.scss";
const Cabinet = () => {

    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <div className="account-content">
            <Container className="container">
                <h2>Administrator Profile</h2>
                <div className="d-flex mt-3 j-between">
                    <div className="item-left">
                        <div className='img-wrap'>
                            <img src="https://dev716.pythonanywhere.com/media/photo_2022-03-20_19-00-14.jpg" alt="" />
                        </div>
                        <h3 className='name'>Farrux Aktamov</h3>
                        <p className='status'>Frontend Developer</p>

                        <div className="additionals">
                            <div className="d-flex j-between">
                                <p>Username:</p> <p>Farrux</p>
                            </div>
                            <div className="d-flex j-between">
                                <p>Age:</p> <p>21</p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="edit-btn"
                            variant="outlined"
                            color={isEditing ? 'secondary' : 'primary'}
                            type="button">{isEditing ? 'Cancel' : 'Edit Profile'}</Button>
                    </div>


                    {isEditing ?

                        <div className="item-right">

                            <div className="auth-form">
                                <TextField helperText="Please enter your current passsword!" label="password" type='password' />
                                <Button variant="contained" type="submit">Submit</Button>
                            </div>

                            {/* <div className="form-infos">
                                <form className='w-100'>
                                    <div className=''>
                                        <TextField className='text-input' label="First name" name="first_name" required />
                                        <TextField className='text-input' label="Surname" name="last_name" required />
                                    </div>
                                    <div className='mt-2'>
                                        <TextField className='text-input' label="Username" name="username" required />
                                        <TextField className='text-input' helperText="Date of birth" name="date_of_birth" required type={'date'} placeholder='' />
                                    </div>
                                    <div className='mt-2 pass'>
                                        <TextField className='text-input' label="Password" type="password" name="password" required />
                                        <TextField className='text-input' label="re-password" type="password" name="password" required />
                                    </div>

                                    <Button variant="contained" type="submit">Submit</Button>
                                </form>
                            </div> */}

                        </div> :

                        <div className="item-right desc">
                            <h2>Description</h2>
                            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati autem accusantium temporibus dolore debitis expedita dolores placeat, doloremque consectetur incidunt quos veritatis, harum provident magni. Quisquam maiores ratione deleniti itaque.</p>
                            <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati autem accusantium temporibus dolore debitis expedita dolores placeat, doloremque consectetur incidunt quos veritatis, harum provident magni. Quisquam maiores ratione deleniti itaque.</p>
                        </div>
                    }
                </div>
            </Container>
        </div>
    )
}

export default Cabinet