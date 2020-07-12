$(function(){
    $('#zoom_image').on('show.bs.modal', function (e) {
       var src = $(e.relatedTarget).attr('data-src');
       $(this).find('#zoom_image_body > img.image_modal').attr('src', src);
    });
});


