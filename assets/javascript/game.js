$(document).ready(function () {
    var topics = ["Jean Grey", "Cyclop", "Emma Frost", "Wolverine", "Kitty Pryde", "Psylocke", "Magneto", "Rogue X-Men", "Gambit X-men", "Phoenix X-Men", "Nightcrawler X-Men", "Cable X-Men", "Beast X-Men", "Storm X-Men", "Jubilee", "Deadpool", "Cable X-Men", "Iceman X-Men"];

    for (var i = 0; i < topics.length; i++) {

        var topicName = topics[i];

        var a = $("<button>");

        a.attr("id", topics[i]);
        a.attr("class", "btn btn-danger");
        a.attr("data-name", "xmenListButton");
        a.attr("data-state", "still");
        a.text(topics[i]);
        $("#gifButtons").append(a);
    }
    var e = $("<img>");
    e.attr("src", "assets/images/x-men-logo.png");
    e.attr("id", "logo");
    $("#addNewButton").append(e);

    $("#addNewButton").append("<br>Add Your Favorite X-men");

    var b = $("<input>");
    b.attr("type", "text");
    b.attr("id", "inputNewChar");
    b.attr("class", "form-control");
    $("#addNewButton").append(b);

    var c = $("<button>");
    c.text("Submit");
    c.attr("id", "submitButton");
    c.attr("class", "btn btn-light");
    $("#addNewButton").append(c);

    function displayGifs(gifName) {
        $("#gifLocation").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g3neJMyuel6o6FgT28j3YV2RWZJbyZI1&q=" + gifName + "&limit=20& offset=0&rating=R&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
           
            for (var i = 0; i < 20; i++) {
                //console.log(response);
                
                var g = $("<figure>");
                var p = $("<figcaption>").text("Rating: " + response.data[i].rating.toUpperCase());
                var f = $("<img>");
                f.attr("class", "gif");
                f.attr("src", response.data[i].images.original_still.url);
                f.attr("data-state", "still");
                f.attr("data-animate", response.data[i].images.original.url);
                f.attr("data-still", response.data[i].images.original_still.url);
                f.attr("rating", response.data[i].rating);
                g.append(f);
                g.append(p);
                $("#gifLocation").append(g);
               
            }
        });

    }
    displayGifs("X-Men");

    $(document).on("click", ".btn-danger", function () {
        displayGifs(this.id);
    });

    $("#submitButton").on("click", function () {
        var newButtonName = $("#inputNewChar").val();

        var d = $("<button>");
        d.attr("id", newButtonName);
        d.attr("class", "btn btn-danger");
        d.attr("data-name", "xmenListButton");
        d.text(newButtonName);
        $("#gifButtons").append(d);

    });
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