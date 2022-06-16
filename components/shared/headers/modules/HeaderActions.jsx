import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ModalAuth from './ModalAuth';
import { config } from '~/config';


const HeaderActions = ({ ecomerce, auth }) => {
    const [compareItems, wishlistItems ] = useState();

    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [userLogin, setUserLogin] = useState();
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        let authToken = localStorage.getItem('authToken');
        const headers = {
            'api-token': config.apiToken,
            'user-token': authToken,
        };

        axios
            .get(
                `${config.mainUrl}wish_lists?page=1&itemsPerPage=30`,
                {
                    headers: headers,
                }
            )
            .then((response) => {
                wishlistItems(response?.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [compareItems]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const item = localStorage.getItem('userPhone');
        setUserLogin(item);
    }, []);
    function logOut(){
        localStorage.removeItem("userPhone");
        localStorage.removeItem("authToken");
        location.reload()
    }

    return (
        <>
        <div className="header__actions">
            <a href="/account/wishlist" className="header__extra">
                <i className="icon-heart"></i>
                <span>
                    <i>{compareItems ? compareItems.length : 0}</i>
                </span>
            </a>
            <MiniCart />
            <a className="logo__user" >
                <img  className="icon__login" src="/images/user.png" alt="" />
                <p className="p__user">{userLogin ? <div><a className='acc__number' href='/account/accPage'>{userLogin}</a> <div onClick={()=>logOut()}>выйти</div></div> : <div onClick={handleShow}>Войти</div>}</p>
            </a>
        </div>
            <ModalAuth show={show} setShow={setShow} />
        </>
    );
};

export default connect((state) => state)(HeaderActions);
