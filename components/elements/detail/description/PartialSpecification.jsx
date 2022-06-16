import React, { useState, useEffect } from 'react';
import { config } from '~/config';
import axios from 'axios';

const PartialSpecification = ({ product }) => {

    const [comments, setComments] = useState();
    const [inputValueComm, setInputValueComm] = useState("");



    useEffect(() => {
        const headers = {
            'api-token': config.apiToken,
        };

        axios
            .get(
                `${config.mainUrl}reviews?page=1&itemsPerPage=30&product.id=${product.id}`,
                {
                    headers: headers,
                }
            )
            .then((response) => {
                setComments(response?.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [comments]);

    function sendComment(){
        
        let authToken = localStorage.getItem('authToken')
        // if(authToken === null){
        //     setShow(true)
        // }
        const options = {
            url: `${config.mainUrl}review`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken
            },
            data: {
                    "productId": Number(product.id),
                    "parentReviewId": 0,
                    "comment": inputValueComm,
                    "positiveComment": "Очень удобно в использовании",
                    "negativeComment": "Дорогой товар",
                    "rating": 5
            },
        };

        setInputValueComm("")

        axios(options)
            .then((response) => {
                console.log(response.status);
    })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="comment__content">
            <div className={`${comments?.length > 0 ? "all__comments" : "none"}`}>
                {comments ? (
                    comments.map((comment) => {
                        return (
                            <div className="table-responsive">
                                <div className="comment__block">
                                    <div className="comment__user">
                                        {comment.userPublicName}
                                    </div>
                                    <div className="comment">
                                        {comment.comment}
                                    </div>
                                    <div className="date__comment">
                                        {comment.createAt}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Комментарии отсутствуют</div>
                )}
            </div>
            <div className="comment__sender">
                <input placeholder='Оставь отзыв здесь' value={inputValueComm} onChange={(e)=>setInputValueComm(e.target.value)} type="text" />
                <button onClick={()=>sendComment()}>Отправить</button>
            </div>
        </div>
    );
};
export default PartialSpecification;
