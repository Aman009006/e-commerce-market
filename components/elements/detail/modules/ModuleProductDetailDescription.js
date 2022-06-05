import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
           {product.shortDescription}
            
        </p>
        <ul className="ps-list--dot">
            <li>Код товара : {product.productCode}</li>
            <li>Цвет : {product.colorName}</li>
            {/* <li> 20 hours of portable capabilities</li> */}
            <li>Продано : {product.soldQuantity} штук</li>
           {product.size && <li>Размер : {product.size}</li>}
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
