/* MODAL ONE*/

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementsByClassName("myBtn");

// When the user clicks the button, open the modal
let i;
for (i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
        modal.style.display = "block";
    }
}



// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const cancel = document.getElementsByClassName("cancel")[0];
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
const modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
const btn2 = document.getElementsByClassName("editBtn");

// Get the <span> element that closes the modal
const span2 = document.getElementsByClassName("editClose")[0];
const cancel2 = document.getElementsByClassName("editCancel")[0];

// When the user clicks the button, open the modal
let ii;
for (ii = 0; ii < btn2.length; ii++) {
    btn2[ii].onclick = () => {
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