import React from 'react';

const Rating = ({rating}) => {
// console.log(rating);
let viewsContent
if(Math.floor(rating)!== null){
if(Math.floor(rating) === 1){
    viewsContent = (
        <div className='rating__content'>
            <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        </div>
    )
}else if(Math.floor(rating) === 2){
    viewsContent = (
        <div className='rating__content'>
            <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        </div>
    )
}else if(Math.floor(rating) === 3){
    viewsContent = (
        <div className='rating__content'>
            <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        </div>
    )
}else if(Math.floor(rating) === 4){
    viewsContent = (
        <div className='rating__content'>
            <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        </div>
    )
}else if(Math.floor(rating) === 5){
    viewsContent = (
        <div className='rating__content'>
            <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        </div>
    )
}else if(rating === null){
    viewsContent = (
        <div className='rating__content'>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
        </div>
    )
}

}else {
    viewsContent = (
        <div className='rating__content'>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        </div>
    )
}

    return(
    <span className="ps-rating">
        {viewsContent}
    </span>
)};

export default Rating;