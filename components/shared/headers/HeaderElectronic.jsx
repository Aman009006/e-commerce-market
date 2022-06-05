import React, { useEffect , useState} from 'react';

import Link from 'next/link';
import menuData from '~/public/static/data/menu';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';
import axios from 'axios';

const HeaderElectronic = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    const [category,setCategor]=useState()

    useEffect(() => {
     const headers = {
         'api-token' : 'f1cdecbeba8f4a1547d3dc0db9376fec'
       }
       
       axios.get( "https://docs.stores.kg/api/categories", {
           headers: headers
         })
         .then((response) => {
           setCategor(response.data["hydra:member"])
         })
         .catch((error) => {
          console.log(error);
         })
    }, []);
   

   
    return (
        <header
            className="header header--standard header--electronic"
            id="headerSticky">
           
            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logoo">
                                <img
                                    src="/static/img/logo2.svg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                       
                    </div>
                    <div className="header__content-center">
                    
                        <SearchHeader />
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
          
        </header>
    );
};

export default HeaderElectronic;
