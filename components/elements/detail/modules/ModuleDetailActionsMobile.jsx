import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { useRouter } from 'next/router';
import axios from "axios"
import ModalAuth from '~/components/shared/headers/modules/ModalAuth';
import { config } from '~/config';


const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    const { addItem } = useEcomerce();
    const Router = useRouter();

    const [show,setShow]=useState(false)



    const handleAddItemToCart = (e) => {
        let authToken = localStorage.getItem('authToken')
        if(authToken === null){
            setShow(true)
        }
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                "productId": product.id,
                "count": 1
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleBuyNow = (e) => {
        let authToken = localStorage.getItem('authToken')
        if(authToken === null){
            setShow(true)
        }
        const options = {
            url: `${config.mainUrl}wish_list`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                "productId": product.id,
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Добавить в корзину
            </a>
            <a className="ps-btn" href="#" onClick={(e) => handleBuyNow(e)}>
                Добавить в избранные
            </a>
        </div>
        <ModalAuth show={show} setShow={setShow}/>
        </>
    );
};

export default connect((state) => state)(ModuleDetailActionsMobile);
