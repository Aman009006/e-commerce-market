import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import axios from "axios"
import { config } from '~/config';


const MiniCart = ({ ecomerce }) => {
    const {  removeItem, removeItems, getProducts } = useEcomerce();
    const [products,setProducts]=useState()

    useEffect(() => {
        let authToken = localStorage.getItem('authToken')
        const headers = {
            'api-token' : config.apiToken,
            'user-token': authToken
          }
          
          axios.get( `${config.mainUrl}cart`, {
              headers: headers
            })
            .then((response) => {
                setProducts(response?.data["hydra:member"])
   
            })
            .catch((error) => {
             console.log(error);
            })
    },[products])
    function sendToBasket(item) {
        console.log(item);
        let authToken = localStorage.getItem('authToken')
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                "productId": item.product.id,
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
    }

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.cartItems, 'cart');
    }

    useEffect(() => {
        getProducts(ecomerce.cartItems, 'cart');
    }, [ecomerce]);

    let cartItemsView;
    if (products && products.length > 0) {
        const productItems = products.map((item) => {
            return (
                <ProductOnCart product={item.product} key={item.product.id}>
                    {/* <a
                        className="ps-product__remove"
                        onClick={() => sendToBasket(item)}>
                        <i className="icon-cross"></i>
                    </a> */}
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    
                    {/* <figure> */}
                        <Link href="/account/shopping-cart">
                            <a className="ps-btn custom__basket">Перейти в корзину</a>
                        </Link>
                        {/* <Link href="/account/checkout">
                            <a className="ps-btn">Checkout</a>
                        </Link> */}
                    {/* </figure> */}
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>No products in cart</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="/account/shopping-cart">
                <i className="icon-bag2"></i>
                <span>
                    <i>{products ? products.length : 0}</i>
                </span>
            </a>
          
        </div>
    );
};

export default connect((state) => state)(MiniCart);
