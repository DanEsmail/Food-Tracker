
var query = '3lb carrots and a chicken sandwich';
var foodResults;
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
foodArr = [];
var key =
var foodObj = {};
userInfo = {
  "name": "",
  "height": 0,
  "weight": 0,
  "age": 0,
  "gender": 0,
  "bmr": 0,
  "tdee": 0,
  "lossPct": 0,
  "activityLevel": 0

}






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

function getUserInfo(){
  var str = $("#user-info-form").serializeArray();
  return str;
}

function checkUserObj(obj){
  for (var variable in obj) {
    if (variable == 0 || variable == 5 || variable == 6) {
      if (obj[variable]["value"].length <0) {

        return false;
        }else{

      }
    }else if (!isNaN(obj[variable]["value"])&& obj[variable]["value"] !="") {
    }else if (variable > 6 ||variable ==0 ) {

    }else{

      return false;
    }
  }

  return true;
}


function parseUserInfo(obj){
  var user = {};
  console.log(obj)
  user["name"] = obj[0]["value"];
  user["age"] = parseInt(obj[1]["value"]);
  user["height"] = heightCovertor(obj[2]["value"],obj[3]["value"]);
  user["weight"] = weightConvertor(obj[4]["value"]);
  user["activity"] = activityLevel(obj[6]["value"]);
  user["gender"] = obj[5]["value"];
  user["lossPct"] = lossPercetFinder(obj[7]["value"]);


return user;



}

function lossPercetFinder(num){
  switch (parseInt(num)) {
    case 0.5:
      return 0.15;
      break;
    case 1:
      return 0.20;
      break;
    case 2:
      return 0.25;
      break;
    default:

  }
}

function bmrFomula (gender,weight,height,age){
  if (gender == "Male") {
    return 10*weight+6.25*height-5*age+5;
  }else{
    return 10*weight+6.25*height-5*age-161;
  }
}

function tdeeFomula(bmr,act){
  return bmr*act;
}

function weightConvertor(lbs){
  return lbs *0.453592;
}

function heightCovertor(feet,inches){
  console.log(feet)
  console.log(inches)

  var inchesTotal = (parseInt(feet) * 12) + parseInt(inches);
  console.log(inchesTotal)
  return inchesTotal * 2.54;
}

function activityLevel(str){
  switch (str) {
    case "Sedentary":
      return 1.2;
      break;
    case "Lightly Active":
      return 1.375;
      break;
    case "Moderately Active":
      return 1.55;
      break;
    case "Very Active":
      return 1.725;
      break;
    case "Extremely Active":
      return 1.9;
      break;
    default:

  }
}

function foodListUpdate(arr){
  var str = ""
  if (arr.length <2) {
    str = arr[0]["name"];
  }else{
    for (var i = 0; i < arr.length; i++) {
      str += arr[i]["name"] + ", "

  }
  console.lof(str)
  $("#food-list").text(str);

  }

}

$("button[name=submit-button]").on("click", function(){
  var userObj = getUserInfo();
  if (userObj.length === 8) {
    if (checkUserObj(userObj)) {
        $("#input-field").css("visibility", "hidden");
        var userObject = parseUserInfo(userObj)
        userObject["bmr"] = bmrFomula(userObject["gender"],userObject["weight"],userObject["height"],userObject["age"]);
        userObject["tdee"] = tdeeFomula(userObject["bmr"],userObject["activity"]);
        console.log(userObject);

    }
  }else{
    alert("Please Fill out the form");
  }

});

function resultsParse(arr){

  var obj = {
    "name": arr["items"][0]["name"],
    "carbs":arr["items"][0]["carbohydrates_total_g"],
    "protein":arr["items"][0]["protein_g"],
    "sugar":arr["items"][0]["sugar_g"],
    "calories":arr["items"][0]["calories"],
    "fat":arr["items"][0]["fat_total_g"],
  }

    $("#Cal-info").text("Calories: " + arr["items"][0]["calories"].toString());
    $("#Carb-info").text("Carbs: " + arr["items"][0]["carbohydrates_total_g"].toString()+"g");
    $("#Sugar-info").text("Sugar: " + arr["items"][0]["sugar_g"].toString()+"g");
    $("#serving-info").text("Serving: " + arr["items"][0]["serving_size_g"].toString()+"g");
    $("#protein-info").text("Protein: " + arr["items"][0]["protein_g"]);
    $("#Fat-info").text("Fat: " + arr["items"][0]["fat_total_g"].toString()+"g");
    $("#displayed-food").text(arr["items"][0]["name"]);
return obj;
}

$("button[name=Eat-button]").on("click",function(){
  if ($("#displayed-food").text().length>0) {

    foodArr.push(foodObj)
    foodListUpdate(foodArr);

  }
})

$("button[name=search]").click(function(){
  query = $("input[name=search-field]").val();

  $.ajax({
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: { 'X-Api-Key': key},
      contentType: 'application/json',
      success: function(result) {
        console.log(result)
        foodObj = resultsParse(result);

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
