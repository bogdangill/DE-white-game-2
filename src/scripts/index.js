import Banner from "./banner.js";
import { Faq } from "./faq.js";
import Form from "./form.js";
import { Nav, Popup } from "./nav.js";
import { WhiteGameSlider } from "./slider.js";

const gameSlider = new WhiteGameSlider('.games__slider-container', {
    slideWidth: '285px'
});
if (window.matchMedia('(min-width: 767px)').matches) {
    gameSlider.init();
}

const faqSlider = new WhiteGameSlider('.faq-feature__container');
faqSlider.init();

const faq = new Faq();
faq.init();

const form = new Form();
form.init();

const popup = new Popup();
const nav = new Nav();
const cookieBanner = new Banner('[data-js-banner-cookie]');

cookieBanner.showBanner();