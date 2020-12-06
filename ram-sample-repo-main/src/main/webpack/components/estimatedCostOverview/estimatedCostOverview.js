class EstimatedCostOverview {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        this.insuranceCoverageCostZero();
        this.toggleReadMoreBtn();
    }

    insuranceCoverageCostZero() {
        if ($('.cmp-procedureInsurancePay_metrics h2').text() === '$0') {
            $('.cmp-procedureInsurancePay_metrics h2').addClass('not-covered');
        } else {
            $('.cmp-procedureInsurancePay_metrics h2').removeClass('not-covered');
        }
    }

    toggleReadMoreBtn() {
        $('.show-more').click(() => {
            $('.show-text, .hide-text').toggle();
            $('.cost-explanation').toggle();
            $('.show-more i').toggleClass('fa-chevron-up fa-chevron-down');
        });
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new EstimatedCostOverview('.cmp-estimatedCostOverview');
});
