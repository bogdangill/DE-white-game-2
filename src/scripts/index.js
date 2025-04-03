import { WhiteGameSlider } from "./slider.js";

const slider = new WhiteGameSlider({
    slideWidth: '285px'
});

if (window.matchMedia('(min-width: 767px)').matches) {
    slider.init();
}