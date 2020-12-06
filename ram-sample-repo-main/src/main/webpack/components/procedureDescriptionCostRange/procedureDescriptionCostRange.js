class ProcedureDescriptionCostRange {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        this.paragraphItem = this.component.querySelector('.cmp-text__paragraph > p');
        this.showMoreBtnEle = this.component.querySelector('.show-more_less');

        this.showReadMoreBtn();
        this.informationIconClick();
    }

    showReadMoreBtn() {

        if (this.paragraphItem.innerHTML.length >= 90 && (window.innerWidth >= 375 && window.innerWidth < 768)) {
            this.paragraphItem.classList.add('expander');
            this.toggleReadMoreBtn();
        } else if (this.paragraphItem.innerHTML.length >= 105 && (window.innerWidth >= 768
            && window.innerWidth < 1024)) {
            this.paragraphItem.classList.add('expander');
            this.toggleReadMoreBtn();
        } else if (this.paragraphItem.innerHTML.length >= 150 && (window.innerWidth >= 1024
            && window.innerWidth < 1140)) {
            this.paragraphItem.classList.add('expander');
            this.toggleReadMoreBtn();
        } else if (this.paragraphItem.innerHTML.length >= 190 && window.innerWidth >= 1140) {
            this.paragraphItem.classList.add('expander');
            this.toggleReadMoreBtn();
        } else {
            this.paragraphItem.classList.remove('expander');
        }

    }

    toggleReadMoreBtn() {
        this.showMoreBtnEle.style.display = 'block';
        this.showMoreBtnEle.addEventListener('click', () => {

            if (this.showMoreBtnEle.innerHTML === 'Read more') {
                this.showMoreBtnEle.innerHTML = 'Show less';
                if (this.paragraphItem.classList.contains('expander')) {
                    this.paragraphItem.classList.remove('expander');
                }
            } else {
                this.showMoreBtnEle.innerHTML = 'Read more';
                if (!this.paragraphItem.classList.contains('expander')) {
                    this.paragraphItem.classList.add('expander');
                }
            }

        });
    }

    informationIconClick() {
        this.informationIcon = this.component.querySelector('.cmp-procedureCostRange_metrics i');
        this.informationBox = this.component.querySelector('.informationBox');

        if (window.innerWidth < 768) {
            this.informationIcon.addEventListener('click', () => {
                if (this.informationBox.style.display === '' || this.informationBox.style.display === 'none') {
                    this.informationBox.style.display = 'block';
                } else {
                    this.informationBox.style.display = 'none';
                }
            });
        } else {
            this.informationBox.style.display = 'block';
        }
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new ProcedureDescriptionCostRange('.cmp-procedureDescriptionCostRange');
});
