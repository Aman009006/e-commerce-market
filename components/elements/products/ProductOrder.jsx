import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const ProductOrder = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.slug}`} as={`/product/${product.slug}`}>
                    <a>{product.productMainImageUrl ? <img className='category__img_main' src={product.productMainImageUrl} alt="" /> : <img className='category__img_main' src='/images/none.jpg'/>}</a>
                </Link>
                {/* {badge(product)} */}
                {/* <ModuleProductActions product={product} /> */}
                
            </div>
            <div className="ps-product__container">
                {/* <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link> */}
                <div className="ps-product__content">
                              <p className="title__product">   {product.productName}</p>

                    {/* {price(product)} */}
                </div>
                <div className="ps-product__content hover mb-20">
                <p className="title__product hover__plus"> {product.productName}</p>
                    {/* {price(product)} */}
                </div>
            </div>
        </div>
    );
};

export default ProductOrder;
