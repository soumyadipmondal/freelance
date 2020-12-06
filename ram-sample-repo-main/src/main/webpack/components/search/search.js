class Search {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        
        this.searchSection = this.component.querySelector('.cmp-search_section');
        this.searchBtn = this.component.querySelector('.cmp-search_button');

        this.searchInputBox = this.component.querySelector('.cmp-search_input');
        this.typeaheadResultList = this.component.querySelector('.cmp-search_typeahead-result-list');
        this.searchClearBtn = this.component.querySelector('.cmp-search_clear');
        this.searchMember = this.component.querySelector('.cmp-search_member');
        this.searchMembership = this.component.querySelector('.cmp-search_membership');
        this.searchMemberListDropdown = this.component.querySelector('.cmp-search_memberlist');
        this.searchMemberListMember = this.searchMemberListDropdown.querySelectorAll('.memberlist-member');
        this.searchMemberListMemberSpanEle = this.searchMemberListDropdown.querySelectorAll('.memberlist-member span');
        this.searchMemberActive = this.searchMember.querySelector('.member-active');

        this.typeAheadResultBlock = this.component.querySelector('.cmp-search_typeahead-result-block');
        this.typeAheadNoResultText = this.component.querySelector('.cmp-search_typeahead-no-result-text');
        this.typeAheadResultList = this.component.querySelector('.cmp-search_typeahead-result-list');

        this.searchModal = this.component.querySelector('.cmp-search_modal');
        this.searchInputBoxModal = this.searchModal.querySelector('.cmp-search_input-modal');
        this.searchClearBtnModal = this.searchModal.querySelector('.cmp-search_clear');
        this.searchInputBoxModalBackBtn = this.searchModal.querySelector('.cmp-search_input-back');
        this.typeAheadNoResultTextModal = this.searchModal.querySelector('.cmp-search_typeahead-no-result-text');
        this.typeAheadResultListModal = this.searchModal.querySelector('.cmp-search_typeahead-result-list');

        this.clickEvents();
        this.inputEvents();
        this.blurEvents();
        this.focusOutEvents();
        this.keyPressEvents();

    }

    clickEvents() {

        this.searchInputBox.addEventListener('click', () => {
            if (Search.isMobileView()) {
                this.hideTypeAheadBlock();
                this.showSearchModal();
                this.searchInputBoxModal.focus();
            } else {
                this.searchSection.classList.add('border-blue_grey-bottom');
                this.showTypeAheadBlock();
                if (this.searchInputBox.value.length <= 2) {
                    this.showTypeAheadNoResultText();
                } else {
                    this.showClearIcon();
                }
            }
        });

        this.searchClearBtn.addEventListener('click', () => {
            this.searchInputBoxEmpty();
            this.hideClearIcon();
            this.disableSearchBtn();
            this.searchInputBox.focus();
        });

        this.searchClearBtnModal.addEventListener('click', () => {
            this.searchInputBoxEmpty();
            this.searchInputBoxModalEmpty();
            this.hideClearIcon();
            this.showTypeAheadNoResultTextModal();
            this.disableSearchBtn();
            this.searchInputBoxModal.focus();
        });

        this.searchInputBoxModalBackBtn.addEventListener('click', () => {
            this.hideSearchModal();
        });

        this.searchMember.addEventListener('click', () => {
            this.showSearchMemberList();
        });

        this.searchMemberListMember.forEach((ele, idx) => {
            ele.addEventListener('click', () => {
                this.selectMemberFromMemberList(idx);
            });
        });

    }

    inputEvents() {

        this.searchInputBox.addEventListener('input', () => {
            this.searchInputBoxModal.value = this.searchInputBox.value;
            if (this.searchInputHasValue()) {
                this.showTypeAheadBlock();
                this.searchSection.classList.add('border-blue_grey-bottom');
                this.showClearIcon();
                if (this.searchInputBox.value.length > 2) {
                    this.showTypeAheadResultList();
                    this.enableSearchBtn();
                } else {
                    this.showTypeAheadNoResultText();
                    this.disableSearchBtn();
                }
            } else {
                this.hideClearIcon();
                this.hideTypeAheadBlock();
                this.searchSection.classList.remove('border-blue_grey-bottom');
            }
        });

        this.searchInputBoxModal.addEventListener('input', () => {
            this.searchInputBox.value = this.searchInputBoxModal.value;
            if (this.searchInputBoxModal.value.length > 2) {
                this.showClearIcon();
                this.showTypeAheadResultListModal();
                this.enableSearchBtn();
            } else {
                this.hideClearIcon();
                this.showTypeAheadNoResultTextModal();
                this.disableSearchBtn();
            }
        });

    }

    blurEvents() {

        // On blur of Search Input Box
        this.searchInputBox.addEventListener('blur', (event) => {
            if (!event.relatedTarget || event.relatedTarget.className !== 'cmp-search_typeahead-result-item') {
                this.hideClearIcon();
                this.hideTypeAheadBlock();
                this.searchSection.classList.remove('border-blue_grey-bottom');
            }
        });

    }

    focusOutEvents() {

        // On focusout of Type Ahead Result List (UL)
        this.typeaheadResultList.addEventListener('focusout', (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
                this.hideTypeAheadBlock();
                this.searchSection.classList.remove('border-blue_grey-bottom');
            }
        });

        // On focusout of Search Membership (UL)
        this.searchMembership.addEventListener('focusout', (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
                if (Search.isMobileView()) {
                    this.searchMember.classList.remove('border-blue_grey-bottom');
                }
                this.searchMemberListDropdown.style.display = 'none';
                if (this.searchMember.querySelectorAll('i')[1].classList[1] === 'fa-chevron-up') {
                    this.changeChevronDown();
                }
            }
        });

    }

    keyPressEvents() {

        this.searchMember.addEventListener('keypress', () => {
            this.showSearchMemberList();
        });

        this.searchMemberListMember.forEach((ele, idx) => {
            ele.addEventListener('keypress', () => {
                this.selectMemberFromMemberList(idx);
            });
        });

    }

    static isMobileView() {
        return window.innerWidth < 768;
    }

    showSearchModal() {
        this.searchModal.style.display = 'block';
    }

    hideSearchModal() {
        this.searchModal.style.display = 'none';
    }

    searchInputHasValue() {
        return this.searchInputBox.value !== '' || this.searchInputBoxModal.value !== '';
    }

    searchInputBoxEmpty() {
        this.searchInputBox.value = '';
    }

    searchInputBoxModalEmpty() {
        this.searchInputBoxModal.value = '';
    }

    showTypeAheadNoResultText() {
        this.typeAheadNoResultText.style.display = 'block';
        this.typeAheadResultList.style.display = 'none';
    }

    showTypeAheadResultList() {
        this.typeAheadNoResultText.style.display = 'none';
        this.typeAheadResultList.style.display = 'block';
    }

    disableSearchBtn() {
        this.searchBtn.setAttribute('aria-disabled', 'true');
        this.searchBtn.classList.remove('active');
    }

    enableSearchBtn() {
        this.searchBtn.setAttribute('aria-disabled', 'false');
        this.searchBtn.classList.add('active');
    }

    hideClearIcon() {
        this.searchClearBtn.style.display = 'none';
        this.searchClearBtnModal.style.display = 'none';
    }

    showClearIcon() {
        this.searchClearBtn.style.display = 'block';
        this.searchClearBtnModal.style.display = 'block';
    }

    showTypeAheadBlock() {
        this.typeAheadResultBlock.style.display = 'block';
    }

    hideTypeAheadBlock() {
        this.typeAheadResultBlock.style.display = 'none';
    }

    showTypeAheadResultListModal() {
        this.typeAheadNoResultTextModal.style.display = 'none';
        this.typeAheadResultListModal.style.display = 'block';
    }

    showTypeAheadNoResultTextModal() {
        this.typeAheadNoResultTextModal.style.display = 'block';
        this.typeAheadResultListModal.style.display = 'none';
    }

    changeChevronDown() {
        this.searchMember.querySelector('i.fa-chevron-up').classList.add('fa-chevron-down');
        this.searchMember.querySelector('i.fa-chevron-down').classList.remove('fa-chevron-up');
    }

    changeChevronUp() {
        this.searchMember.querySelector('i.fa-chevron-down').classList.add('fa-chevron-up');
        this.searchMember.querySelector('i.fa-chevron-up').classList.remove('fa-chevron-down');
    }

    showSearchMemberList() {
        if (this.searchMemberListDropdown.style.display === '' ||
            this.searchMemberListDropdown.style.display === 'none') {
            this.searchMemberListDropdown.style.display = 'block';
            this.changeChevronUp();
            if (Search.isMobileView()) {
                this.searchMember.classList.add('border-blue_grey-bottom');
                this.searchMemberListDropdown.classList.add('border-blue_no-top');
            }
        } else {
            this.searchMemberListDropdown.style.display = 'none';
            this.changeChevronDown();
            if (Search.isMobileView()) {
                this.searchMember.classList.remove('border-blue_grey-bottom');
                this.searchMemberListDropdown.classList.remove('border-blue_no-top');
            }
        }
    }

    selectMemberFromMemberList(idx) {
        const newIconEle = document.createElement('i');

        this.searchMemberActive.innerHTML = this.searchMemberListMemberSpanEle[idx].innerHTML;
        this.searchMemberListMember.forEach((ele) => {
            ele.classList.remove('selected');
            if (ele.contains(ele.querySelector('.fa-check'))) {
                ele.querySelector('.fa-check').remove();
            }
        });
        this.searchMemberListMember[idx].classList.add('selected');
        newIconEle.className = 'fal fa-check';
        newIconEle.setAttribute('aria-hidden', 'true');
        this.searchMemberListMember[idx].querySelector('span').after(newIconEle);
        this.searchMemberListDropdown.style.display = 'none';
        this.changeChevronDown();
        this.searchMember.classList.remove('border-blue_grey-bottom');
    }

}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new Search('.cmp-search'); //Initialize component by passing in the class name
});
