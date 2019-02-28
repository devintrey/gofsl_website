/**
 * Core by Fraze
 * Version 1.0.2
 * afraze at gmail d0t com
 * Licensed under MIT Open Source
 */

//SET GLOBALS

var vidContainer = $(".hero.video");  //OUTTERMOST CONTAINER FOR HERO VIDEO
var socialGridContainer = $("#social-grid");

var log_foundation_mediaquery = true;  //CONSOLE LOG FOUNDATION BREAKPOINT AND WINDOW DEMINSIONS
var log_console = true;  //CUSTOM CODE SHOW CONSOLE LOG

var pagePath = window.location.pathname.toLowerCase();  //CURRENT PATH (/about/index.html)


//INITIALIZE 
$(document).foundation();

//DOC READY
$(document).ready(function () {
    
    //BREAKPOING LOGGING
    if (log_foundation_mediaquery) logBreakpoint();

    //HANDLE 'CURRENT' LINK CLASS 
    var start = pagePath.indexOf('/') + 1;
    var end = pagePath.indexOf('/', start);
    var topLevelFldr = pagePath.substring(start,end); //about, news, services, etc

    $(".nav-docurrent li a").each(function() {
        var fp = $(this).data("path");

        if(fp) {
            $(this).toggleClass("current", fp == topLevelFldr);    
            return true;
        }

        $(this).toggleClass("current", $(this).attr("href") == pagePath);
    });

    //HANDLE FOUNDATION OFFCANVAS OPEN AND CLOSE
    $(this).on("opened.zf.offcanvas", function () {
        $(".off-canvas-wrapper").css("overlow", "hidden");
        $(".menu-btn").html("&times;");
    });
    $(this).on("closed.zf.offcanvas", function () {
        $(".off-canvas-wrapper").css("overlow", "auto");
        $(".menu-btn").html("Menu");
    });

    //HANDLE MORE CLICK ON OFFCANVAS NAV
    $("a.more").on("click", function () {
        var parent = $(this).closest('li.has-children');
        var ul = $(this).next('ul.children');

        if (parent.hasClass('open')) {
            ul.slideUp();
        }
        else {
            ul.slideDown();
        }

        parent.toggleClass('open');
    });


    //HANDLE HERO VIDEO BACKGROUND
    initHeroMagic(true);

    //SLICK HAPPENS
    initSlick(true);

    //MASONRY GRID
    socialGrid()

    //WINDOW RESIZE EVENT
    $(window).on('resize', function () {

        //BREAKPOING LOGGING
        if (log_foundation_mediaquery) logBreakpoint();

        //HANDLE HERO VIDEO BACKGROUND
        initHeroMagic(false);

    });  //END WINDOW RESIZE 


}); //END DOCREADY



/* 
 * 
 * FUNCTIONS
 * 
 */

function logBreakpoint() {
    console.log("foundation breakpoint:\n");
    console.log("         " + Foundation.MediaQuery.current + " (h:" + $(window).height() + " w:" + $(window).width() + ")\n\n");
}

function socialGrid() {
    if (socialGridContainer.length) {
        socialGridContainer.masonry({
            // options
            columnWidth: '.grid-sizer',
            itemSelector: '.item',
            percentPosition: true
        });
    }
}


//#region HERO VIDEO MAGIC //

function initHeroMagic() {
    if (vidContainer.length) {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
        if (log_console) 
            Console.log("hero component initialized.\n");
    }
}

    function scaleVideoContainer() {

        var height = $(window).height();

        if (Foundation.MediaQuery.is('medium')) //max height of video 550px
            height = 460;
        else if (Foundation.MediaQuery.atLeast('large'))
            height = 570;
        else
            height = 700; //accomidate the quick apply form

        var unitHeight = parseInt(height) + 'px';
        $(vidContainer).css('height', unitHeight);

        var v = $("video", vidContainer);
        var vimg = $(".poster", vidContainer);

        if (Foundation.MediaQuery.atLeast('medium')) {
            if (!v.visible)
                v.show();

            vimg.hide();
        }
        else {
            v.hide();
            vimg.show();
        }
    }

    function initBannerVideoSize(element) {

        $(element).each(function () {
            $(this).data('height', $(this).height());
            //$(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element) {

        var windowWidth = $(vidContainer).width(),
            windowHeight = $(vidContainer).height(),
            videoWidth,
            videoHeight;

        if (log_console)
            console.log("vh:" + windowHeight + " vw:" + windowWidth + "\n");

        $(element).each(function () {
            var videoAspectRatio = $(this).data('height') / $(this).data('width'),
                windowAspectRatio = windowHeight / windowWidth;

            if (videoAspectRatio > windowAspectRatio) {
                videoWidth = windowWidth;
                videoHeight = videoWidth * videoAspectRatio;
                $(this).css({ 'top': -(videoHeight - windowHeight) / 2 + 'px', 'margin-left': 0 });
            } else {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                $(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });
                //$(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });
            }

            $(this).height(videoHeight);

            $("video", vidContainer).addClass('fadeIn animated');
        });
    }

    //#endregion  HERO VIDEO MAGIC //

    //#region SLICK FUNCTIONS
    function initSlick(isFirstLoad) {

        var slickContainer = $(".slick");

        if (slickContainer.length) {
            slickContainer.slick({
                mobileFirst: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 7000,
                speed: 3000,
                pauseOnHover: false,
                //cssEase: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
                easing: 'linear',
                fade: true,
                dots: true
            });

            if (isFirstLoad && log_console)
                console.log("Slick plugin initialized.\n");
        }

    }
    //#endregion
