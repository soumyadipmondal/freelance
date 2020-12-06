class AEMFooter {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {

        const virtualAss = $('.footer-distributed').data('virtual-assistant');
        const scrollUp = $('.scrollup');
        const sbTitle = $('.sb_title');

        if (virtualAss.show) {
            $('#virtual-assistant').attr('data-href', virtualAss.fullPath);
        } else {
            $('#virtual-assistant').remove();
        }

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                scrollUp.fadeIn();
                scrollUp.show();
                sbTitle.fadeOut();
                sbTitle.hide();
                $('#virtual-assistant').addClass('at_the_top');
            } else {
                scrollUp.fadeOut();
                scrollUp.hide();
                $('#virtual-assistant').removeClass('at_the_top');
                setTimeout(function () {
                    if (!$('.scrollup:visible').length) {
                        sbTitle.fadeIn();
                        sbTitle.show();
                    }
                }, 200);
            }
        });

        scrollUp.click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;
        });

    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new AEMFooter('.footer-distributed');
});
