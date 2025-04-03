export class Faq {
    selectors = {
        target: '[data-faq]',
        answerContainer: '[data-faq-answer-container]',
        question: '[data-faq-question]',
        answer: '[data-faq-answer]'
    }

    constructor() {
        this.root = document.querySelector(this.selectors.target);

        if (!this.root) return;

        this.questions = this.root.querySelectorAll(this.selectors.question);
        this.answerContainer = this.root.querySelector(this.selectors.answerContainer);
    }

    init() {
        this._bindEvents();
        this.showAnswer(this.questions[0]);
    }
    showAnswer(question) {
        question.classList.add('is-active');
        const answer = question.querySelector(this.selectors.answer);
        const answerText = answer.getAttribute('data-faq-answer');
        this.answerContainer.textContent = answerText;
    }

    _bindEvents() {
        this.questions.forEach(q => q.addEventListener('click', this._onQuestionClick));
    }
    _onQuestionClick = (e) => {
        this.questions.forEach(q => {
            if (q.classList.contains('is-active')) q.classList.remove('is-active')
        })
        this.showAnswer(e.currentTarget);
    }
}