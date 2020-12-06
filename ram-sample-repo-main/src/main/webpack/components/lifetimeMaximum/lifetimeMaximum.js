class LifetimeMaximum {

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
        $('.after-estimate').click(() => {
            $('.after-procedure').show();
            $('.lifetime-paid .tool-tip').hide();
            $('.cmp-lifetimeMaximum_progressbar-legend-after-procedure').show();
        });

        $('.before-estimate').click(() => {
            $('.after-procedure').hide();
            $('.lifetime-paid .tool-tip').show();
            $('.cmp-lifetimeMaximum_progressbar-legend-after-procedure').hide();
        });
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new LifetimeMaximum('.cmp-lifetimeMaximum');
});
