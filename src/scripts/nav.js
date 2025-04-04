export class Popup {
    selectors = {
        target: '[data-popup-trigger]',
        content: '[data-nav]',
        contentButton: '[data-popup-close]'
    }

    constructor() {
        this.targetButton = document.querySelector(this.selectors.target);
        this.content = document.querySelector(this.selectors.content);
        this.closeBtn = this.content.querySelector(this.selectors.contentButton);
        if (!this.targetButton || !this.content) return;

        this._bindEvents();
    }

    show = (e) => {
        this.content.classList.toggle('is-active');
    }
    _bindEvents() {
        this.targetButton.addEventListener('click', this.show);
        this.closeBtn.addEventListener('click', this.show);
    }
}

export class Nav {
    selectors = {
        root: '[data-nav]',
        links: '[data-nav-link]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        if (!this.rootElement) return;

        this.navLinks = this.rootElement.querySelectorAll(this.selectors.links);

        this.setActivePage();
    }

    setActivePage() {
        const currentPath = window.location.pathname;
        this.navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
    }
}