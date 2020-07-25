// select elements & use constantly through code//
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("item");

// class names for task status in UI & for use in addToDo function
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables //
let LIST = [],
    id = 0;

// get the item from local storage //
let data = localStorage.getItem("TODO");

if (data) { //Check if if list has data
    LIST = JSON.parse(data);
    id = LIST.length; //Sets the id to the last one on list, so any addition items added come after
    loadList(LIST); //Loads the actual list to the UI
} else { //If data is empty id set as 0 for new items
    LIST = [];
    id = 0;
}

//load items to UI
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clears all the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//show date in header
const options = { weekday: "short", month: "long", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-UK", options);

//// Add a to do function for adding tasks & repeating
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    ////Iff trash false then run below code
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item =
        `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>`;

    //// Inserts new items to list after the last child inside element
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
} ///This challenge has been an absolute BALL-ACHE!!!

// add item when ENTER pressed ///// runs 'event' function which adds
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //if input empty returns false. If input  entered then run the addToDo function
        if (toDo) {
            addToDo(toDo, id, false, false);
            ////Adds tasks to list & sets id number, completion & trash status
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // adds item to local storage  (must be added whereever LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++; ////increments 'id'by 1 whenever new item added
        }
        input.value = ""; //// resets the text field to empty once items added
    }
});
// completeToDo function will run whenever user clicks on these buttons
function completeToDo(element) {
    element.classList.toggle(CHECK); //If check is in class list then will remove & add uncheck
    element.classList.toggle(UNCHECK); ///vice versa
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
} //// if item id number is 'done' then will be changing property value (previously stated in addToDo function)

//remove to do 
///if user clicks trash icon then changes trash property value declared in addToDo to true & removes parent element
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true; ////Man does my back hurt!!
}
//// target items created dynamically with click & runs function
list.addEventListener("click", function(event) {
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element); ////if icon clicked then runs completeToDo function for checking/unchecking
    } else if (elementJob == "delete") {
        removeToDo(element); /// if clicked then runs function removeToDo & deletes
    }
    // add item to local storage  (must be added whereever LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});