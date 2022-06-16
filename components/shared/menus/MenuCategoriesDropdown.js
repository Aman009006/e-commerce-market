import React ,{useState,useEffect} from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import Logo from '~/components/elements/common/Logo';
import axios from "axios"
import {config} from "~/config"

const MenuCategoriesDropdown = () => {
    const [category, setCategor] = useState();


    useEffect(() => {
        const headers = {
            "api-token": config.apiToken
        };

        axios
            .get(`${config.mainUrl}main/page`, {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data["hydra:member"][1].data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const [isShown, setIsShown] = useState(false);
    const [isShownDoth, setIsShownDoth] = useState(false);


    return (
      <div className="category__dropdown">
        <button className='btn__ct_dn'
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>
          <img src='/images/three.svg'/>
        </button>
          <div     
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          className={isShown ? "categories__content_":"notshow"}  >
           {category?.map((c)=>{
            return(
                <div className='main__category'>
                    <a
                 onMouseEnter={() => setIsShownDoth(true)}
                onMouseLeave={() => setIsShownDoth(false)}
                 href={`/category/${c.slug}-${c.id}`} 
                 className='nav__category'>
                    {c.name}
                  </a>
                  {/* <div  className={isShownDoth ? "doth__category":"notshow"}>
                    {c?.categories.map((cc)=>{
                        return(
                            <div>{cc.name}</div>
                        )
                    })}
                  </div> */}
                </div>
            )
           })}
          </div>
      </div>
    );
  }


export default MenuCategoriesDropdown;
