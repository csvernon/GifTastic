// Render Gifs
function render() {
  $('#gifColumn1').empty();
  $('#gifColumn2').empty();
  $('#gifColumn3').empty();
  var search = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    var data = response.data;

    // column 1
    for (var i = 0; i < 3; i++) {
      var gifDiv = $("<div>");
      var states = $('<img class = "col-12 gif">');
      var rating = data[i].rating;
      var p = $('<p id="white">').text("Rating: " + rating);
      states.attr('src', data[i].images.original_still.url);
      states.attr('data-still', data[i].images.original_still.url);
      states.attr('data-state', 'still');
      states.attr('data-animate', data[i].images.original.url);
      gifDiv.prepend(states);
      gifDiv.append(p);
      $('#gifColumn1').prepend(gifDiv);
    };

    // column 2
    for (var i = 3; i < 7; i++) {
      var gifDiv = $('<div class ="gifDivText">');
      var states = $('<img class = "col-12 gif">');
      var rating = data[i].rating;
      var p = $('<p id="white">').text("Rating: " + rating);
      states.attr('src', data[i].images.original_still.url);
      states.attr('data-still', data[i].images.original_still.url);
      states.attr('data-state', 'still');
      states.attr('data-animate', data[i].images.original.url);
      gifDiv.prepend(states);
      gifDiv.append(p);
      $('#gifColumn2').prepend(gifDiv);
    };

    // column 3
    for (var i = 7; i < 10; i++) {
      var gifDiv = $('<div class ="gifDivText">');
      var states = $('<img class = "col-12 gif">');
      var rating = data[i].rating;
      var p = $('<p id="white">').text("Rating: " + rating);
      states.attr('src', data[i].images.original_still.url);
      states.attr('data-still', data[i].images.original_still.url);
      states.attr('data-state', 'still');
      states.attr('data-animate', data[i].images.original.url);
      gifDiv.prepend(states);
      gifDiv.append(p);
      $('#gifColumn3').prepend(gifDiv);
    };


  })
}

// declare array
var actors = ['Heath Ledger', 'Mary Elizabeth Winstead', 'Olivia Munn', 'Matthew Mcconaughey', 'Christian Bale',
  'Mark Ruffalo', 'Jake Gyllenhaal', 'Joseph Gordon-Levitt', 'Ryan Gosling', 'Christoph Waltz', 'Scarlett Johansson'];

// Add buttons from array
function buttons() {
  for (var i = 0; i < actors.length; i++) {
    var buttons = $('<button id="button"></button>');
    buttons.attr('data-name', actors[i]);
    buttons.attr('value', actors[i]);
    buttons.text(actors[i]);
    $('#buttons').append(buttons);
  }
}

// Add users buttons to array
$("#addButton").on('click', function (event) {
  // ignore default text
  if ($("#Input").val() != "Add an Actor") {
    // ignore blank input
    if ($("#Input").val() != "") {
      $("#buttons").empty();
      event.preventDefault();
      var input = $("#Input").val()
      actors.push(input);
      buttons();
    }
  }
});

//Gif play and pause
$(document).on('click', '.gif', function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    // `this` is the img that I clicked on.
    // Turn that into a jquery object
    var imageIClickedOn = $(this);
    // Get the value of the data-animate attribute on the img I clicked on
    var animatedURL = imageIClickedOn.attr("data-animate");
    // Set the src attribute on the img I clicked on
    imageIClickedOn.attr("src", animatedURL);
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
$(document).on('click', '#button', render);
buttons();