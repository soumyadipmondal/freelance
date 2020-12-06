class SearchResultList {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        this.paragraphItemEles = this.component.querySelectorAll('.cmp-text__paragraph > p');
        this.showMoreBtnEles = this.component.querySelectorAll('.show-more_less');

        this.showReadMoreBtn();
    }

    showReadMoreBtn() {

        this.paragraphItemEles.forEach((paragraphItem, idx) => {
            if (paragraphItem.innerHTML.length >= 40 && (window.innerWidth >= 375 && window.innerWidth < 768)) {
                paragraphItem.classList.add('expander');
                this.toggleReadMoreBtn(paragraphItem, idx);
            } else {
                paragraphItem.classList.remove('expander');
            }
        });

    }

    toggleReadMoreBtn(paragraphItem, idx) {
        this.showMoreBtnEles[idx].style.display = 'initial';
        this.showMoreBtnEles[idx].addEventListener('click', () => {

            if (this.showMoreBtnEles[idx].innerHTML === 'Read more') {
                this.showMoreBtnEles[idx].innerHTML = 'Show less';
                if (paragraphItem.classList.contains('expander')) {
                    paragraphItem.classList.remove('expander');
                }
            } else {
                this.showMoreBtnEles[idx].innerHTML = 'Read more';
                if (!paragraphItem.classList.contains('expander')) {
                    paragraphItem.classList.add('expander');
                }
            }

        });
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new SearchResultList('.cmp-searchresultlist');
});
