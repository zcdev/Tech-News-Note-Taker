function scrapeArticles() {
  $.ajax({
    dataType: 'json',
    url: "/scrape"
  }).then(function(data) {
  });
}

function displayArticles() {
    $.ajax({
      dataType: 'json',
      url: "/articles"
    }).then(function(data) {
        for (var i = 0; i < data.length; i++) {
          $("#articles").append("<div id='item' data-id='" + data[i]._id + "'><h2>" + data[i].title + "</h2><a href='" + data[i].link + "'target='_blank'>" + data[i].link + "</a><br><button id='writenote' class='btn btn-primary'>Write Note</button></div>");
        }
  });
}

$(document).on("click", "#scrape", function() {
  $("#articles").empty();
  scrapeArticles();
  displayArticles();
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
  });

});

$(document).on("click", "#deletenote", function(){
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId
  }).then(function(data){
    $("#" + thisId).remove();
  });

  $("#bodyinput").val("");
});
