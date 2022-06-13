import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import axios from 'axios';
import { config } from '~/config';

const Wishlist = ({ ecomerce }) => {
    const { loading, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();

    function handleAddItemToCart(product) {
        console.log(product);
        let authToken = localStorage.getItem('authToken');
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: product?.id,
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
        sendToFavorites(product);
    }

    function handleRemoveWishlistItem(e, product) {
        sendToFavorites(product);
    }
    function sendToFavorites(product) {
        console.log(product);
        let authToken = localStorage.getItem('authToken');
        const options = {
            url: `${config.mainUrl}wish_list`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: product?.id,
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

    useEffect(() => {
        if (ecomerce.wishlistItems) {
            getProducts(ecomerce.wishlistItems);
        }
    }, [ecomerce]);
    const [products, setProducts] = useState();

    useEffect(() => {
        let authToken = localStorage.getItem('authToken');
        const headers = {
            'api-token': config.apiToken,
            'user-token': authToken,
        };

        axios
            .get(`${config.mainUrl}wish_lists?page=1&itemsPerPage=30`, {
                headers: headers,
            })
            .then((response) => {
                setProducts(response?.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [products]);



    let cartItemsViews;
    if (products && products.length > 0) {
        const items = products?.map((item, index) => {
            return (
                <tr className='wish__tr' key={item?.id}>
                    <td>
                        <ProductCart product={item?.product} />
                    </td>
                    <td data-label="Цена" className="price">
                        {item?.product.price} сом
                    </td>
                    <td>
                        <div className='df al'>
                            <a
                                className="ps-btn w100"
                                href="#"
                                onClick={() =>
                                    handleAddItemToCart(item.product)
                                }>
                                <span className='imsort'>B корзину</span>
                            </a>

                            <a
                                href="#"
                                onClick={(e) =>
                                    handleRemoveWishlistItem(e, item.product)
                                }>
                                <i className="icon-cross"></i>
                            </a>
                        </div>
                    </td>
                </tr>
            );
        });

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr className='w120'>
                            <th>Ваши товары</th>
                        </tr>
                    </thead>
                    <tbody className=''>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <div className="alert alert-danger" role="alert">
                Избранных нет
            </div>
        );
    }

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Избранные</h1>
                </div>
                <div className="ps-section__content">{cartItemsViews}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
