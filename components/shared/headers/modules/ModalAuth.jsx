import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { config } from '~/config';

const ModalAuth = ({ show, setShow }) => {
    const [inputValue, setInputValue] = useState();
    const [statusNumber, setStatusNumber] = useState();
    const [smsCode, setSmsCode] = useState();
    const [resSmsCode, setResSmsCode] = useState();
    const [authPers, setAuthPer] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function sendSmsForAuth() {
        const options = {
            url: `${config.mainUrl}sms/code`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
            },
            data: {
                "phone": `+996${inputValue}`,
            },
        };

        axios(options)
            .then((response) => {
                setStatusNumber(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function sendSmsCodeAuth() {
        const options = {
            url: `${config.mainUrl}user/auth`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken
            },
            data: {
                "code": Number(smsCode),
                "sessionId": statusNumber?.data.sessionId
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status,response,"response");
                if(response?.status === 200){
                console.log(response,config,statusNumber?.data.sessionId,smsCode);

                    localStorage.setItem('authToken', response?.data.authToken);
                    localStorage.setItem('userPhone', response?.data.phone);
                } 
                
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        handleClose();
    }

    return (
        <div className="">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {statusNumber?.status === 200 ? (
                        <div>
                            <p className="modal__descr">
                                Введите код отправленный на номер : {inputValue}
                            </p>
                            <div className="numbers">
                                <input
                                    className="input__code"
                                    type="text"
                                    placeholder="4-значный код"
                                    onChange={(e) => setSmsCode(e.target.value)}
                                />
                                <button
                                    className="btn__modal"
                                    onClick={() => sendSmsCodeAuth()}>
                                    Отправить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="modal__title">
                                Введите номер телефона
                            </p>
                            <p className="modal__descr">
                                На указанный номер будет отправлено SMS с кодом
                            </p>
                            <div className="numbers">
                                <div className="number__code">+996</div>
                                <input
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    placeholder="509-155-155"
                                    type="text"
                                />
                            </div>{' '}
                            <button
                                className="btn__modal"
                                variant="primary"
                                onClick={() => sendSmsForAuth()}>
                                Отправить
                            </button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalAuth;
