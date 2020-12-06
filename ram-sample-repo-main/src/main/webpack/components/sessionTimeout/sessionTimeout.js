class SessionTimeout {

    constructor(componentClassName) {
        this.component = document.querySelector(componentClassName);
        if (this.component !== null) {
            this.init();
        }
    }

    init() {

        this.activityWatcher();

        $('.redirectToLoginPage').click(() => {
            window.location = $('#logoutUrlPath').val();
        });

    }

    activityWatcher() {
        let secondsSinceLastActivity = 0;

        //The number of seconds that have passed since the user was active.

        //Five minutes. 60 x 5 = 300 seconds.
        const totalSessionTime = $('#sessionTime').val();
        const popUpTime = $('#modelPopUpTime').val();
        const maxInactivity = totalSessionTime - popUpTime;

        //An array of DOM events that should be interpreted as user activity.
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

        //Setup the setInterval method to run every second. 1000 milliseconds = 1 second.
        setInterval(() => {
            secondsSinceLastActivity++;

            //if the user has been inactive or idle for longer
            //then the seconds specified in maxInactivity
            if (secondsSinceLastActivity > maxInactivity) {
                const diff = totalSessionTime - secondsSinceLastActivity;

                if (secondsSinceLastActivity === maxInactivity + 1) {
                    $('.sessionTimeoutModal').modal('show');
                }
                if (diff >= 0) {
                    const minuteAndSecond = this.getMinuteAndSecond(diff);
                    const minAndSec = minuteAndSecond.split(':');
                    let min = minAndSec[1];
                    const sec = minAndSec[2];
                    if (min === '') {
                        min = 0;
                    }
                    $('#timeValueShowInSec').text(sec);
                    $('#timeValueShowInMin').text(min);
                }

                else {
                    //Redirect To Login Page
                    window.location = $('#logoutUrlPath').val();
                }
            }
        }, 1000);

        //The function that will be called whenever a user is active
        function activity() {
            //Reset the secondsSinceLastActivity variable back to 0
            if ($('div.sessionTimeoutModal.modal').css('display') === 'none') {
                secondsSinceLastActivity = 0;
            }
        }

        //Add these events to the document.
        //Register the activity function as the listener parameter.
        activityEvents.forEach((eventName) => {
            document.addEventListener(eventName, activity, true);
        });

        $('.activityCheckerCount').click(() => {
            secondsSinceLastActivity = 0;
        });

    }

    //Convert Seconds to Minutes and Seconds
    getMinuteAndSecond(seconds) {
        const format = this.timeFormat();
        const hours = seconds / 3600;
        const minutes = (seconds % 3600) / 60;

        return [hours, minutes, seconds % 60].map(format).join(':');
    }

    timeFormat() {
        return function (val) {
            return ('0' + Math.floor(val)).slice(-2);
        };
    }
}

//Create class after DOM content load
document.addEventListener('DOMContentLoaded', () => {
    new SessionTimeout('.sessionTimeoutModal');
});
