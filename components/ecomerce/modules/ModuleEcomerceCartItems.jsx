import React , {useState , useEffect} from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import axios from 'axios';
import {config} from "~/config";



const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    useEffect(() => {
        setMyProducts(cartItems)
    }, [cartItems]);
    const [myProducts, setMyProducts] = useState()

    function handleRemoveItem(e, productId) {
        
        let authToken = localStorage.getItem('authToken')
        if(authToken === null){
            setShow(true)
        }
        const options = {
            url: `${config.mainUrl}cart'`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                "productId": productId,
                "count": 0
            },
        };

        axios(options)
            .then((response) => {
                console.log(response.status);
            })
            .catch((err) => {
                console.log(err);
            });
            // location.reload()

    }

    function handleIncreaseItemQty(e, productId) {
        e.preventDefault();
        increaseQty({ id: productId }, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        decreaseQty({ id: productId }, ecomerce.cartItems);
    }
    
    function plusCount(index){
        setMyProducts(myProducts?.map(
            (item , i) => {
                if(i === index){
                    return {
                        ...item,
                        product: {
                            ...item.product,
                            count: item.product.count + 1
                        }
                    }
                }
                else{
                    return item;
                }
            }
        ))
        
    }
    function minusCount(index){
        setMyProducts(myProducts?.map(
            (item , i) => {
                if(i === index && item.product.count>1){
                    return {
                        ...item,
                        product: {
                            ...item.product,
                            count: item.product.count - 1
                        }
                    }
                }
                else{
                    return item;
                }
            }
        ))
    }

    // View
    let cartItemsViews;
    if (myProducts && myProducts.length > 0) {
        const items = myProducts?.map((item, index) => {
            // let countQua = item.product.price
            // const product = item;
            // console.log(product?.count);
            return(
            <tr key={item?.id}>
                <td>
                    <ProductCart product={item?.product} />
                </td>
                <td data-label="Цена" className="price">
                    {item?.product.price} сом
                </td>
                <td data-label="Количество">
                    <div className="form-group--number">
                    {item?.product.count}
                    </div>
                </td>
                <td data-label="Итого">
                    <strong>{(item?.product.price * item?.product.count)} сом</strong>
                </td>
                <td>
                    <a href="#" onClick={(e) => handleRemoveItem(e, item?.product.id)}>
                        <i className="icon-cross"></i>
                    </a>
                </td>
            </tr>
        )});

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Тотал</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="Корзина пуста" />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
