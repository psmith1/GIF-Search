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

$(document).on('click', 'searchImage', function(){
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









var topics = ["happy", "sad", "confused"]
var feeling;
var results;

function renderButtons() {

$("#buttons-view").empty();

    for (var i=0; i<topics.length; i++) {
        // Dynamically generate buttons for each feeling in the array
        var a = $("<button>");
    a.addClass("feeling");
    a.attr("data-feeling", topics[i]);
    a.text(topics[i]);
    console.log("you rendered something");
    $("#buttons-view").append(a);
    }
};
// Click event adds feeling input to "topics" array
$("#add-feeling").on("click", function(event) {
    event.preventDefault();

    var feeling = $("#feeling-input").val().trim();

    topics.push(feeling);
    renderButtons();
});


renderButtons();

$("button").on("click", function() {

    var feeling = $(this).attr("data-feeling");
    

// GIPHY API query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    feeling + "&api_key=0OvhzexLRZYqzI6rrYW0H6JotUZ0umo4&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
      .then(function(response) {
        console.log(queryURL);
        console.log(response);

        results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var feelingImage = $("<img>");
            feelingImage.attr("src", results[i].images.fixed_height.url);
            console.log(results[i]);
            gifDiv.append(p);
            gifDiv.append(feelingImage);
            
            $("#gifs-appear-here").prepend(gifDiv);
        };
    });
});

// TO PAUSE/PLAY GIFS: There are two links in the object returned by the GIPHY API that
// we wish to access. One is the at results[i].images.fixed_height_still.url
// and the other is at results[i].images.fixed_height.url. Utilizing an IF/ELSE statement, 
// one could alternate between loading these as the src returned in 