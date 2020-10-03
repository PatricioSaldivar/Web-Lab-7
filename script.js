$(document).ready(function() {

// Start your code from here

var temas = [
    "NFL",
    "NBA",
    "NHL",
    "MLB"
]
    const apiKey = "f2tvhmPOivtYY3exCNsZ5HJMI3GOSGlI"


    temas.forEach((element) => {
      $("#theme-buttons").append(
        `<button id="${element}" type="submit"> ${element} </button>`
      );
    });
  
 
  

  $("#theme-buttons").on("click", "button", (e) => {
      $("#gifs").empty();
    let request = {
      api_key: apiKey,
      q: e.target.id,
      limit: 10,
    };

    $.get("https://api.giphy.com/v1/gifs/search", request, function (
      data,
      status
    ) {
      data.data.forEach(g => {
        var item = $("<div>");
        item.addClass("item");
        item.append(
            `<label> Rating: ${g.rating} </label>`
        )
        var imagen = $("<img>");
        imagen.attr("src",g.images.fixed_height_still.url)
        imagen.attr("data-animacion",g.images.fixed_height.url)
        imagen.attr("data-still",g.images.fixed_height_still.url)
        imagen.attr("clicked","no")
        imagen.addClass("gif-item")
        item.append(imagen);
        $("#gifs").append(item);
      });
    });
  });


  $("#gifs").on("click",".gif-item", function(){
    var clicked = $(this).attr("clicked");
      
      if (clicked === "no") {
        $(this).attr("src", $(this).attr("data-animacion"))
        $(this).attr("clicked", "si");
      }
      
      else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-enMovimiento", "no"); 
      }
    });

    $("#add-theme").on("click", (e)=>{
        e.preventDefault();
        var name = ($("#theme-input").val())
        $("#theme-buttons").append(
            `<button id="${name}" type="submit"> ${name} </button>`);
        $("#theme-form").trigger("reset");
        
    });

});
