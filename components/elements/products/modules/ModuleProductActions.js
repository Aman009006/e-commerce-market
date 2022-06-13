import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useEcomerce from '~/hooks/useEcomerce';
import axios from 'axios';
import ModalAuth from '~/components/shared/headers/modules/ModalAuth';
import { config } from '~/config';

const ModuleProductActions = ({ product, ecomerce }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const { addItem } = useEcomerce();
    const [show, setShow] = useState(false);

    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    }

    function handleAddItemToCompare(e) {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        });
        modal.update;
    }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };

    function sendToFavorites() {
        let authToken = localStorage.getItem('authToken');
        if (authToken === null) {
            setShow(true);
        }
        const options = {
            url: `${config.mainUrl}wish_list`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: product.id,
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function sendToBasket() {
        let authToken = localStorage.getItem('authToken');
        if (authToken === null) {
            setShow(true);
        }
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: product.id,
                count: 1,
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <ul className="ps-product__actions">
            <ModalAuth show={show} setShow={setShow} />
            <li>
                <a
                    className="prod__icon"
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Добавить в корзину"
                    onClick={() => sendToBasket()}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Просмотр"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li> */}
            <li>
                <a
                    className="prod__icon"
                    href="#"
                    title="Добавить в избранные"
                    onClick={() => sendToFavorites()}>
                    <i className="icon-heart"></i>
                </a>
            </li>

            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                visible={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default connect((state) => state)(ModuleProductActions);
