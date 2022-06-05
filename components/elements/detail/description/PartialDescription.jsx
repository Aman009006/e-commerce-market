import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const PartialDescription = ({product}) => (
    
    <div className="ps-document">



        <h5>{ReactHtmlParser(product.description)}</h5>
       
    </div>
);

export default PartialDescription;
