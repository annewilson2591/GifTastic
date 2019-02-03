
//on form submit
$("#form").on("submit", function(event) {
    //prevent from reloading
    event.preventDefault();
    //input value
    var inputValue = $(".form-control").val().trim();
    console.log(inputValue)
    //create new button, append to current buttons
    var animalButton = $("<button>");
    
    //use text in button text 
    animalButton.text(inputValue);

    //assigning attributes to button
    animalButton.attr("class", "animal");
    animalButton.attr("data-animal", inputValue);
    $("#animal-list").append(animalButton);
    //click on new button, produce gif, follow rules below 
    
}) 
   ////***********////
    $(document).on('click', "button.animal", function(){

    var animal = $(this).attr("data-animal");
    console.log(animal);

    //URL to search giphy 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=D7Nq8d0sgNYBxPgM8ZpCS8gxqOCSN611&limit=10";

    console.log(queryURL);

    //AJAX request 
    $.ajax({
        url:queryURL, 
        method:'GET'
    })

        //after data comes back from API
        .then(function(response){
            console.log(response);
            //storing array of results
            var results = response.data;

            //looping over results
            for (var i = 0; i< results.length; i++) {
                
                //create div for the gif
                var gifDiv = $("<div>");

                //storing the result of item's rating
                var rating = results[i].rating;

                //creating an image tag
                var animalImage = $("<img>")

                //creating paragraph tag with rating
                var p = $("<p>").text("Rating: " + rating);

                //giving the image tag an src attribute of a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.addClass("gif-animal");

                //appending the paragraph and animalImage to the "givDiv"
                gifDiv.append(p);
                gifDiv.append(animalImage);

                //prepending the gifDiv to the div in HTML
                $("#gifs-here").prepend(gifDiv);
            }

            //on click
            $(document).on("click", ".gif-animal", function() {
                var state = $(this).attr("data-state");

                //update attr on click to pause and animate
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })  
        });
});
 

