//Using array and a for loop to make a list from the items within the array

var items = [];
var i;
var text;
var len;

//Animation for search Button
function search() {
    var x = document.getElementById("searches");
    //If statement the allows the search bar to extent once clicked
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Adds items to the array
function trigger() {
    var data = document.getElementById("in1").value;
    //Pushes the value from in1 once the add button is clicked
    items.push(data);
    //Link to the check function
    check();
    //Link to the Prior function
    Prior();
}

//Can view the items on the array
function check() {
    //Is a for loop that gets the length/value of the input 
    for (i = 0, len = items.length, text = ""; i < len; i++) {
        // Has some CSS and tells you where the array will be display with two functional buttons 
        text += "<div class='col-xl-5 jumbotron bg-white text-black'>" + (i + 1) + " .  " + items[i] + "      " + "<button type='button' class='btn btn-success' onclick= 'Finish()'>✅</button>" + "      " + "<button type='button' class='btn btn-danger' onclick='remove()'>  ❌  </button>" + "</div>";
        //Will display the value in te current tasks section
        document.getElementById('imports').innerHTML = text;
    }
}

//Will added the items from the Current Tasks to the Prior Section
function Prior() {
    //Is a for loop that gets the length/value of the input 
    for (i = 0, len = items.length, text = ""; i < len; i++) {
        // Has some CSS and tells you where the array will be display 
        text += "<div class='col-xl-5 jumbotron bg-white text-black'>" + (i + 1) + " .  " + items[i] + "</div>";
        //Will display the value in te prior tasks section
        document.getElementById('priors').innerHTML = text;
    }
}

//Moves the item from the Current Tasks to the Finished Tasks when finshed
function Finish() {
    //Is a for loop that gets the length/value of the input 
    for (i = 0, len = items.length, text = ""; i < len; i++) {
        // Has some CSS and tells you where the array will be display with two functional buttons
        text += "<div class='col-xl-5 jumbotron bg-white text-black'> " + (i + 1) + " .  " + items[i] + "</div>";
        //Will display the value in te finished tasks section
        document.getElementById('finishes').innerHTML = text;
    }
}
//Removes the items from the array

function remove() {
    //Allows the user to delete from the to do list
    items.pop();
    check();

}