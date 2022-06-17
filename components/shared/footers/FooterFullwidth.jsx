import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';
import Link from 'next/link'

const FooterFullwidth = () => (
    <div className="footer">
    <div className="container">
      <div className="footer__content ">
        <img className='logo_f' src="/static/img/logo2.svg" />
        <div className="footer__adres">
          <div className="footer__desck">
            <p className="footer__title-p">Компания</p>
            <div className="only">
            <a href="/aboutus">О нас</a>
            <a href="/publicoff"> Публичная оферта</a>
            <a href="https://2gis.kg/bishkek/firm/70000001062065075?m=74.644652%2C42.878616%2F16"  target="_blank">Адрес: Фрунзе 54</a>
            </div>
          </div>
          <div className="footer__desck">
            <p className="footer__title-p">Контакты</p>
            <a href="#" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/phone.svg" />{" "}
                <a href="tel:+996553413333">0553 413 333</a>
              </div>
            </a>
            <a href="#" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/phone.svg" />
                <a href="tel:+996704443333">0704 443 333</a>
              </div>
            </a>
            <a href="mailto:technikskg@gmail.com" target="_blank" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/mail.svg" />
                <span>technicskg@gmail.com</span>
              </div>
            </a>
          </div>
          <div className="footer__desck">
            <p className="footer__title-p">Мы в социальных сетях:</p>
            <a href="https://www.instagram.com/technicskg" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/insta.svg" />
                <span>Instagram</span>
              </div>
            </a>
            <a href="#" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/telegram.png" />
                <span>Telegram</span>
              </div>
            </a>
            <a href="https://wa.me/996553413333/" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/whats.png" />
                <span>Whatsapp</span>
              </div>{" "}
            </a>
          </div>
        </div>
      </div>
      <p className="footer__why">Developed by Zeon 2022</p>
    </div>
  </div>
);

export default FooterFullwidth;

