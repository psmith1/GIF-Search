$(function() {
    populateButtons(searchArray, 'searchButton', '#buttons-area');
    console.log("Page loaded");
})

let searchArray = ['happy', 'sad', 'confused'];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (let i=0;i<searchArray.length;i++) {
        const a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function() {
    let type = $(this).data('type');
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=0OvhzexLRZYqzI6rrYW0H6JotUZ0umo4&limit=10";
    console.log(type);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        for (let i=0;i<response.data.length;i++) {
            let searchDiv = $('<div class="search-item">');
            let rating = response.data[i].rating;
            let p = $('<p>').text('Rating: ' + rating);
            let animated = response.data[i].images.fixed_height.url;
            let still = response.data[i].images.fixed_height_still.url;
            let image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
            console.log(response);
        }
    })
})

$(document).on('click', '.searchImage', function(){
    let state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSearch').on('click', function(){
    let newSearch = $('input').eq(0).val().trim();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttons-area');
    return false;

});