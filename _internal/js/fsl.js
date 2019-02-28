var pillar_container = $(".pillars");
var pillars = $("h2", pillar_container);
var pillarIndex = -1;

$(document).ready(function () {

    if (pillars.length) {
        handlePillars();
    }

});

function handlePillars() {
    pillar_container.show();
    $(pillars).each(function () {
        $(this).hide();
    });
    setTimeout(showNextPillar);
}

function hideNextPillar() {
    $(".pillar-block").height(pillar_container.height());
    pillarIndex = -1;
    pillar_container.stop().fadeOut(2000, handlePillars);
}

function showNextPillar() {
    
    ++pillarIndex;

    if (pillarIndex == pillars.length) {
        pillarIndex = -1;
        //hideNextPillar();
        showNextPillar();
    }
    else {

        pillars.eq(pillarIndex)
                    .stop()
                    .fadeIn(2000)
                    .delay(2000)
                    .fadeOut(2000, showNextPillar);
    }
   
}