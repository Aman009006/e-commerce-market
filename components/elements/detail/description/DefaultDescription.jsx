import React, { useState, useEffect } from 'react';

import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import PartialSpecification from '~/components/elements/detail/description/PartialSpecification';
import PartialVendor from '~/components/elements/detail/description/PartialVendor';
import PartialReview from '~/components/elements/detail/description/PartialReview';
import PartialOffer from '~/components/elements/detail/description/PartialOffer';
import axios from 'axios';
import { config } from '~/config';

const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
  

    return (
        <div className="ps-product__content ps-tab-root">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Описание" key="1">
                    {product.description ? (
                        <PartialDescription product={product} />
                    ) : (
                        <div>Описание отсутствует</div>
                    )}
                </TabPane>
                <TabPane tab="Комментарии" key="2">
                    <PartialSpecification product={product}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default DefaultDescription;
