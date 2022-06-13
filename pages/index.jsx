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

const HomeElectronicsPage = () => {
    const [category, setCategor] = useState();

    useEffect(() => {
        const headers = {
            'api-token': 'f1cdecbeba8f4a1547d3dc0db9376fec',
        };

        axios
            .get('https://docs.stores.kg/api/categories', {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data['hydra:member']);
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
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=68`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setCards(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=1`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setElectronics(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
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
                <ElectronicBanner />
                <ElectronicTopCategories category={category} />
                {/* <ProductGroupDealOfDay
                    categorySlug="computers-and-technologies"
                    boxed={true}
                /> */}
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-best-sellers"
                    title="Бытовая техника"
                    links={cards}
                />
                <ElectronicPromotions2 />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronic_computer_technology"
                    title="Электроника"
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
