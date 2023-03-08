// First off, check index.js is connected to index.html
console.log("js is working");

// CUSTOM FUNCTIONS

function showAllNotes(data) {
  // Assign a variable to the empty 'Expense type' column in the 'Spending dashboard'
  let notesElement = document.getElementById("notes");
  //  Assign a variable to a new object that contains only the opening tag of an HTML div
  let notesHTML = `<div>`;
  // Loop through each of the user's exenses. These are the array items in the data object
  data.forEach(function (moodItem) {
    //  Prepare to show each  expense (type) in newly created divs. Update the variable for the new div object so that during each loops, the existing object remains, but a new div is appended to show the expense (type) from the user's expense (array item) that is currently being looped through. The expense (type) value will show inside the newly appended div.
    notesHTML = notesHTML + `<div>${moodItem.notes}</div>`;
  });
  // Add a closing div tag to the end of the newly created div that contains all the individual loops' expense values.
  notesHTML = notesHTML + `</div>`;
  // Put all the expense values into the frontend, by putting in the newly created and updated object.
  notesElement.innerHTML = notesHTML;
  // Print that object on the console for debugging.
  // console.log(expenseHTML);
}

function showAllTypes(data) {
  let typesElement = document.getElementById("types");
  let typesHTML = `<div>`;
  data.forEach(function (moodItem) {
    moodItem.moodName.forEach(function (item) {
      typesHTML = typesHTML + `<div>${item}</div>`;
    });
  });
  typesHTML = typesHTML + `</div>`;
  typesElement.innerHTML = typesHTML;
}

function showAllWhatHappened(data) {
  let whatHappenedElement = document.getElementById("what");
  let whatHappenedHTML = `<div>`;
  data.forEach(function (moodItem) {
    console.log(moodItem.category);
    whatHappenedHTML = whatHappenedHTML + `<div>${moodItem.category}</div>`;
  });
  whatHappenedHTML = whatHappenedHTML + `</div>`;
  whatHappenedElement.innerHTML = whatHappenedHTML;
}

function showAllDates(data) {
  let datesElement = document.getElementById("dates");
  let datestHTML = `<div>`;
  data.forEach(function (moodItem) {
    datestHTML = datestHTML + `<div>${moodItem.date}</div>`;
  });
  datestHTML = datestHTML + `</div>`;
  datesElement.innerHTML = datestHTML;
}

// Retrieve the user's expenses from the database
function retrieveMoods() {
  // Fetch the file containing the user's responses to the 'Add an expense' form. This is first retrieved from the cloud database and then hosted on a local server as an API, using a middleware function.
  fetch("http://localhost:3000/moods/list")
    // Convert the fetched response to a JSON format.
    .then((res) => res.json())
    // Pass this JSON response through my custom function
    .then((data) => {
      console.log(data);
      // See the user's expenses in JSON format in a table in the console so I can debug
      console.table(data);
      // Call custom functions that will put the user's responses about expense types, $$, amounts and notes into the frontend (in the 'Spending dashboard')
      showAllDates(data);
      showAllTypes(data);
      showAllWhatHappened(data);
      showAllNotes(data);
    });
}

// Show the 'Add' button on the main dashboard after the user clicks the 'Add Expense' button in the 'Add an expense' popup
function showAddButton() {
  // Check the function has been called
  // console.log("show Add button has been called");
  // Assign a variable within this function scope to the 'Add' button wrapper
  let addButtonWrap = document.getElementById("addButtonWrap");
  //  Change the CSS display setting to show the 'Add' button on the dashboard
  addButtonWrap.style.display = "flex";
}

//  Hide the 'Add' popup on the dashboard when the 'Add' button is clicked
function hidePopUp() {
  // Assign a variable name to the div wrapping the 'Add an expense' popup
  let popUpWrap = document.getElementById("popUpWrap");
  // Hide the popup by changing its wrapper's CSS display setting
  popUpWrap.style.display = "none";
  showAddButton();
}

// Show the 'Add an Expense' popup on the dashboard when the 'Add' button is clicked
function showPopUp() {
  // Assign a variable name to the div wrapping the 'Add an expense' popup
  let popUpWrap = document.getElementById("popUpWrap");
  // Show the popup by changing its wrapper's CSS display setting
  popUpWrap.style.display = "flex";
}

// Hide the 'Add' button when it is clicked
function handleAddButtonClick() {
  // Check the function has been called
  // console.log("You clicked the add button");
  // Assign a variable to the 'Add' button wrapper
  let addButtonWrap = document.getElementById("addButtonWrap");
  // Hide the 'Add' button by changing its wrapper's CSS display setting
  addButtonWrap.style.display = "none";
  // Call a function to show the popUp wrapper
  showPopUp();
}

// LISTENERS ON THE HOME PAGE

// Set the 'Add' button (on the main dashboard) to call a function when it is clicked
let addButton = document.getElementById("addButton");
addButton.addEventListener("click", handleAddButtonClick);

// Set the 'Add' button (inside the  popup) to call a function when it is clicked
let addMoodButton = document.getElementById("finalSubmit");
addMoodButton.addEventListener("click", hidePopUp);

//  Set the 'Show dogMoods' button (on the main dashboard) to call a function when it is clicked
document.getElementById("showButton").addEventListener("click", retrieveMoods);
