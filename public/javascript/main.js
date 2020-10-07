/**
* inViewport
* flatPrice
* flatCounter
* tabs
* flatFilterBox
* flatIsotope
* searchIcon
* goTop
* VideoPopup
* countDownTime
* googleMap
* responsiveMenu
* headerFixed
* flatImagePopup
* inViewport
* zoomPic
* flatGallery
* ajaxContactForm
* flatProgressBar
* accordionToggle
* contentBox
* spacer
* flatFilterPrice
* canvasMobi
* testimonialCarousel
* flatRetinaLogo
* flatOwl
* parallax
* inViewport
* removePreloader  
*/

;(function($) {
    "use strict";
    
    var isMobile = {

        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },        
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
     

    var inViewport =  function() {
        $('[data-inviewport="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };
    
    var flatCounter = function() {
        if ( $().countTo ) {
            $('.counter').on('on-appear', function() {
                $(this).find('.numb-count').each(function() {
                    var to = $(this).data('to'),
                        speed = $(this).data('speed');
                        
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                });
            });
        }
    };

    var flatOwl = function() {
        if ( $().owlCarousel ) {
            $('.flat-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap")),
                dots = $this.data("dots"),
                nav = $this.data("nav");               

                $this.find('.owl-carousel').owlCarousel({
                    margin: gap,
                    loop:true,
                    dots:dots,
                    nav: nav,
                    navigation : nav,
                    pagination: dots,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        765:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };


    var flatIsotope = function() {
        if($().isotope) {
            var $container = $('.project-wrap');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.project-inner',
                    transitionDuration: '1s',
                    layoutMode: 'fitRows'
                });
            });

            $('.flat-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.flat-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });
        };
    };


   
    var googleMap = function () {
        // gmap default
        if ($().gmap3) {
            var data = JSON.parse('[{"address":"Sremska Mitrovica, Rumski Drum 79","content":""}]');
            $(".flat-map")
            .gmap3({
                map: {
                    options: {
                        zoom: 12,
                        center: [44.975673, 19.662519],
                        mapTypeId: 'Dustri',
                        mapTypeControlOptions: {
                            mapTypeIds: ['Dustri', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: true
                    },
                },
            });

        }
        // json loop
        $.each(data, function (key, val) {
            $('.flat-map').gmap3({
                marker: {
                    values: [{
                        address: val.address,
                        options: {
                            icon: "./image/icon-map.png"
                        }
                        
                    }]
                },
                styledmaptype: {
                    id: "Dustri",
                    options: {
                        name: "Dustri"
                    },
                    styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": "-100"
                        }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                        {
                            "visibility": "off"
                        }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": "-100"
                        }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                        {
                            "lightness": "30"
                        }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                        {
                            "lightness": "40"
                        }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                        ]
                    }
                    ]
                }
            });
        });
    };    
    
    var searchIcon = function () {
        $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID !== 'input-search' ) ) {
                $('.header-search-form').removeClass('show');                
            } 
        });

        $('.header-search-icon').on('click', function(event){
            event.stopPropagation();
        });

        $('.header-search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.header-search-icon').on('click', function (event) {
            if(!$('.header-search-form').hasClass( "show" )) {
                $('.header-search-form').addClass('show');  
                event.preventDefault();                
            }
                
            else
                $('.header-search-form').removeClass('show');
                event.preventDefault();

        });
    };

    var tabs = function() {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function(e) {
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);
                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var flatPrice = function() {
        if( $().slider ) {
            $( function() {
                $( "#slide-range" ).slider({
                  range: true,
                  min: 0,
                  max: 120,
                  values: [ 30, 120 ],
                  slide: function( event, ui ) {
                    $( "#amount" ).html( "$" + ui.values[ 0 ]  + " - " + "$" + ui.values[ 1 ] );
                  }
                });
                $( "#amount" ).html( $( "#slide-range" ).slider( "values", 0 ) + "$" + " - " + $( "#slide-range" ).slider( "values", 1 ) + "$" );
            });
        }
    };

    var flatFilterBox = function(){
        $('.box-filter').hide();
        $('.show-filter').on('click',function(){
            $('.box-filter').slideToggle(1000);
            $('.filter-shop li.filter-list').toggleClass('active');
            $(this).toggleClass('active');
        });
        $('.box-filter .btn-close').on('click',function(){
            $('.box-filter').slideToggle(1000);
            $('.show-filter').removeClass('active');
            $('.filter-shop li.filter-list').removeClass('active');
        });
    };

    var headerFixed = function() {
        $('#header').each(function() {
            var nav = $('#header');
            $(window).on('load', function(){
                var header = $('#header');           
                var offsetTop = $('#header').offset().top;
                var headerHeight = $('#header').height();             
                var buffer  = $('<div>', { height: headerHeight }).insertAfter(header);   
                    buffer.hide();                 

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop  ) {
                        $('#header').addClass('fixed-header');
                        buffer.show();
                    } else {
                        $('#header').removeClass('fixed-header');
                        buffer.hide();
                    }
                });
            });
        });
    };

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header .container-header ').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');

                    var logo = $('.header-wrap-inner .header-top-logo');
                    $('.mobile-button').before(logo);
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.sub-menu').removeAttr('style');
                    $('#header .container-header ').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();

                    var logo = $('header.style1 .header-top-logo');
                    $('.header-top-info').before(logo);
                }
            }
        });

        $('.mobile-button').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    };

    var countDownTime =function () {
        $(".count-time").each(function() {
            var day = $(".count-time").data("day"),
                month = $(".count-time").data("month")-1,
                year = $(".count-time").data("year"),
                hour = $(".count-time").data("hour"),
                minute = $(".count-time").data("minute"),
                second = $(".count-time").data("second");
 
            var countDownDate = new Date(year,month,day,hour,minute,second).getTime();

            // Update the count down every 1 second
            var x = setInterval(function() {

                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                  var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                $(".days .numb").html(days);
                $(".hours .numb").html(hours);
                $(".minutes .numb").html(minutes);
                $(".seconds .numb").html(seconds);

                // If the count down is finished, write some text 
                if (distance < 0) {
                    clearInterval(x);
                    $(".days .numb").html("0");
                    $(".hours .numb").html("0");
                    $(".minutes .numb").html("0");
                    $(".seconds .numb").html("0");
                }
            }, 1000);
        });
    };

    var goTop =  function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var flatImagePopup = function(){
        if($().magnificPopup) {
            $('.flat-icon').each(function(){
                $(this).find('.zoom-popup').magnificPopup({
                    disableOn: 700,
                    type: 'image',
                    gallery:{
                        enabled: true
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true
                });
            });
        };
    };

    var zoomPic  = function(){
        $('.zoom-pic').each(function(){
            $('.zoom-pic').fancybox();
        });
    };

    var VideoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({ href: this.href, type: $(this).data("type") });
                return false   
        });
    };    

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg === 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };

    var flatGallery = function() {
        if ( $().owlCarousel ) {
            $('.themesflat-gallery').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    margin: gap,
                    nav: false,
                    thumb: true,
                    dots:false,
                    thumbImage: true,
                    navigation : false,
                    pagination: false,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };  

    var flatProgressBar = function() {
        if ( $().waypoint ) {
            $('.progress-bg').on('on-appear', function() {
                $(this).each(function() {
                    var percent = parseInt($(this).data('percent'));

                    $(this).find('.progress-animate').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");

                    $(this).parent('.themesflat-progress').find('.perc').addClass('show').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");
                });
            });
        }
    };

    var accordionToggle = function() {
        $('.flat-question').each(function () {
            var speed = {duration: 400};
            $('.flat-question .toggle-content').hide();
            $('.flat-question .accordion-toggle .toggle-title.active').siblings('.toggle-content').show();
            $('.flat-question .accordion').find('.toggle-title').on('click', function() {
                $(this).toggleClass('active');
                $(this).closest('.accordion').find('.accordion-toggle').removeClass('active');
                $(this).closest('.accordion-toggle').toggleClass('active');
                $(this).next().slideToggle(speed);
                $(".flat-question .toggle-content").not($(this).next()).slideUp(speed);
                if ($(this).is('.active')) {
                    $(this).closest('.accordion').find('.toggle-title.active').toggleClass('active');
                    $(this).toggleClass('active');
                };
            });
        });
    };

    var flatCounter = function() {
        $('.counter').on('on-appear', function() { 
            $(this).find('.numb-count').each(function() { 
                var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                }
            });
       });
    };

    var parallax = function() {
        if ( $().parallax && isMobile.any() === null ) {
            $('.parallax1').parallax("50%", -0.65); 
            $('.parallax2').parallax("50%", 0); 
            $('.parallax3').parallax("50%", -0.5); 
            $('.parallax4').parallax("50%", -0.5);
            $('.parallax5').parallax("50%", -0.5);
            $('.parallax6').parallax("50%", -0.5);
            $('.parallax7').parallax("50%", -0.9);
            $('.parallax12').parallax("50%", -0.5);
            $('.parallax13').parallax("50%", -0.5);
            $('.parallax16').parallax("50%", -0.5);
        }
    };

    var contentBox = function() {
        $(window).on("load resize", function () {
            $(".content-box").each(function() {
                var $this = $(this),
                    padding =  $this.data( 'desktop_padding' ),
                    margin =  $this.data( 'desktop_margin' );
                if ( matchMedia( 'only screen and (max-width: 1366px)' ).matches ) {
                    padding =  $this.data( 'mdesktop_padding' );
                    margin =  $this.data( 'mdesktop_margin' );
                }
                if ( matchMedia( 'only screen and (max-width: 1024px)' ).matches ) {
                    padding =  $this.data( 'sdesktop_padding' );
                    margin =  $this.data( 'sdesktop_margin' );
                }
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                    padding =  $this.data( 'mobile_padding' );
                    margin =  $this.data( 'mobile_margin' );
                }
                if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                    padding =  $this.data( 'smobile_padding' );
                    margin =  $this.data( 'smobile_margin' );
                }
                
                $this.css({ "padding" : padding , "margin" : margin });
            });
        });        
    }; 

    var spacer = function() {
        $(window).on("load resize", function () {
            $(".spacer").each(function() {
                var $this = $(this),
                    height = $this.data('desktop_height');
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                    height = $this.data('mobile_height');
                }
                if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                    height = $this.data('smobile_height');
                }
                $this.css( "height", height+"px");
            }); 
        });      
    }; 

    var flatFilterPrice = function() {
        if( $().slider ) {
            $( ".price_slider" ).slider({
                range: true,
                min: 50,
                max: 600,
                values: [ 50, 500 ],
                slide: function( event, ui ) {
                    $(".price_label > #min_price").val("$" + ui.values[0]);
                    $(".price_label > #max_price").val("$" + ui.values[1]);
                }
            });
            $(".price_label > #min_price").val("$" + $( ".price_slider" ).slider( "values", 0 ));
            $(".price_label > #max_price").val("$" + $( ".price_slider" ).slider( "values", 1 ));
        }
    };

    var canvasMobi = function () {
        $(window).on("load resize", function () {
            if ($('#header').hasClass('style2')) {                
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                    var hasChildMenu = $('#nav-mobi .menu').find('li:has(ul)');
         
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.mobile-button').on('click', function() {
                        $('body').toggleClass('canvas-mb-active');
                    });

                    $(document).on('click', '#nav-mobi li .btn-submenu', function(e) {
                        $(this).toggleClass('active').next('ul').slideToggle(300);
                        e.stopImmediatePropagation();
                    });

                    $('.panel-overlay').on('click', function() {
                        $('body').removeClass('canvas-mb-active');
                        $('.mobile-button').removeClass('active');
                    });

                    $('.wrap-canvas-menu .side-nav-panel-close').on('click', function() {
                        $('body').removeClass('canvas-mb-active');
                        $('.mobile-button').removeClass('active');
                    });
                }                
            }
        });
    }

    var testimonialCarousel = function() {   
        $(".themesflat-testimonials-slider").each(function(){
            var $this = $(this);
            $this.find(".testimonial-content").each(function(){
                
                var $_this = $(this);
                var a = "<li>"+$_this.html()+"</li>";
                $_this.html('');
                $this.find('#slider-testimonial .slides').append(a);  
            })
            $('#nav-testimonial').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 130,
                directionNav:false,
                itemMargin: 21,
                asNavFor: '#slider-testimonial'
            });

            $('#slider-testimonial').each(function () {
                var $this = $(this),nav,dots;
                nav = $this.data('nav');
                dots = $this.data('dots');

                $('#slider-testimonial').flexslider({
                    animation: "slide",
                    controlNav:dots ,
                    animationLoop: false,
                    slideshow: false,
                    directionNav:nav,
                    sync: "#nav-testimonial",
                    prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                    nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                });
            });            
        })
    }; 

    var flatRetinaLogo = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
        var $logo = $('#logo img');
        var $logo_retina = $logo.data('retina');

        if ( retina && $logo_retina ) {
            $logo.attr({
                src: $logo.data('retina'),
                width: $logo.data('width'),
                height: $logo.data('height')
            });
        } 
    };

    var removePreloader = function() {        
        $(window).on("load", function () {
            if($('.preloader').length){
                $('.preloader').delay(400).fadeOut(600);
            }
        });
    };

    $(function() {
        flatPrice();        
        flatCounter();
        tabs();        
        flatFilterBox();
        flatIsotope();
        searchIcon();
        goTop();
        VideoPopup();
        countDownTime();
        googleMap();
        responsiveMenu();
        headerFixed();
        flatImagePopup();
        inViewport();
        zoomPic();
        flatGallery();
        ajaxContactForm();        
        flatProgressBar();
        accordionToggle();
        contentBox();
        spacer();
        flatFilterPrice();
        canvasMobi();
        testimonialCarousel();
        flatRetinaLogo();
        $( window ).on( "load", function() {
            flatOwl();
            parallax();
            inViewport();
        });
        removePreloader();        
    });
})(jQuery);