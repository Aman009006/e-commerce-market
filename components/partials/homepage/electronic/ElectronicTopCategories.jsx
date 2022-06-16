import React, { Component, useState } from 'react';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';

// class ElectronicTopCategories extends Component {
//     constructor(props) {
//         super(props);
//     }
function ElectronicTopCategories({ category }) {

    const [showC, setShowC] = useState(false);
    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>Категории</h3>
                <div className="row row__custom">
                    <div className="acc__content">
                        {category?.map((c) => {
                            return (
                                <a href={`/category/${c.slug}-${c.id}`} className="category__content">
                                    <img className='category__img_' src={`${c.imageUrl}`} alt="" />
                                    <p className='category__text'>{c.name}</p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectronicTopCategories;
