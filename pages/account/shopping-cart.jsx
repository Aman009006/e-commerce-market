import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import axios from 'axios';
import ModalOrder from './ModalOrder';
import {config} from "~/config";


const ShoppingCartScreen = ({ ecomerce }) => {
    const { getProducts } = useEcomerce();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState();
    const [totalProductsPrice, setTotalProductsPrice] = useState(0);

    useEffect(() => {
        let authToken = localStorage.getItem('authToken');
        const headers = {
            'api-token': config.apiToken,
            'user-token': authToken,
        };

        axios
            .get(`${config.mainUrl}cart`, {
                headers: headers,
            })
            .then((response) => {
                setProducts(response?.data['hydra:member']);
               
            })
            .catch((error) => {
                console.log(error);
            });
    }, [products]);

    useEffect(()=>{
        setTotalProductsPrice(
            products?.reduce(
                (count, product) => count + product.product.count * product.product.price,
                0
            )
        );
    },[products])
    // console.log(products);


    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    const breadCrumb = [
        {
            text: 'Главная',
            url: '/',
        },
        {
            text: 'Корзиная',
        },
    ];

    // View
    let contentView;
    if (products) {
        if (products.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleEcomerceCartItems cartItems={products} />
                        <div className="total__price">
                            <p>Итого:</p>
                            {totalProductsPrice} сом
                        </div>
                        <div className="ps-section__cart-actions">
                            <Link href="/">
                                <a className="ps-btn">На главную</a>
                            </Link>
                            <Link href="#">
                                <a onClick={handleShow} className="ps-btn">
                                    Оформить заказ
                                </a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        } else {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <div className="alert alert-info">
                            <p className="mb-0">Корзина пустая</p>
                        </div>

                        <div className="ps-section__cart-actions">
                            <Link href="/">
                                <a className="ps-btn">Вернуться на главную</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    } else {
    }

    return (
        <>
            <PageContainer title="Shopping Cart">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Корзина</h1>
                            </div>
                            {contentView}
                        </div>
                        <ModalOrder show={show} setShow={setShow} />
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
