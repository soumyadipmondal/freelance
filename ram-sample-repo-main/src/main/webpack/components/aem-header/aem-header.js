class AEMHeader {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        $('.navbar-toggle').click(function () {
            $(this).toggleClass('active indexity');
            $('.navbar-collapse').toggleClass('rght');
        });
        $('.dropdown-no-coll').click(function () {
            $(this).toggleClass('hidd_sm disp_block');
        });
        if (window.outerWidth <= 1024) {
            $('.nav li.dropdown a.header-menu').click(function (e) {
                e.preventDefault();
                if ($(this).closest('li.dropdown').hasClass('open')) {
                    $(this).closest('li.dropdown').removeClass('open');
                } else {
                    $('.nav li.dropdown').removeClass('open');
                    $(this).closest('li.dropdown').addClass('open');
                }
            });
            $('.nav li.dropdown ul.dropdown-menu .dropdown-submenu a.nav-bar-plan-name').click(function (e) {
                e.preventDefault();
                if ($(this).closest('li.dropdown-submenu').hasClass('open')) {
                    $(this).closest('li.dropdown-submenu').removeClass('open');
                } else {
                    $('.nav li.dropdown ul.dropdown-menu .dropdown-submenu').removeClass('open');
                    $(this).closest('li.dropdown-submenu').addClass('open');
                }
            });
        } else {
            $('.nav li.nav-menu a').last().addClass('last-item');
            $('.nav li.nav-menu').hover(function () {
                $(this).addClass('open');
            }, function () {
                $(this).removeClass('open');
            });
            $('.nav li.nav-menu a.header-menu').focusin(function () {
                if ($(this).parent('li.nav-menu').length) {
                    $('.nav li.nav-menu').removeClass('open');
                }
                $(this).parent('li.nav-menu').addClass('open');
            });
            $('.nav li.nav-menu a.last-item').focusout(function () {
                $('.nav li.nav-menu').removeClass('open');
            });
            $('.nav li a').first().focus(function () {
                $('.nav li.nav-menu').removeClass('open');
            });
        }
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new AEMHeader('.headerContainer');
});
