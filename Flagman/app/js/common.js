/**
 * Created by Serg on 13.02.2017.
 */

$(document).ready(function () {
       $(".toggle-mnu").click(function () {
        $(this).toggleClass("on");
        $(".topMnu").slideToggle();
        return false;
    });

    $("a.anchor").click(function(i) {
        i.preventDefault();
        var target = $($(this).attr("href"));
        $("html, body").animate({ scrollTop: (target.position().top -90)}, 1000);
        $(".topMnu").slideUp(300);
        $(".toggle-mnu").removeClass("on");
    });

    $("#slider").slider({
        value: 1,
        min: 1,
        max: 1000,
        slide: function(event, ui) {
            var flex = 211 * ui.value;
            var mineral = 1200 * ui.value;
            var poly = 1000 * ui.value;

            $('.resMeter').html((ui.value + ' <span>m</span>').replace(/\d(?=(?:\d{3})+(?:\D|$))/g, '$& '));
            $('.summFlex').text((flex + ' рублей').replace(/\d(?=(?:\d{3})+(?:\D|$))/g, '$& '));
            $('.mineral').text((mineral + ' рублей').replace(/\d(?=(?:\d{3})+(?:\D|$))/g, '$& '));
            $('.uretan').text((poly + ' рублей').replace(/\d(?=(?:\d{3})+(?:\D|$))/g, '$& '));
        }
    });
        
    $(".but-advantage").click(function () {
        $(".but-advantage").removeClass("active-advantage");
        $(this).addClass("active-advantage");
        var atribute = '.advantage-' + $(this).attr('data-advantage');
            $(atribute).fadeIn(300).addClass('active').siblings('.active').fadeOut(300).removeClass('active');
    });

    $(".link-catalog").click(function () {
        $(".link-catalog").removeClass("active-link-catalog");
        $(this).addClass("active-link-catalog");
        var atribute = '.catalog-' + $(this).attr('data-catalog');
        $(atribute).slideDown(500).addClass('active').siblings('.active').slideUp(500).removeClass('active');
    });

    $('.but-indicator').click(function() {
        $('.but-indicator').removeClass('active-indicator');
        $(this).addClass('active-indicator');
        var atribute = '.ind-' + $(this).attr('data-indicator');
        $(atribute).fadeIn(300).addClass('active').siblings('.active').fadeOut(300).removeClass('active');
    });

    /*------- active link and switch accessories -------*/
    $('.link-cat').click(function() {
        $('.link-cat').removeClass('active-link-catalog');
        $(this).addClass('active-link-catalog');
        var selector = '.cat-' + $(this).attr('data-cat');
        $(selector).slideDown(300).addClass('active').siblings('.active').slideUp(300).removeClass('active');
    });

    /*---------- clock on More catalog -----------*/
    $('a.link-pro').click(function() {
        if ($(this).closest('.desc-cat').hasClass('opened')) {
            $(this).text('Подробнее');
        } else {
            $(this).text('Свернуть');
        }
        $(this).closest('.desc-cat').toggleClass('opened').find('.none').slideToggle(300);
    });

    /*---------- clock on More accessories -----------*/
    $('a.more').click(function() {
        // $('.none').slideUp(300);
        if ($(this).closest('.text-acces').hasClass('opened')) {
            $(this).text('Подробнее');
        } else {
            $(this).text('Свернуть');
        }
        $(this).closest('.text-acces').toggleClass('opened').find('.none').slideToggle(300);
    });

    /*------- active link and switch project -------*/
    $('.link-project').click(function() {
        $('.link-project').removeClass('active-link-project');
        $(this).addClass('active-link-project');
        var selector = '.project-' + $(this).attr('data-project');
        $(selector).slideDown(300).addClass('active').siblings('.active').slideUp(300).removeClass('active');
    });

    $('.clearable').on('click', function() {
        $(this).closest('label').find('input').val('').focus();
        $(this).closest('label').removeClass('red');
    });

    $(".top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
//*****ANIMATION

    $(".section-head h2, .section-head p").animated("fadeIn");
    $(".work").animated("zoomIn");

    $(".buttons").click(function() {
        $("#callback h2").html($(this).text());
        $("#callback input[name=formname]").val($(this).text());
    }).magnificPopup({
        type:"inline",
        mainClass: '.mfp-forms'
    });

    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
    $(".myForm").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("Спасибо за заявку!");
            setTimeout(function() {
                $.magnificPopup.close();
                $(".myForm").trigger("reset");
            }, 1000);
        });
        return false;
    });
});


// AIzaSyC3RWNwiV_X5RZMCeD-DsYirVphUJ6HwY8

