function scrapeArticles() {
$.ajax({
  dataType: 'json',
  url: "/scrape"
}).then(function(data) {
  console.log(data);
});
}

$("#main").html("<div id='articles'></div>");
function displayArticles() {
  $.ajax({
    dataType: 'json',
    url: "/articles"
  }).then(function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div id='item' data-id='" + data[i]._id + "'><h2>" + data[i].title + "</h2><a href='" + data[i].link + "'>" + data[i].link + "</a></div>");
    $("#articles").append("<button id='writenote'>Write Note</button>");
  }
});
}

scrapeArticles();
displayArticles();

$(document).on("click", "#scrape", function() {
  scrapeArticles();
  $('#popMessage').modal('show');
  $("#scrapped").show();
  $("#notes").hide();
});

$(document).on("click", "#writenote", function() {
  $('#popMessage').modal('show');
  $("#scrapped").hide();
  $("#notes").show();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {


      if (data.note) {
        $("#bodyinput").val(data.note.body);
      }

      console.log(data);
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $("#bodyinput").val().trim()
    }
  }).then(function(data) {
      console.log(data);
  });

});

$(document).on("click", "#deletenote", function(){
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId
  }).then(function(data){
    console.log(data);
    $("#" + thisId).remove();
  });

  $("#bodyinput").val("");
});
