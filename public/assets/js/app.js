// $.getJSON("/articles", (data) => {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//         // Display the apropos information on the page
//         $("#articleContainer").append("<div class='card'><h5 class='card-header'></h5><div class='card-body'><h5 class='card-title'>" + data[i].title + "</h5><p class='card-text'>" + data[i].link + "</p><<button type='button' class='btn btn-primary'>Article Notes</button><button type='button' class='btn btn-danger'>Delete From Saved</button></div></div>")

//     }
//     //^^ we are using a for loop here to get ALL of the articles
// });


$("#scrapeNav").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/articles"
    })
    .then(function(data) {
        console.log(data);
        alert("Articles have been scraped!!")
    })
    .catch(function(err) {
        console.log(err)
    });
});

$("#saveNav").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/savedArticles"
    }).then(function() {
        
    })
})

$(".btn-success").on("click", function() {
    var id = $(this).attr("data-id")
    // console.log(id);

    $.ajax({
        method: "POST",
        url: "/save/" + id
    }).then(function (data) {
        // console.log(data)
        // console.log(id);
        alert("This article has been saved.")
        // window.location.href("/save/" + id)
    })
})

// // Whenever someone clicks a p tag
// $(document).on("click", "p", function () {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     //^^empties out the form, builds form up, and populates it
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");

//     // Now make an ajax call for the Article
//     $.ajax({
//         method: "GET",
//         url: "/articles/" + thisId
//     })
//         //notice that we do not use a for loop here...we are passing an object
//         //to the one that matches the id--> we could work to find the specific article
//         //by doing a for loop here and just using find (as opposed to findOne) on the server side, but this would just be extra work
//         // With that done, add the note information to the page
//         .then((data) => {
//             console.log(data);
//             // The title of the article
//             $("#notes").append("<h2>" + data.title + "</h2>");
//             // An input to enter a new title
//             $("#notes").append("<input id='titleinput' name='title' >");
//             // A textarea to add a new note body
//             $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//             // A button to submit a new note, with the id of the article saved to it
//             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//             // If there's a note in the article
//             if (data.note) {
//                 // Place the title of the note in the title input
//                 $("#titleinput").val(data.note.title);
//                 // Place the body of the note in the body textarea
//                 $("#bodyinput").val(data.note.body);
//             }
//         });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function () {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");

//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//         method: "POST",
//         url: "/articles/" + thisId,
//         data: {
//             // Value taken from title input
//             title: $("#titleinput").val(),
//             // Value taken from note textarea
//             body: $("#bodyinput").val()
//         }
//     })
//         // With that done
//         .then((data) => {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#notes").empty();
//         });

//     // Also, remove the values entered in the input and textarea for note entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
// });
