$(document).ready(function () {
    var topics = ["Jean Grey", "Cyclop X-Men", "Emma Frost", "Wolverine", "Kitty Pryde", "Psylocke", "Magneto", "Rogue X-Men", "Gambit X-men", "Phoenix X-Men", "Nightcrawler X-Men", "Cable X-Men", "Beast X-Men", "Storm X-Men", "Jubilee", "Iceman X-Men"];
//preloads the page buttons
    for (var i = 0; i < topics.length; i++) {

        var topicName = topics[i];

        var buttonInsert = $("<button>");

        buttonInsert.attr("id", topics[i]);
        buttonInsert.attr("class", "btn btn-danger");
        buttonInsert.attr("data-name", "xmenListButton");
        buttonInsert.attr("data-state", "animate");
        buttonInsert.text(topics[i]);
        $("#gifButtons").append(buttonInsert);
    }
    //creates textbox and submit button
    var logoInsert = $("<img>");
    logoInsert.attr("src", "assets/images/x-men-logo.png");
    logoInsert.attr("id", "logo");
    $("#addNewButton").append(logoInsert);

    $("#addNewButton").append("<br>Add Your Favorite X-men");

    var textBoxInsert = $("<input>");
    textBoxInsert.attr("type", "text");
    textBoxInsert.attr("id", "inputNewChar");
    textBoxInsert.attr("class", "form-control");
    $("#addNewButton").append(textBoxInsert);

    var submitButtonInsert = $("<button>");
    submitButtonInsert.text("Submit");
    submitButtonInsert.attr("id", "submitButton");
    submitButtonInsert.attr("class", "btn btn-light");
    $("#addNewButton").append(submitButtonInsert);
//ajax request to giphy api and fills page with gifs
    function displayGifs(gifName, numLimit) {
        $("#gifLocation").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g3neJMyuel6o6FgT28j3YV2RWZJbyZI1&q=" + gifName + "&limit=" + numLimit + "& offset=0&rating=R&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < numLimit; i++) {
                var figInsert = $("<figure>");
                var textRatingInsert = $("<figcaption>").text("Rating: " + response.data[i].rating.toUpperCase());
                var imageInsert = $("<img>");
                imageInsert.attr("class", "gif");
                imageInsert.attr("src", response.data[i].images.original.url);    //edit to change to start with still
                imageInsert.attr("data-state", "animate");                        //edit to change to start with still
                imageInsert.attr("data-animate", response.data[i].images.original.url);
                imageInsert.attr("data-still", response.data[i].images.original_still.url);
                imageInsert.attr("rating", response.data[i].rating);
                figInsert.append(imageInsert);
                figInsert.append(textRatingInsert);
                $("#gifLocation").prepend(figInsert);
                oldId = gifName;
            }
        });

    }
    displayGifs("X-Men Cosplay", 10);
//adds more gif to the page if same button is selected    
    var sameButtonCount = 1;
    var oldId;
    $(document).on("click", ".btn-danger", function () {
        if (oldId === this.id){
            sameButtonCount++;
        }
        else {
            sameButtonCount = 1;
        }
        if (sameButtonCount === 1) {
            displayGifs(this.id, 10);
            
        }
        else if ((sameButtonCount > 1) && (this.id === oldId)){
            displayGifs(this.id, (10 * sameButtonCount));
        }      
    });
//creates new searchable content button to the top of the page
    $("#submitButton").on("click", function () {
        var newButtonName = $("#inputNewChar").val();
        var newButtonInsert = $("<button>");
        newButtonInsert.attr("id", newButtonName);
        newButtonInsert.attr("class", "btn btn-danger");
        newButtonInsert.attr("data-name", "xmenListButton");
        newButtonInsert.text(newButtonName);
        $("#gifButtons").append(newButtonInsert);
    });
//controls the pause/play of the gif
    $(document).on("click", ".gif", function () {           
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var stopAnimate = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", stopAnimate);
            $(this).attr("data-state", "still");
        }
    });
});