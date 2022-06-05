import React, { Component, useEffect ,useState} from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import axios from "axios"
import {config} from "~/config";


const Wishlist = ({ ecomerce }) => {
    const { loading, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();

        function handleAddItemToCart(product) {
            console.log(product);
            let authToken = localStorage.getItem('authToken')
            const options = {
                url: `${config.mainUrl}cart`,
                method: 'POST',
                headers: {
                    'api-token': config.apiToken,
                    'user-token': authToken
                },
                data: {
                    "productId": product?.id,
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
                sendToFavorites(product)
        }

    function handleRemoveWishlistItem(e, product) {
        sendToFavorites(product)
    }
    function sendToFavorites(product) {
        console.log(product);
        let authToken = localStorage.getItem('authToken')
        const options = {
            url: `${config.mainUrl}wish_list`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                "productId": product?.id,
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
    const [products,setProducts]=useState()

    useEffect(() => {
        let authToken = localStorage.getItem('authToken')
        const headers = {
            'api-token' : config.apiToken,
            'user-token': authToken
          }
          
          axios.get( `${config.mainUrl}wish_lists?page=1&itemsPerPage=30`, {
              headers: headers
            })
            .then((response) => {
                setProducts(response?.data["hydra:member"])
   
            })
            .catch((error) => {
             console.log(error);
            })
    },[products])
    

    // views
    let wishlistItemsView;
    if (products && products.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Название товара</th>
                            <th>Цена</th>
                            <th>Продавец</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            
                            <tr key={product.product.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleRemoveWishlistItem(e, product.product)
                                        }>
                                        <i className="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <ProductCart product={product.product} />
                                </td>
                                <td className="price">{product.product.price} сом</td>
                                <td>{product.product.pointName}</td>
                                <td>
                                    <a
                                        className="ps-btn"
                                        href="#"
                                        onClick={() =>
                                            handleAddItemToCart(product.product)
                                        }>
                                        B корзину
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }  else {
        if (!loading) {
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                   Избранных нет
                </div>
            );
        }
    }




    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Избранные</h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
