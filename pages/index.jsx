import React, { useState, useEffect } from 'react';
import ProductGroupDealOfDay from '~/components/partials/product/ProductGroupDealOfDay';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import ElectronicPromotions2 from '~/components/partials/homepage/electronic/ElectronicPromotions2';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import PageContainer from '~/components/layouts/PageContainer';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '~/components/shared/headers/HeaderMobileElectronic';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import axios from 'axios';
import { config } from '~/config';
import ShopBanner from '~/components/partials/shop/ShopBanner';

const HomeElectronicsPage = () => {
    const [category, setCategor] = useState();
    const [firstBanner, setFirstBanner] = useState();
    const [secondBanner, setSecondtBanner] = useState();



    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };

        axios
            .get(`${config.mainUrl}main/page`, {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data["hydra:member"][1].data);
                setCards(response.data["hydra:member"][2].data)
                setElectronics(response.data["hydra:member"][5].data)
                setFirstBanner(response.data["hydra:member"][3].url);
                setSecondtBanner(response.data["hydra:member"][10].url)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const headers = (
        <>
            <HeaderElectronic />
            <HeaderMobileElectronic />
        </>
    );

    const footer = <FooterSecond classes="ps-footer" />;

    const [cards, setCards] = useState();
    const [electronic, setElectronics] = useState();
    const [PCtech, setPCtch] = useState();
    const [clothes, setClothes] = useState();

    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=112`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setPCtch(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=221`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setClothes(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <PageContainer title="Technics.kg">
            <main id="homepage-7">
                <div className="container mt-25 mb-25">
                <ShopBanner urlImg={firstBanner} />
                </div>
                <ElectronicTopCategories category={category} />
                {/* <ProductGroupDealOfDay
                    categorySlug="computers-and-technologies"
                    boxed={true}
                /> */}
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-best-sellers"
                    title="Хиты продаж"
                    links={cards}
                />
                <ElectronicPromotions2 urlImg={secondBanner} />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronic_computer_technology"
                    title="Новинки"
                    links={electronic}
                />
                <ElectronicProductGroupWithCarousel
                    categorySlug="consumer-electrics"
                    title="Компьютерная техника"
                    links={PCtech}
                />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-cameras-and-videos"
                    title="Одежда, обувь и аксессуары"
                    links={clothes}
                />
                {/* <SiteFeatures /> */}
            </main>
        </PageContainer>
    );
};

export default HomeElectronicsPage;
