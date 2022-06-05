import React,{useState,useRef} from 'react';
import Link from 'next/link';
import MegaMenu from './MegaMenu';
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

const MenuDropdown = ({ source }) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <li className="menu-item-has-children dropdown">
            <button className='c_btn' ref={target} onClick={() => setShow(!show)}>
                {source.name}
            </button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        My Tooltipklhlkhlk ljklnjknjk
                        <div>hello</div>
                    </Tooltip>
                )}
            </Overlay>
            {/* <ul className='sub__menu'>
                    {source.categories?.map((subMenuItem) => (
                        <MegaMenu source={subMenuItem} key={index} />
                    ))}
                </ul> */}
        </li>
    );
};

export default MenuDropdown;
