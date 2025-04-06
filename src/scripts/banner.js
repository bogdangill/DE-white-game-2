export default class Banner {
    closeButtonSelector = '[data-js-banner-close]';
    isActiveSelector = 'is-active';
    isBannerShown = false;

    constructor(
        targetSelector = '[data-js-banner]'
    ) {
        this.target = targetSelector,
        this.closeButtons = this.closeButtonSelector,
        this.isActive = this.isActiveSelector

        this.banner = document.querySelector(this.target);
        this.bannerCloseButtons = this.banner.querySelectorAll(this.closeButtons);
        
    }

    showBanner() {
        this.banner.classList.add(this.isActive);
        this._bindEvents(this.bannerCloseButtons);
        this.isBannerShown = true;
    }
    closeBanner() {
        this.banner.classList.remove(this.isActive);
        this.isBannerShown = false;
    }
    _bindEvents(targets) {
        targets.forEach((target) => {
            target.addEventListener('click', () => {
                this.closeBanner();
            });
        });
    }
}