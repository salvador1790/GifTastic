var queryURL;
var buttons = [];

function pushValueToArray() {

    var value = $("#input").val();
    buttons.push(value);
    console.log(buttons);
    $("#buttonsView").empty();
    for (var i = 0; i < buttons.length; i++) {
        var newButton = $('<input/>').attr({ type: 'button', value: buttons[i], class: "btn007" });
        newButton.attr("data-name", buttons[i]);
        newButton.appendTo("#buttonsView");
    }

    $(".btn007").on("click", function () {
        var keyword = $(this).attr("data-name")
        console.log(keyword);

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=xwqYvqzFELtq3Tld178aq1bwGuPS8BC8&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                var url = data[i].images.fixed_height_still.url;
                var img = $("<img>");
                img.attr("src", url);
                img.attr("class", "gif")
                img.attr("data-state", "still");
                img.attr("data-still", url);
                img.attr("data-animate", data[i].images.fixed_height.url);
                $("#gifsHere").append(img);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");

                }
            });

        })
    })

}




