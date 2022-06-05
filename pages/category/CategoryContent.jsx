import React, { useEffect, useState } from 'react';
import Product from '~/components/elements/products/Product';

const CategoryContent = ({ products }) => {


    

    return (
     <div className='category__content_top'>
     
            <div className="category__page">
            {products?.map((card) => {
                return (
                    <a href={`/product/${card.slug}`}>
                      
                       <Product product={card}/>
                    </a>
                );
            })}
        </div>
     </div>
    );
};
export default CategoryContent;
