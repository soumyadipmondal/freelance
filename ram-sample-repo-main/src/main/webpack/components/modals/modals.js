class Modals {
    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {
        $(document).on('click', '.show-popup', function(){
            const toggle = $(this).data('toggle');
            if(toggle) {
                const href = $(this).data('href');
                const target = $(this).data('target') ? '_blank' : '_self';
                const ariaLabel = $(this).data('ariaLabel');
                $('#leavePage').attr('href', href);
                $('#leavePage').attr('target', target);
                $('#leavePage').attr('aria-label', ariaLabel);
            }
        });
    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new Modals('#leavePageModal');
});
