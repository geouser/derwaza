// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    $('h1:has(span)').addClass('ornamentTop');
    $('h1, .subtitle, .offer').addClass('is-visible');
    if( $( "#accordion").length > 0 ) {
         $( "#accordion" ).accordion({ heightStyle: "content"  });
    }

    $('.down').click(function() {
        $('html, body').animate({
            scrollTop: $('#anchor').offset().top 
        }, 800);
        return false;
    });

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    $('.offer__slider').slick({
        fade: true,
        arrows: false,
        dots: true,
        speed: 700,
        autoplay: true,
        pauseOnFocus: false
    });

    /*----------------------------
                              Media slider
    -------------------------*/
    $('.media-slider').slick({
        arrows: true,
        dots: false
    });


     /*----------------------------
                              Media slider
    -------------------------*/
    if ( $('#datepicker').length > 0) {
        $('#datepicker').datepicker({
            firstDay: 1,
            minDate: 0
        });
        $("#datepicker").datepicker('setDate', new Date());
    }


     /*----------------------------
                              Select
    -------------------------*/
    $('.select').on('click', function(event) {
        event.preventDefault();

        var active = $(this).hasClass('active');

        if ( active ) {
            $(this).removeClass('active');
            $(this).find('.dropdown').slideUp('fast');   
        } else {
            $('.select').removeClass('active');
            $('.select .dropdown').slideUp('fast');
            $(this).addClass('active');
            $(this).find('.dropdown').slideDown('fast'); 
        }      
    });

    $('.select input').each(function(index, el) {
        $(this).val( $(this).siblings('.dropdown').find('.dropdown-item').first().text() );
    });

    $('.dropdown-item').on('click', function(event) {
        event.preventDefault();
        var val = $(this).text();
        var input = $(this).parent().siblings('input');

        input.val(val);
    });

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });



    /*----------------------------
                              Google map
    -------------------------*/
    /*---------------------------
                                GOOGLE MAP
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = 40.34503137704171;
        var long = 49.838739931583405;

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);


        var mapOptions = {
            center: mapCenterCoord,
            zoom: 17,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Park Bayil"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( $('#map_canvas').length > 0) {
        //googleMap_initialize();   
    }



}); // end file