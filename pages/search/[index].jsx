import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import useGetProducts from '~/hooks/useGetProducts';
import { useRouter } from 'next/router';
import axios from 'axios';
import { config } from '~/config';

const SearchPage = () => {
    const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const { productItems, loading, getProducts } = useGetProducts();
    const Router = useRouter();
    const { query } = Router;
    const [cards, setCards] = useState('');
    const [countCard, setCountCard] = useState(30);
    const [fromPrice, setFromPrice] = useState(1);
    const [toPrice, setToPrice] = useState(100000);
    const [primTo, setPrimTo] = useState(true);

    const { asPath } = useRouter();

    let searchWord = asPath.replace(/^.{8}/, '');

    useEffect(() => {
        const headers = {
            'api-token': config.apiToken,
        };

        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=${countCard}&name=${searchWord}&price%5Bgte%5D=${fromPrice}&price%5Blte%5D=${toPrice}`,
                {
                    headers: headers,
                }
            )
            .then((response) => {
                setCards(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchWord, countCard, primTo]);




    const breadcrumb = [
        {
            text: 'Главная',
            url: '/',
        },
        {
            text: 'Поиск',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (cards) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={pageSize} />
            );
            if (cards.length > 0) {
                const items = cards?.map((item) => {
                    return (
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {cards.length}
                        </strong>{' '}
                        товаров найдено.
                    </p>
                );
            } else {
                shopItemsView = <p>Продуктов не найденно</p>;
            }
        } else {
            shopItemsView = <p>Продуктов не найденно</p>;
        }
    } else {
        statusView = <p>Поиск...</p>;
    }

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>
                                Поиск по запросу: "
                                <strong>{decodeURI(searchWord)}</strong>"
                            </h1>
                        </div>
                        <div className="alotprice">
                            <div>от: <input id="input__before" onChange={(e)=> setFromPrice(e.target.value)} type="number" /></div> <div>до:{' '}
                            <input onChange={(e)=> setToPrice(e.target.value)} id="input__after" type="number" />{' '}</div>
                            <button onClick={() => setPrimTo(!primTo)}>
                                Применить
                            </button>
                        </div>
                        <div className="ps-shop__content">
                            {/* {statusView} */}
                            {shopItemsView}
                        </div>
                        <div className="count__btn_plus">
                            <button
                                className="onenore__btn"
                                onClick={() => setCountCard(countCard + 17)}>
                                Показать еще
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
