import { AsymmetricSlider } from "./slider.js";

const slider = new AsymmetricSlider();

if (window.matchMedia('(min-width: 767px)').matches) {
    slider.init();
}
