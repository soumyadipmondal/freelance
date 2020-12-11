class Accordion {
    constructor(componentClassName) {
        this.component = $(componentClassName);
        if (this.component !== null) { //Only proceed if component element is found on the page
            this.init();
        }
    }

    init() {

        const selectors = {
            accordionItem: '.cmp-accordion__item',
            accordionBtn: '.cmp-accordion__button'
        };

        const objects = {
            accordionItem: [].slice.call($(this.component).find(selectors.accordionItem)),
            accordionBtn: [].slice.call($(this.component).find(selectors.accordionBtn))
        };

        const toggleAccordionItem = (e) =>{
            const targetPanelElem=$(e.target).parents('.cmp-accordion__header').siblings('.cmp-accordion__panel');
            if($(targetPanelElem).hasClass('cmp-accordion__panel--hidden')){
                $(targetPanelElem).removeClass('cmp-accordion__panel--hidden').addClass('cmp-accordion__panel--expanded');
                $(e.target).parents('.cmp-accordion__header').addClass('active');
                $(e.target).parents('.cmp-accordion__header').find('button.cmp-accordion__button').addClass('cmp-accordion__button--expanded').attr('aria-expanded', true);
            }else{
                $(targetPanelElem).addClass('cmp-accordion__panel--hidden').removeClass('cmp-accordion__panel--expanded');
                $(e.target).parents('.cmp-accordion__header').removeClass('active');
                $(e.target).parents('.cmp-accordion__header').find('button.cmp-accordion__button').removeClass('cmp-accordion__button--expanded').attr('aria-expanded', false);
            }
        };
        objects.accordionBtn
        .map(btn => {
            $(btn).on('click', toggleAccordionItem)
        });
    }
}

//Create class after DOM content load
$(document).on('DOMContentLoaded', () => {
    new Accordion('.cmp-accordion');
});
