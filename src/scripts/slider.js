export class AsymmetricSlider {
    selectors = {
        container: '[data-as-container]',
        slider: '[data-as-slider]',
        slide: '[data-as-slide]',
        pagination: '[data-as-pagination]',
        dot: '[data-as-dot]'
    }

    constructor() {
        this.sliderContainer = document.querySelector(this.selectors.container);
        if (!this.sliderContainer) {
            console.warn('контейнер для Asymmetric Slider не обнаружен')
            return
        };
        this.slider = this.sliderContainer.querySelector(this.selectors.slider);
        this.slides = this.sliderContainer.querySelectorAll(this.selectors.slide);
        this.pagination = this.sliderContainer.querySelector(this.selectors.pagination);
        this.slideWidth = 285;
        this.slideGap = 24;
        this.totalSlideWidth = this.slideWidth + this.slideGap;
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentTranslate = 0;
        this.visibleSlides = Math.floor(this.sliderContainer.clientWidth / this.totalSlideWidth);
        this.totalDots = this.slides.length - this.visibleSlides + 1;
    }

    init() {
        this.createPagination();
        this.bindEvents();
    }
    bindEvents() {
        this.slider.addEventListener("mousedown", (event) => {
            this.isDragging = true;
            this.startX = event.clientX;
            this.slider.style.cursor = "grabbing";
        });
        window.addEventListener("mousemove", (event) => {
            if (!this.isDragging) return;

            const delta = event.clientX - this.startX;
            this.slider.style.transform = `translateX(${this.currentTranslate + delta}px)`;
        });
        window.addEventListener("mouseup", (event) => {
            if (!this.isDragging) return;

            this.isDragging = false;
            this.slider.style.cursor = "grab";

            const delta = event.clientX - this.startX;

            if (delta < -50 && this.currentIndex < this.totalDots - 1) {
                this.currentIndex++;
            } else if (delta > 50 && this.currentIndex > 0) {
                this.currentIndex--;
            }
            
            this.moveToSlide(this.currentIndex);
        });
    }
    moveToSlide(index) {
        this.currentIndex = index;
        const maxOffset = (this.slides.length - this.visibleSlides) * this.totalSlideWidth;
        let offset = index * this.totalSlideWidth;
        if (offset > maxOffset) offset = maxOffset;
        this.slider.style.transform = `translateX(-${offset}px)`;

        this.updatePagination();
    }
    updatePagination() {
        this.pagination.querySelectorAll(this.selectors.dot).forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }
    createPagination() {
        this.pagination.innerHTML = "";

        for (let i = 0; i < this.totalDots; i++) {
            const dot = document.createElement("button");
            dot.setAttribute('data-as-dot', "");

            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => moveToSlide(i));
            this.pagination.appendChild(dot);
        }
    }
}