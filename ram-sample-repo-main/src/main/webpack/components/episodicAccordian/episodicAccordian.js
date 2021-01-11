$(function(){
        if( $(window).width() > 1023) {
            $(".moretext").hide();
            $(".show_hide").on("click", function(){
                var txt = $(".moretext").is(':visible') ? 'Show More' : 'Show Less';
                $(this).text(txt).prev('.moretext').toggle();
            });
        }
        else{
            $(".moretext").hide(); 
        }
});