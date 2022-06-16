import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import axios from 'axios';
import ModalAuth from '~/components/shared/headers/modules/ModalAuth';
import { config } from '~/config';


const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    const { addItem } = useEcomerce();
    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
    }
    const [show,setShow]=useState(false)

    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, 'compare');
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to compare listing!`,
        });
        modal.update;
    };

    const handleAddItemToWishlist = (e) => {

        let authToken = localStorage.getItem('authToken')
        if(authToken === null){
            setShow(true)
        }else{

            sendToFavorites()
            const modal = Modal.success({
                centered: true,
                title: 'Успешно добавлено в избранные!',
            });
            modal.update;
        }
    };

    function sendToFavorites() {
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
    }

    function buyWithWhats(){
        
    }

    function sendToBasket() {
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
                "count": quantity
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

    function handleIncreaseItemQty(e) {
        e.preventDefault();
        setQuantity(quantity + 1);
    }

    function handleDecreaseItemQty(e) {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    console.log(Router);
    if (!extended) {
        return (
            <div className="ps-product__shopping">
                <figure>
                    <figcaption>Количество</figcaption>
                    <div className='buttonsProd'>
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e)}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e)}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                    <div className='custom__btn_w'>
               <a
                    className="mobile__cus_btn  "
                    href={`https://wa.me/996509155155?text=Добрый%20день%20!%20я%20хотел%20заказать%20Techniks.kg${Router.asPath}`}
                    target="_blank"
                  >
                    Купить по WhatsApp
                </a>
               </div>
                    </div>
                </figure>
               
                <div>
                <a
                    className="ps-btn ps-btn--black custom__btn_"
                    href="#"
                    onClick={() => sendToBasket()}>
                    Добавить в корзину
                </a>

                </div>
                <div>

                
                        </div>
               <ModalAuth show={show} setShow={setShow}/>
                <div className="ps-product__actions">
                    <a
                    className="ps-btn ps-btn--black custom__btn_"
                    href="#"
                    onClick={(e) => handleAddItemToWishlist(e)}>
                    Добавить в избранные
                </a>
                    
                </div>
                <a
                    className="ps-btn ps-btn--black custom__btn_ whatsApp"
                    href={`https://wa.me/996509155155?text=Добрый%20день%20!%20я%20хотел%20заказать%20Techniks.kg${Router.asPath}`}
                    target="_blank"
                  >
                    Купить по WhatsApp
                </a>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                <div className="ps-product__btn-group">
               <ModalAuth show={show} setShow={setShow}/>
                    <figure>
                        <figcaption>Количество</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={(e) => handleIncreaseItemQty(e)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={(e) => handleDecreaseItemQty(e)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </figure>
                   
                    <a
                        className="ps-btn ps-btn--black"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e)}>
                                          Добавить в корзину
                    </a>
                    <div className="ps-product__actions">
                        <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a>
                       
                    </div>
                </div>
                
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
