//API key 
//D7Nq8d0sgNYBxPgM8ZpCS8gxqOCSN611

//giphy parameters 
//https://developers.giphy.com/docs/


//event listener
$("button").on('click', function(){

    var animal = $(this).attr("data-animal");
    console.log(animal);
    
    //construcint URL to search giphy --- ******* needs to be https??
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=D7Nq8d0sgNYBxPgM8ZpCS8gxqOCSN611&limit=10";

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
                animalImage.attr("src", results[i].images.fixed_height.url);

                //appending the paragraph and animalImage to the "givDiv"
                gifDiv.append(p);
                gifDiv.append(animalImage);

                //prepending the gifDiv to the div in HTML
                $("#gifs-here").prepend(gifDiv);
            }
        });
});
//use a loop that appends each button for a string in the array

//on click, page grabs 10 static, non-animated gifs

//when user clicks the gif image - animate
//on second click - pause 

//display rating under the gif

//add a form to the page to take the value from a user input box and adds it to the topics array
//make a function that takes each topic in the array and remakes the buttons 