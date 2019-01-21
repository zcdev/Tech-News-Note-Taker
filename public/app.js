$(document).on("click", "#scrape", function() {
  $("#main").html("<div id='articles'></div>");
  $.ajax({
    dataType: 'json',
    url: "/articles"
  })
  .then(function(data) {
    console.log(data);
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div id='item' data-id='" + data[i]._id + "'><h2>" + data[i].title + "</h2><a href='" + data[i].link + "'>"+ data[i].link +"</a></div>");
    $("#articles").append("<button data-id='" + data._id + "' id='writenote'>Write Note</button>");
  }
  $('#popMessage').modal('show');
  $("#notes").html("<h4>News Scrapped!</h4>");
});
});

$(document).on("click", "#writenote", function() {
  $("#notes").empty();
  $('#popMessage').modal('show');
  
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h4>Your Notes</h4>");
      $("#notes").append("<div class='form-group'><textarea id='bodyinput' name='body' class='form-control'></textarea></div>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
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
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function(){
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId
  }).then(function(data){
    console.log(data);
    $("#" + thisId).remove();
  })
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
