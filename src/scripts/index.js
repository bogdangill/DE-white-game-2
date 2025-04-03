import { WhiteGameSlider } from "./slider.js";

const slider = new WhiteGameSlider('.games__slider-container', {
    slideWidth: '285px'
});
const faqSlider = new WhiteGameSlider('.faq-feature__container');
faqSlider.init();

if (window.matchMedia('(min-width: 767px)').matches) {
    slider.init();
}