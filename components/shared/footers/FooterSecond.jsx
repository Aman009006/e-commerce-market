import React from 'react';
import Link from 'next/link';

const FooterSecond = ({ classes }) => (
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
            </div>
          </div>
          <div className="footer__desck">
            <p className="footer__title-p">Контакты</p>
            <a href="#" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/phone.svg" />{" "}
                <a href="tel:+996 500 123 456">+996 500 123 456</a>
              </div>
            </a>
            <a href="#" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/phone.svg" />
                <a href="tel:+996 500 123 456">+996 500 123 456</a>
              </div>
            </a>
            <a href="https://mail.ru/" target="_blank" className="footer__desck-p">
              <div className="df">
                <img src="/images/icons/mail.svg" />
                <span>mail@gmail.com</span>
              </div>
            </a>
          </div>
          <div className="footer__desck">
            <p className="footer__title-p">Мы в социальных сетях:</p>
            <a href="https://www.instagram.com/" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/insta.svg" />
                <span>Instagram</span>
              </div>
            </a>
            <a href="https://web.telegram.org/k/" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/telegram.png" />
                <span>Telegram</span>
              </div>
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" className="footer__desck-p">
              <div className="dff">
                <img src="/images/icons/whats.png" />
                <span>Whatsapp</span>
              </div>{" "}
            </a>
          </div>
        </div>
      </div>
     
    </div>
  </div>
);

export default FooterSecond;
