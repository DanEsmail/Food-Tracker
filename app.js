
var query = '3lb carrots and a chicken sandwich';
var foodResults;
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

$(document).ready(function(){



  console.log(ctx);
  ctx.beginPath();
  ctx.moveTo(175,100);
  ctx.arc(175, 100, 80, 0.5 * Math.PI, 1.5 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(175,100);
  ctx.arc(175, 100, 80, 1.5* Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "Blue";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(175,100);
  ctx.arc(175, 100, 80, 2* Math.PI, 2.5 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.stroke();

})



function resultsParse(arr){

  for (var i = 0; i < arr["items"].length; i++) {
    $("#Cal-info").text("Calories: " + arr["items"][0]["calories"].toString());
    $("#Carb-info").text("Carbs: " + arr["items"][0]["carbohydrates_total_g"].toString()+"g");
    $("#Sugar-info").text("Sugar: " + arr["items"][0]["sugar_g"].toString()+"g");
    $("#serving-info").text("Serving: " + arr["items"][0]["serving_size_g"].toString()+"g");
    $("#protein-info").text("Protein: " + arr["items"][0]["protein_g"]);
    $("#Fat-info").text("Fat: " + arr["items"][0]["protein_g"].toString()+"g");
    $("#displayed-food").text(arr["items"][0]["name"]);



  }
}


$("button[name=search]").click(function(){
  query = $("input[name=search-field]").val();

  $.ajax({
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: { 'X-Api-Key': 'CcB1VW26JLsX9g8B6rR9IQ==gOje644eZjchTa5Q'},
      contentType: 'application/json',
      success: function(result) {
        console.log(result)
        resultsParse(result);
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
  });
});

/* test Data ----------------------------------------------------------

{items: Array(1)}
items: Array(1)
0:
calories: 44.7
carbohydrates_total_g: 10.1
cholesterol_mg: 0
fat_saturated_g: 0
fat_total_g: 0.2
fiber_g: 1.4
name: "onion"
potassium_mg: 35
protein_g: 1.4
serving_size_g: 100
sodium_mg: 2
sugar_g: 4.7
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
[[Prototype]]: Object b


*/
