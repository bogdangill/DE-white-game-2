export class WhiteGameSlider {
    selectors = {
        slider: '[data-wg-slider]',
        slide: '[data-wg-slide]',
        pagination: '[data-wg-pagination]',
        dot: '[data-wg-dot]'
    }
    defaultOptions = {
        slideWidth: '100%',
        slideGap: '24px'
    }

    constructor(targetSelector, options = {}) {   
        this.options = {...this.defaultOptions, ...options};
        
        this.sliderContainer = document.querySelector(targetSelector);
        
        if (!this.sliderContainer) return

        this.slider = this.sliderContainer.querySelector(this.selectors.slider);
        this.slides = this.sliderContainer.querySelectorAll(this.selectors.slide);
        this.pagination = this.sliderContainer.querySelector(this.selectors.pagination);

        this.slideWidth = this.options.slideWidth;
        this.slideGap = this.options.slideGap;

        this.totalSlideWidth = this._calculateTotalSlideWidth();

        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentTranslate = 0;
        this.visibleSlides = Math.floor(this.sliderContainer.clientWidth / this.totalSlideWidth);
        this.totalDots = this.slides.length - this.visibleSlides + 1;
    }

    init() {
        this.slider.style.gap = this.slideGap;
        this.slides.forEach(slide => slide.style.width = this.slideWidth);

        this._createPagination();
        this._bindEvents();
    }
    moveToSlide(index) {
        this.currentIndex = index;
        const maxOffset = (this.slides.length - this.visibleSlides) * this.totalSlideWidth;
        let offset = index * this.totalSlideWidth;
        if (offset > maxOffset) offset = maxOffset;
        this.slider.style.transform = `translateX(-${offset}px)`;

        this._updatePagination();
    }
    _bindEvents() {
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
    _calculateTotalSlideWidth() {
        // конвертирует % в пиксели, если кастомная ширина слайда в опциях
        const width = typeof this.slideWidth === 'string' && this.slideWidth.includes('%')
            ? this.sliderContainer.clientWidth * parseFloat(this.slideWidth) / 100
            : parseFloat(this.slideWidth);
            
        const gap = parseFloat(this.slideGap);
        
        return width + gap;
    }
    _updatePagination() {
        this.pagination.querySelectorAll(this.selectors.dot).forEach((dot, index) => {
            dot.classList.toggle("is-active", index === this.currentIndex);
        });
    }
    _createPagination() {
        this.pagination.innerHTML = "";

        for (let i = 0; i < this.totalDots; i++) {
            const dot = document.createElement("button");
            dot.setAttribute('data-wg-dot', "");

            if (i === 0) dot.classList.add("is-active");

            dot.addEventListener("click", () => moveToSlide(i));
            this.pagination.appendChild(dot);
        }
    }
}