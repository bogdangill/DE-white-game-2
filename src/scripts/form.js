class Form {
    defaultSelectors = {
        form: '[data-js-form]',
        input: '[data-js-input]',
        checkbox: '[data-js-checkbox]'
    }

    constructor(customSelectors = {}) {
        this.selectors = {...this.defaultSelectors, ...customSelectors};
    }

    init() {
        document.querySelectorAll(this.selectors.form).forEach(form => {
            form.addEventListener('submit', (event) => this.handleSubmit(event, form));
        });
    }

    handleSubmit(event, form) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log('Form Data:', data);

        form.reset();
    }
}

export default Form;