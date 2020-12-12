class Accordion {
    constructor(componentClassName) {
        this.component = $(componentClassName);
        if (this.component !== null) { //Only proceed if component element is found on the page
            this.init();
        }
    }

    init() {

        const selectors = {
            accordionItem: '.cmpAccordionItem',
            accordionBtn: '.cmpAccordionButton'
        };

        const objects = {
            accordionItem: [].slice.call($(this.component).find(selectors.accordionItem)),
            accordionBtn: [].slice.call($(this.component).find(selectors.accordionBtn))
        };

        const toggleAccordionItem = (e) =>{
            const targetPanelElem=$(e.target).parents('.cmpAccordionHeader').siblings('.cmpAccordionPanel');
            if($(targetPanelElem).hasClass('cmpAccordionPanelHidden')){
                $(targetPanelElem).removeClass('cmpAccordionPanelHidden').addClass('cmpAccordionPanelExpanded');
                $(e.target).parents('.cmpAccordionHeader').addClass('active');
                $(e.target).parents('.cmpAccordionHeader').find('button.cmpAccordionButton').addClass('cmpAccordionButtonExpanded').attr('aria-expanded', true);
            }else{
                $(targetPanelElem).addClass('cmpAccordionPanelHidden').removeClass('cmpAccordionPanelExpanded');
                $(e.target).parents('.cmpAccordionHeader').removeClass('active');
                $(e.target).parents('.cmpAccordionHeader').find('button.cmpAccordionButton').removeClass('cmpAccordionButtonExpanded').attr('aria-expanded', false);
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
    new Accordion('.cmpAccordion');
});
