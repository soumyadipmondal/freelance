class Drawer {
    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) { //Only proceed if component element is found on the page
            this.init();
        }
    }

    init() {

        const selectors = {
            showAllBtn: '.show-all',
            accordionItem: '.cmp-accordion__item'
        };

        const objects = {
            showAllBtn: this.component.querySelector(selectors.showAllBtn),
            accordionItem: [].slice.call(this.component.querySelectorAll(selectors.accordionItem))
        };

        const showAllBtnClick = () => {

            objects.accordionItem
                .filter(x => x.classList.contains('accordion-hidden'))
                .map(x => x.classList.remove('accordion-hidden'));
            objects.showAllBtn.classList.add('showmore-hidden');

        };

        if (this.component.querySelectorAll('.cmp-accordion__item').length > 3) {
            objects.showAllBtn.classList.remove('showmore-hidden');
            if (objects.showAllBtn) {
                objects.showAllBtn.addEventListener('click', showAllBtnClick);
            }
        } else {
            objects.showAllBtn.classList.add('showmore-hidden');
        }

    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new Drawer('.cmp-drawer');
});
