export class WhiteGameSlider {
    selectors = {
        slider: '[data-wg-slider]',
        slide: '[data-wg-slide]',
        pagination: '[data-wg-pagination]',
        dot: '[data-wg-dot]'
    }
    defaultOptions = {
        slideWidth: '100%',
        slideGap: '24px',
        dragThreshold: 50 // порог для срабатывания переключения слайда
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
        this.prevTranslate = 0;
        this.visibleSlides = Math.round(this.sliderContainer.clientWidth / this.totalSlideWidth);
        this.totalDots = Math.max(this.slides.length - this.visibleSlides + 1) //чтоб хотябы один дот был;
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
        //ивенты для десктопа
        this.slider.addEventListener("mousedown", this._onDragStart);
        window.addEventListener("mousemove", this._onDragMove);
        window.addEventListener("mouseup", this._onDragEnd);

        //ивенты для мобилки
        this.slider.addEventListener("touchstart", this._onDragStart);
        window.addEventListener("touchmove", this._onDragMove);
        window.addEventListener("touchend", this._onDragEnd);
    }
    _onDragStart = (e) => {
        this.isDragging = true;
        this.startX = e.clientX || e.touches[0].clientX;
        this.prevTranslate = this.currentTranslate;
        this.slider.style.cursor = "grabbing";
    }
    _onDragMove = (e) => {
        if (!this.isDragging) return;
        
        const currentX = e.clientX || e.touches[0].clientX;
        const delta = currentX - this.startX;
        this.currentTranslate = this.prevTranslate + delta;
        
        this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    _onDragEnd = (e) => {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.slider.style.cursor = "grab";
        
        const currentX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const delta = currentX - this.startX;

        if (Math.abs(delta) > this.options.dragThreshold) {
            if (delta < 0 && this.currentIndex < this.totalDots - 1) {
                this.currentIndex++;
            } else if (delta > 0 && this.currentIndex > 0) {
                this.currentIndex--;
            }
        }
        
        this.moveToSlide(this.currentIndex);
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

            dot.addEventListener("click", () => this.moveToSlide(i));
            this.pagination.appendChild(dot);
        }
    }
}