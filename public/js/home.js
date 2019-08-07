//Menu format/control for about(what is) section
$(document).ready(function() {
    active = "intro"
    $('.infoUserCat').click(function(){
        if (active != this.id){
            //toggles class to control text color for menu selection
            $('.infoUserCat.infoSelect').toggleClass('infoSelect');
            $(this).toggleClass('infoSelect');
            //hides previously selected info blubs and fades in currently selected one
            $("#blurb"+active).css({'display': "none", "opacity":"0"});
            $("#blurb"+this.id).css('display', "flex");
            $("#blurb"+this.id).animate({ opacity: 1}, 1000)
            //hover effects for menu selection
            $(this).toggleClass('infoHover');
            $("#"+active).toggleClass('infoHover');
            //hide and show arrows
            $("#arrow"+active).css({"opacity":"0"}).removeClass("fadeInRight").addClass("fadeOutRight");
            $("#arrow"+this.id).css({"opacity":"1"}).removeClass("fadeOutRight").addClass("fadeInRight");
            //id of currently active menu for comparison
            active = this.id
        }
    })
    $('.infoUserCatLink').click(function(){
        if(this.id === "petOwnersLink") {
            $('#petOwners').trigger('click');
        } else if(this.id === "adoptionsLink") {
            $('#adoptions').trigger('click');
        } else if(this.id === "professionalsLink") {
            $('#professionals').trigger('click');
        }
    })
});