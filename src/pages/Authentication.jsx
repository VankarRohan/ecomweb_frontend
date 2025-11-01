import Modal from '@mui/material/Modal'
import React, { useState } from 'react'
import { Close } from "@mui/icons-material";
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Authentication = ({ openAuth, setOpenAuth }) => {

    const [login, setLogin] = useState(false)
    return (
        <Modal open={openAuth} onClose={() => setOpenAuth(false)}>

            <div className="auth-container">
               
                <div className="auth-right">
                    <div className="auth-closebutton">
                        <Close onClick={() => setOpenAuth(false)} />
                    </div>
                    <>
                        {login ? (
                            <>
                                <SignIn setOpenAuth={setOpenAuth} />
                                <div className='auth-text'>
                                    {" "}
                                    Don't have an account ?{" "}
                                    <div className='auth-textbutton' onClick={() => setLogin(false)}>Sign Up</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <SignUp setOpenAuth={setOpenAuth} />
                                <div className='auth-text'>
                                    Already have an account ?{" "}
                                    <div className='auth-textbutton' onClick={() => setLogin(true)}>Sign In</div>
                                </div>
                            </>
                        )}
                    </>

                </div>
            </div>
        </Modal>
    )
}

export default Authentication
