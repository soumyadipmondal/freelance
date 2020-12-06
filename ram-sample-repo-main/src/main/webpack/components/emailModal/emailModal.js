import $ from 'jquery';

class EmailModal {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {

        const emailBlock = $('.email_block'),
            emailInputEle = $('.email_input'),
            emailClearCTA = $('.email_clear'),
            sendEmailCTA = $('.send_cta'),
            emailModal = $('.email'),
            emailConfirmModal = $('.email-confirm'),
            backCTA = $('.back'),
            doneCTA = $('.done');

        emailInputEle.keypress(() => {
            if (emailInputEle.value === '') {
                emailClearCTA.hide();
            } else {
                emailClearCTA.show();
            }
        });

        emailInputEle.on('click focus', () => {
            emailBlock.addClass('border-blue');
        });

        emailInputEle.on('blur', () => {
            emailBlock.removeClass('border-blue');
        });

        emailClearCTA.click(() => {
            emailInputEle.val('');
            emailClearCTA.hide();
        });

        sendEmailCTA.click(() => {
            emailConfirmModal.css('display', 'flex');
            emailModal.hide();
        });

        backCTA.click(() => {
            emailModal.show();
            emailConfirmModal.hide();
        });

        doneCTA.click(() => {
            emailModal.show();
            emailConfirmModal.hide();
        });
    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new EmailModal('.cmp-emailModal');
});
