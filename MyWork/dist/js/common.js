jQuery(document).ready(function(){
    $(".toggle-mnu").click(function () {
        $(this).toggleClass("on");
        $(".topMnu").slideToggle();
        return false;
    });

    $(".arrow").click(function () {
        $(".arrow").removeClass("active-arrow");
        $(this).parent(".item").children(".inf").slideToggle();
        $(this).addClass("active-arrow");
    });

    $(".slider").slick({
        dots: true
    });

    $( ".accordion" ).accordion({
        heightStyle: "content",
        active:false,
        collapsible: true,
        header:"h3"
    });


    $(".button").click(function() {
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