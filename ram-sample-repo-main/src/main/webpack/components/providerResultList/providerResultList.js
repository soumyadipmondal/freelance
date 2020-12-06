class ProviderResultList {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {

        this.accessibleListEvents();
        this.sortEvents();
        this.locationEvents();
        this.filterEvents();

    }

    accessibleListEvents() {

        const listBoxRole = '[role=listbox]',
            optionRole = '[role=option]';

        $(listBoxRole).on('focus', function () {
            // If no selected element, select the first by default
            if (!$(this).find('[aria-selected=true]').length) {
                $(this).find('[role=option]:first').attr('aria-selected', 'true').focus();
            } else {
                $(this).find('[aria-selected=true]').focus();
            }
        });
        $(listBoxRole).on('click keydown', function (e) {
            const currentItem = $(this).find('[aria-selected=true]');
            switch (e.keyCode) {
                case 38:  // Up arrow
                    if (currentItem.prev().length) {
                        currentItem.attr('aria-selected', 'false');
                        currentItem.prev().attr('aria-selected', 'true').focus();
                    }
                    e.preventDefault();
                    break;
                case 40: // Down arrow
                    if (currentItem.next().length) {
                        currentItem.attr('aria-selected', 'false');
                        currentItem.next().attr('aria-selected', 'true').focus();
                    }
                    e.preventDefault();
                    break;
            }
        });
        $(optionRole).on('mousedown', function (e) {
            $(this).parent().find('[aria-selected=true]').attr('aria-selected', 'false');
            $(this).attr('aria-selected', 'true');
            e.preventDefault();
        });
        $(optionRole).on('focus', function () {
            $(this).parent().attr('tabindex', '-1');
        });

        $(optionRole).on('blur', function () {
            $(this).parent().attr('tabindex', '0');
        });

    }

    sortEvents() {

        const sortBlock = '.cmp-providerResultList_sort-block',
            sortList = '.sort-list',
            sortItem = '.sort-item';

        /* Selecting an option from Sort By list */
        $(sortItem).on('click keypress', function () {
            $(sortItem).removeClass('selected').children().remove('i');
            $(this).each(function () {
                $(this).addClass('selected');
                $(this).children().after('<i class="fal fa-check" aria-hidden="true"></i>');
                $('.sort-selected div .sort').text($(this).text());
            });
            if (window.innerWidth >= 768) {
                setTimeout(() => {
                    $(sortList).hide();
                    $(sortBlock).focus();
                }, 0);
            } else {
                $('.sort-container').modal('hide');
            }
        });

        /* Above 768px closing Sort By option list on clicking out of the list */
        if (window.innerWidth >= 768) {
            $(sortBlock).removeAttr('data-toggle');
            $(sortBlock).click(() => {
                $(sortList).toggle();
                $('.sort-item.selected').focus();
            });
            $(document).on('click focus', (e) => {
                if ($(e.target).closest(sortBlock).length === 0) {
                    $(sortList).hide();
                }
            });
        }
    }

    locationEvents() {
        const locationSearchBlock = '.location-search_block',
            locationSearchInput = '.location-search_input',
            locationSearchInputModal = '.location-search_input-modal',
            locationSearchTypeaheadResultBlock = '.location-search_typeahead-result-block';

        if (window.innerWidth < 768) {
            $(locationSearchInput).removeAttr('id');
        }
        $(locationSearchInput).on('click focus', () => {
            if (window.innerWidth >= 768) {
                $(locationSearchInput).removeAttr('data-toggle');
                $(locationSearchBlock).addClass('border-blue_grey-bottom');
                $(locationSearchTypeaheadResultBlock).show();
            } else {
                $(locationSearchInputModal).val($(locationSearchInput).val());
                $(locationSearchInput).removeAttr('id');
                $(locationSearchBlock).removeClass('border-blue_grey-bottom');
                $('.location-search .location-search_typeahead-result-block').hide();
                setTimeout(() => {
                    $(locationSearchInputModal).focus();
                }, 300);
            }
        });
        $(locationSearchInputModal).click(() => {
            ProviderResultList.clearLocationSearchInput();
        });

        $(locationSearchInput).on('keypress input', () => {
            ProviderResultList.noLocationResult();
            if (window.innerWidth >= 768) {
                ProviderResultList.clearLocationSearchInput();
            } else {
                $(locationSearchInputModal).val($(locationSearchInput).val());
                $('.location-search-modal').modal('show');
                $(locationSearchInputModal).focus();
            }
        });

        $(locationSearchInputModal).on('keypress input', () => {
            ProviderResultList.noLocationResult();
            if ($(locationSearchInputModal).value !== '') {
                $('.location-search-modal .location-search_typeahead-default-block').hide();
            } else {
                $('.location-search-modal .location-search_typeahead-default-block').show();
            }
            ProviderResultList.clearLocationSearchInput();
        });

        $(document).on('mouseup blur', (e) => {
            if ($(e.target).closest('.location-search .location-search_block').length === 0) {
                $('.location-search_clear').hide();
                $(locationSearchBlock).removeClass('border-blue_grey-bottom');
                $('.location-search .location-search_typeahead-result-block').hide();
                $('.location-search_typeahead-no-result-text').hide();
            } else {
                ProviderResultList.clearLocationSearchInput();
                $('.location-search .location-search_typeahead-result-block').show();
            }
        });

        $('.location-search_input-back').click(() => {
            $(locationSearchInput).val($(locationSearchInputModal).val());
            $(locationSearchInput).focus();
        });

        $('.location-search_clear').click(() => {
            $(locationSearchInput).val('').focus();
            $(locationSearchInputModal).val('').focus();
            $('.location-search_clear').hide();
            $('.location-search_typeahead-no-result-text').hide();
            if (window.innerWidth >= 768) {
                $(locationSearchTypeaheadResultBlock).show();
            } else {
                $('.location-search-modal .location-search_typeahead-default-block').show();
            }
        });

        $('.update-done').click(() => {
            $('.location').text($(locationSearchInput).val());
        });
    }

    static noLocationResult() {
        const element = document.querySelector('.pac-container');
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes') {
                    if ($('.pac-container').children().length === 0 && ($('.location-search_input').val() !== '' ||
                        $('.location-search_input-modal').val() !== '')) {
                        $('.location-search_typeahead-no-result-text').show();
                    } else {
                        $('.location-search_typeahead-no-result-text').hide();
                    }
                }
            });
        });
        observer.observe(element, {
            attributes: true
        });
    }

    static clearLocationSearchInput() {
        if ($('.location-search_input').value === '' || $('.location-search_input-modal').value === '') {
            $('.location-search_clear').hide();
        } else {
            $('.location-search_clear').show();
        }
    }

    filterEvents() {
        const countCheckedRadioButtons = $('input:radio[name=distance]:checked').length;
        let countCheckedCheckboxes = $('input:checkbox[name=providerType]:checked, ' +
            'input:checkbox[name=blueDistinctionCenters]:checked, ' +
            'input:checkbox[name=OSC]:checked').length;

        /* Scroll Top to Provider Result List component */
        $('.cmp-providerResultList_filter-container button').click(function () {
            $('html, body').animate({
                scrollTop: $('.cmp-providerresultcountbar').offset().top
            }, 10);
        });

        $('input[type="radio"]').click(function(){
            $('input[type="radio"]').removeAttr('checked');
            if($(this).is(":checked")){
                $(this).attr('checked','checked');
            }
        });
        $('input[type="checkbox"]').click(function(){
            if ($(this).is(":checked")){
                $(this).attr('checked','checked');
            } else if ($(this).is(":not(:checked)")){
                $(this).removeAttr('checked');
            }
        });

        /* Above 768px removing toggle functionality of the accordion panel */
        if (window.innerWidth >= 768) {
            $('.btn.btn-link').removeAttr('data-toggle');
            $('.panel').removeClass('collapse');
            $('.filter-container .modal-dialog').removeClass('modal-dialog-scrollable');
        }

        /* Assigning Radio button and Checkboxes to filter count */
        $('.filter-count').text(countCheckedCheckboxes + countCheckedRadioButtons);
        $('.clear-filter button').click(() => {
            $('input:radio[name=distance]')[3].checked = true;
            $('input:checkbox').prop('checked', false);
            $('.filter-count').text('1');
            $('.clear-filter button').prop('disabled', true);
        });

        /* On updating Radio button and Checkboxes options updates filter count */
        $('input:checkbox').change(() => {
            countCheckedCheckboxes = $('input:checkbox[name=providerType]:checked, ' +
                'input:checkbox[name=blueDistinctionCenters]:checked, ' +
                'input:checkbox[name=OSC]:checked').length;
            $('.clear-filter button').prop('disabled', false);
            $('.filter-count').text(countCheckedCheckboxes + countCheckedRadioButtons);
        });
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new ProviderResultList('.cmp-providerResultList');
});
