import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import axios from 'axios'
import { config } from '~/config';


const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);


    
    const { asPath, pathname } = useRouter();
    const urlFor = config.mainUrl.substring(0, config.mainUrl.length - 1)
    
    useEffect(() => {
        const headers = {
            'api-token' : config.apiToken
          }
          
          axios.get( `${urlFor}${asPath}`, {
              headers: headers
            })
            .then((response) => {
                setCards(response.data)
                console.log(response.data,"login");
                setProduct(response.data)
            })
            .catch((error) => {
             console.log(error);
            })
       }, [asPath]);
    //    console.log(cards); 

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsById(pid);
        if (responseData) {
            setProduct(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);
    const [cards,setCards]=useState()

  

    const breadCrumb = [
        {
            text: 'Главная',
            url: '/',
        },
        {
            text: cards?.name,
            url: '',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={cards} />;
            headerView = (
                <>
                    <HeaderProduct product={cards} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            headerView = (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }



    return (
        <PageContainer
            header={headerView}
            title={product ? product.title : 'Loading...'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                    </div>

                    {/* <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    /> */}
                    {/* <RelatedProduct collectionSlug="shop-recommend-items" /> */}
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>
    );
};

export default ProductDefaultPage;
