class CompareProviders {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {

        this.compareEvents();

    }

    compareEvents() {

        const compareCount = $('.compare-count'),
            clearCompareCta = $('.clear-compare button'),
            providerCheckbox = $('input:checkbox[name=compareProvider]'),
            compareProvidersComponent = $('.cmp-compareProviders');
        let countCheckedCheckboxes = $('input:checkbox[name=compareProvider]:checked').length;

        $('input[type="checkbox"]').click(function () {
            if ($(this).is(":checked")) {
                $(this).attr('checked', 'checked');
            } else if ($(this).is(":not(:checked)")) {
                $(this).removeAttr('checked');
            }
        });

        compareCount.text(countCheckedCheckboxes);
        clearCompareCta.click(() => {
            providerCheckbox.prop('checked', false);
            compareCount.text('0');
            clearCompareCta.prop('disabled', true);
            $('.col').removeClass('selected').empty();
            compareProvidersComponent.toggleClass('slide-up');
        });

        $('.compare-section .close').click(function () {
            $(this).closest('.selected').remove();
            $('.compare-block .row').append('<div class = "col"></div>');
        });

        providerCheckbox.change(() => {
            countCheckedCheckboxes = $('input:checkbox[name=compareProvider]:checked').length;
            clearCompareCta.prop('disabled', false);
            compareCount.text(countCheckedCheckboxes);
            if (countCheckedCheckboxes > 0) {
                compareProvidersComponent.addClass('slide-up');
            } else {
                compareProvidersComponent.removeClass('slide-up');
            }
            if (countCheckedCheckboxes > 3) {
                $('input:checkbox[name=compareProvider]:not(:checked)').attr('disabled', 'disabled');
            } else {
                $('input:checkbox[name=compareProvider]:not(:checked)').removeAttr('disabled');
            }
        });

        $('.modal-body').on('scroll', () => {
            if ($('.cmp-compareProvider_wrapper').position().top <= 0) {
                $('.cmp-compareProvider_wrapper').addClass('sticky-wrapper');
            } else {
                $('.cmp-compareProvider_wrapper').removeClass('sticky-wrapper');
            } 
        });

    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new CompareProviders('.cmp-compareProviders');
});
