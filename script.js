// Add a note function
const addNote = document.querySelector("#addNote");
const title = document.querySelector("#title");
const note = document.querySelector("#note");
const row = document.querySelector("#mainrow");
let titleArray = [];
let noteArray = [];

//Display notes
const display = () => {
  let html = "";
  for (let i = 0; i < titleArray.length; i++) {
    row.innerHTML = " ";
    const noteValue = noteArray[i];
    html += `<div class="col-md-4">
              <div class="card my-4" style="width: 18rem;">
                  <div class="card-body border border-3 border-dark rounded">
                      <h4 class="card-title">Title: ${titleArray[i]}</h4>
                      <p class="card-text h6">Note: ${noteValue}</p>
                      <a href="#" id= del${i} class="btn btn-dark">Delete</a>
                      <a href="#" id= edit${i} class="btn btn-dark">Edit</a>
                  </div>
              </div>
              </div>`;
    row.insertAdjacentHTML("afterbegin", html);
  }
};

if (localStorage.getItem("titles") && localStorage.getItem("notes")) {
  titleArray = JSON.parse(localStorage.getItem("titles"));
  noteArray = JSON.parse(localStorage.getItem("notes"));
  display();
}

// Add note
addNote.addEventListener("click", function (e) {
  e.preventDefault();
  addNote.blur();
  if (title.value == "" || note.value == "") {
    alert("Title/Note is emty");
    title.value = "";
    note.value = "";
  } else {
    titleArray.push(title.value);
    noteArray.push(note.value);
    localStorage.setItem("titles", JSON.stringify(titleArray));
    localStorage.setItem("notes", JSON.stringify(noteArray));
    const titles = JSON.parse(localStorage.getItem("titles"));
    const notes = JSON.parse(localStorage.getItem("notes"));
    display();
    title.value = "";
    note.value = "";
  }
});

// Delete note

row.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn")) {
    let btnDel = e.target.id;
    if (btnDel.includes("del")) {
      let del =
        document.getElementById(btnDel).parentElement.parentElement
          .parentElement;
      row.removeChild(del);
      const index = parseInt(btnDel.slice(3));
      titleArray.splice(index, 1);
      noteArray.splice(index, 1);
      localStorage.setItem("titles", JSON.stringify(titleArray));
      localStorage.setItem("notes", JSON.stringify(noteArray));
      display();
    }
  }
});

// Edit note
row.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target.classList.contains("btn"));
  if (e.target.classList.contains("btn")) {
    const btnEdit = e.target.id;
    if (btnEdit.includes("edit")) {
      const editEl = document.getElementById(btnEdit).parentElement;
      const index = parseInt(btnEdit.slice(4));
      const newTitle = prompt("Enter new title:", titleArray[index]);
      const newNote = prompt("Enter new note:", noteArray[index]);
      if (newTitle !== null && newNote !== null) {
        titleArray[index] = newTitle;
        noteArray[index] = newNote;
        localStorage.setItem("titles", JSON.stringify(titleArray));
        localStorage.setItem("notes", JSON.stringify(noteArray));
        display();
        console.log(btnEdit, editEl, index);
      }
    }
  }
});

// localStorage.clear();
