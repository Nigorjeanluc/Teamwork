/* MODAL ONE*/

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var cancel = document.getElementsByClassName("cancel")[0];

// When the user clicks the button, open the modal
var i;
for (i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
        modal.style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
}

cancel.onclick = () => {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* MODAL TWO*/

// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementsByClassName("editBtn");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("editClose")[0];
var cancel2 = document.getElementsByClassName("editCancel")[0];

// When the user clicks the button, open the modal
var i;
for (i = 0; i < btn2.length; i++) {
    btn2[i].onclick = () => {
        modal2.style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
span2.onclick = () => {
    modal2.style.display = "none";
}

cancel2.onclick = () => {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}