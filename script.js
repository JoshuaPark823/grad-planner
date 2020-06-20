/*
    TO DO:
        - Refactor code applying jQuery API
        - Finish adding all of the button functionalities
        - Refactor with improved readability like arrow functions, function inputs, etc
        - Clear whitespace and make comments consistent
        - Add a "Dark Mode" option
*/

// global variables of the working student
var earnedCredits = 0;
var requiredCredits = 0;
var numSemesters = 1;

// for now we're hard coding in a shit ton of empty semesters
var matrix = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

// updates earned credits
function updateEarned(input) {
    earnedCredits = input;
}

// updates requried credits
function updateRequired(input) {
    requiredCredits = input;
}

// submission function: creates the student elemenet and initializes its fields
// fades out the content-container element
// fades in the main content body
// changes the tab title
// calls the displayCredits() function
function submit() {

    updateEarned(parseInt(document.getElementById("earned-credits").value));
    updateRequired(parseInt(document.getElementById("required-credits").value));

    // logging their fields to the console for debugging 
    console.log(earnedCredits);
    console.log(requiredCredits);

    //fade out the entire element
    fadeOut(document.getElementById("content-container"));
    
    
    // triggers the fade in after 1000ms
    setTimeout(function(){
        fadeIn(document.getElementById("main-content"));
        document.getElementById("title").innerText = "build-gradPlanner.io";
    }, 1100);

    // displayCredits() needs to be called here, and doesn't work if it's called
    // through a script tag in the "display-credits" div (HTML), no idea why
    displayCredits();
}

// function that just displays the credit information of the student 
function displayCredits() {

    console.log("earned and required values from displayCredits()");

    console.log(earnedCredits);

    document.getElementById("current-earned").innerText = earnedCredits;
    document.getElementById("creds-remaining").innerText = requiredCredits - earnedCredits;
}

// add course function: adds the inputted course into the lattice
// runs the calculations and updates the credit information
function addCourse() {
    // this is the course name that the student just inputted (in all caps)
    var input = document.getElementById("course-input").value.toUpperCase();

    // for debug
    console.log(earnedCredits);

    // pushes the course-input into the inner array element at numSemesters index
    // numSemesters == 1, pushes it into the first inner array
    // numSemesters == 2, pushes it into the second inner array, etc
    matrix[numSemesters - 1].push(input);

    console.log(matrix);

    console.log("creds before " + earnedCredits);
    earnedCredits = parseInt(earnedCredits) + 3; // for now hardcoding cred/course as 3
    console.log("credsafter " + earnedCredits);

    displayCredits(); // changes the display in real time

    // clear the input box
    document.getElementById("course-input").value = ""; 
}

// add semester function: increments the numSemesters val so addCourse() pushes to the next
// inner matrix element
function addSemester() {
    numSemesters++;
}

function displayMatrix() {

    //Always clear the matrix before displayMatrix() is called so there aren't any
    //overlap issues / repetition issues.

    // refers to the HTML node encasing the entire matrix
    var matrixNode = document.getElementById("semester-matrix");

    // iterate through the outer elements of the matrix
    for(var i = 0; i < numSemesters; i++) {

        var semesterNode = document.createElement("div"); // create a semesterNode div
        semesterNode.id = "semester" + i; // set the id to semester i
        semesterNode.className = "semester";
        semesterNode.style.height = "50px";
    
        // after the div is created, enter the course matrix but ONLY for the outer element at i
        // iterating through the inner courses at matrix[i][0 -> v]
        for(var v = 0; v < matrix[i].length; v++) {
            
            var courseNode = document.createElement("span");
            courseNode.id = "course" + v;
            courseNode.className = "course";

            // TO DO: .addEventListener() for onclick

            var text = document.createTextNode(matrix[i][v]);
            courseNode.appendChild(text); // append matrix[i][v] (course) to the span
            semesterNode.appendChild(courseNode); // append the span to the div
        }

        matrixNode.appendChild(semesterNode); // append the div to the matrix
    }
}

// function that clears the innerHTML of semester-matrix, making it empty
// called before every displayMatrix() call so that duplicates don't form
function clearDisplayMatrix() {
    document.getElementById("semester-matrix").textContent = "";
}

//function that clears the matrix
function clearMatrix() {

    var credPerCourse = 3; // hard coding credits per course as 3 right now
    var count = 0;

    for(var i = 0; i < matrix.length; i++) {
        for(var j = 0; j < matrix[i].length; j++) {
            count++;
        }
    }

    updateEarned(earnedCredits - count * credPerCourse);
    matrix = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    numSemesters = 1;
    clearDisplayMatrix();
    displayCredits();
}

// fade out function: fades out the input element
function fadeOut(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

// fade in function: fades in the input element
function fadeIn(element) {
    var op = 0.01;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

// smooth scrolling function between html elements
window.smoothScroll = function(target) {

    var scrollContainer = target;
    var inc = 3;

    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;

        //TO DO: Implement accelerating scrolling
        // this is the scrolling increment
        scrollContainer.scrollTop += inc;
        inc *= inc;

    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
