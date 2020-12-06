class PlanUsage {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        this.toggleBeforeAfterBtn();
    }

    toggleBeforeAfterBtn() {
        $('.after-plan-usage').click(() => {
            $('.deductible-after').show();
            $('.deductible-before .tool-tip').hide();
            $('.oopm-after').show();
            $('.oopm-before .tool-tip').hide();
        });

        $('.before-plan-usage').click(() => {
            $('.deductible-after').hide();
            $('.deductible-before .tool-tip').show();
            $('.oopm-after').hide();
            $('.oopm-before .tool-tip').show();
        });
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new PlanUsage('.cmp-planUsage');
});
