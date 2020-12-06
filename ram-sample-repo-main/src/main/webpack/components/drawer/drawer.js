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
            accordionItem: '.cmp-accordion__item',
            accordionBtn: '.cmp-accordion__button'
        };

        const objects = {
            showAllBtn: this.component.querySelector(selectors.showAllBtn),
            accordionItem: [].slice.call(this.component.querySelectorAll(selectors.accordionItem)),
            accordionBtn: [].slice.call(this.component.querySelectorAll(selectors.accordionBtn))
        };
        
        console.log(objects.showAllBtn);
        console.log(this.component.querySelectorAll(selectors.accordionBtn));

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

        const toggleAccotdionItem = (e) =>{
            objects.accordionItem
                .filter(x => $(x).find('div.cmp-accordion__panel').hasClass("cmp-accordion__panel--expanded"))
                .map(x => {
                    $(x).find('div.cmp-accordion__panel').removeClass('cmp-accordion__panel--expanded').addClass('cmp-accordion__panel--hidden');
                    $(x).find('button.cmp-accordion__button').removeClass('cmp-accordion__button--expanded cmp-accordion__button--disabled').attr('aria-expanded', false);
                });

            const targetPanelElem=$(e.target).parents('.cmp-accordion__header').siblings('.cmp-accordion__panel');
            $(targetPanelElem).removeClass('cmp-accordion__panel--hidden').addClass('cmp-accordion__panel--expanded');
            $(e.target).parents('.cmp-accordion__header').find('button.cmp-accordion__button').addClass('cmp-accordion__button--expanded cmp-accordion__button--disabled').attr('aria-expanded', true);
        };

        objects.accordionBtn
        .map(btn => {$(btn).on('click', toggleAccotdionItem)});
    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new Drawer('.cmp-drawer');
});
