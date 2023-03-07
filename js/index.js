// First off, check index.js is connected to index.html
console.log("js is working");

// CUSTOM FUNCTIONS

// fetch endpoint =  moods/list

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
      // showAllExpenseTypes(data);
      // showAllExpenseAmounts(data);
      // showAllExpenseDates(data);
      // showAllExpenseNotes(data);
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
