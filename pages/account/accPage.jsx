import React, { useState, useEffect } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import { Tabs } from 'antd';
import axios from 'axios';
import { config } from '~/config';
import ProductCart from '~/components/elements/products/ProductCart';
import Product from '~/components/elements/products/Product';
import ProductOrder from '~/components/elements/products/ProductOrder';

const { TabPane } = Tabs;

function accPage(){
    const [userNum,setUserNum]=useState()

    let adminOr
    useEffect(() => {
         adminOr = window.localStorage.getItem('userPhone');
         setUserNum(adminOr)
    },[])
    const [products, setProducts] = useState();
    const [order, setOrder] = useState();

    
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

            axios
            .get(`${config.mainUrl}orders?page=1&itemsPerPage=30`, {
                headers: headers,
            })
            .then((response) => {
                setOrder(response?.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [order]);

    // console.log(order);
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



    return(<PageContainer>
        <div className='container'>
      <div className='viev_1'>
      <Tabs defaultActiveKey="1">
                <TabPane tab="Профиль" key="1">
                    <h2 className="profile__title">Личные данные</h2>
                  <div className='block__my_profile'>
                        <p className="phone_num">Телефон</p>
                        <p className="phone_num_title">{userNum}</p>
                        <button>Изменить</button>
                  </div>
                </TabPane>
                <TabPane tab="Избранные" key="2">
                  <div className="ps-section__header">
                    <h1 className='mb-20 mt-20'>Избранные</h1>
                </div>
                <div className="ps-section__content">{cartItemsViews}</div>
                </TabPane>
                <TabPane tab="Мои покупки" key="3">

                  {order?.map((ord)=>{
                 return(<div className="block__order_">
                        <p className="order__time">{ord?.createdAt}</p>
                        <div className="orders">
                            {ord?.products.map((item)=>{
                                return(
                                    <ProductOrder product={item} />
                                )
                            })}
                        </div>
                    </div>)
                  })}

                </TabPane>
                {userNum === "+996509155155" && (<TabPane tab="Admin" key="4">
                  Ты Админ
                </TabPane>)}
            </Tabs>
      </div>
        </div>
    </PageContainer>
    )
}
export default accPage;