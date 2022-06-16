import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {config} from "~/config";


function ModalOrder({ show, setShow }) {
    const handleShow = () => setShow(true);
    function handleClose() {
        setShow(false);
        location.reload();
    }

    const [dataUserNumber, setDataUserNumber] = useState();
    const [dataUserName, setDataUserName] = useState();
    const [dataUserAdres, setDataUserAdres] = useState();

    const [succesPost, setSuccesPost] = useState(true);
    const [errorPost, setErrorPost] = useState(false);


    function pushOrder() {
        if (
            dataUserNumber||
            dataUserName?.lenght > 3 ||
            dataUserAdres?.lenght > 3
        ) {
            let authToken = localStorage.getItem('authToken');

            const options = {
                url: `${config.mainUrl}order`,
                method: 'POST',
                headers: {
                    'api-token': config.apiToken,
                    'user-token': authToken,
                },
                data: {
                    phone: `+996${Number(dataUserNumber)}`,
                    name: `${dataUserName}`,
                    address: `${dataUserAdres}`,
                    isDelivery: true,
                },
            };

            axios(options)
                .then((response) => {
                    console.log(response.status);
                    setSuccesPost(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setErrorPost(true)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Оформить заказ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {succesPost ? (
                        <div>
                            <p className="modal__title_order">
                                Введите номер телефона
                            </p>
                            <div className="numbers">
                                <div className="number__code">+996</div>
                                <input
                                    onChange={(e) =>
                                        setDataUserNumber(e.target.value)
                                    }
                                    placeholder="509-155-155"
                                    type="number"
                                />
                            </div>{' '}
                            <p className="modal__title_order">Имя получателя</p>
                            <div className="numbers">
                                <input
                                    onChange={(e) =>
                                        setDataUserName(e.target.value)
                                    }
                                    placeholder="Аскат Абрамов"
                                    type="text"
                                />
                            </div>{' '}
                            <p className="modal__title_order">Адрес</p>
                            <div className="numbers">
                                <input
                                    onChange={(e) =>
                                        setDataUserAdres(e.target.value)
                                    }
                                    placeholder="Киевская 000"
                                    type="text"
                                />
                            </div>{' '}
                            {errorPost&&<div className='error__modal_valid'>Заполните данные коректно</div>}
                            <button
                                className="btn__modal"
                                variant="primary"
                                onClick={() => pushOrder()}>
                                Заказать
                            </button>
                        </div>
                    ) : (
                        <div>Ваш заказ принят! Ожидайте звонка</div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModalOrder;
