$(document).ready(function(){
    var api_key = "563492ad6f917000010000018046cdcf27ad49f5ad3bd77b16d40700"

    $("#form").submit(function(){      
        event.preventDefault();
        $('#image_container').empty();

        var search_keyword = $("#search_bar").val()     
        imageSearch(search_keyword)
    })

    function imageSearch(search_keyword) {
        url = "https://api.pexels.com/v1/search/?page=1&per_page=80&query="+search_keyword
        $.ajax({
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader ("Authorization", api_key)
            },
            url: url,
            success: function(data){
                if(data.total_results == 0){
                    $('#image_container').append('No Results Found')
                }
                else{
                    data.photos.forEach(photo => {    
                        image = `                     
                            <div class="card">
                                <img data-toggle="modal" data-target="#zoom_image" class="card-img-top" src="${photo.src.medium}" data-src="${photo.src.original}">
                                <div class="card-body">
                                    <a target="_blank" rel="noopener noreferrer" href="${photo.photographer_url}"><small>Photographer: ${photo.photographer}</small></a>
                                </div>
                            </div>
                               `
                        $('#image_container').append(image);
                    });
                }
            }, 
            error: function(error){
                console.log(error);    
            }
        });
    }
});

$(function(){
    $('#zoom_image').on('show.bs.modal', function (e) {
       var src = $(e.relatedTarget).attr('data-src');
       $(this).find('#zoom_image_body > img.image_modal').attr('src', src);
    });
});


