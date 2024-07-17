// Targeting the elements
let studentName = document.querySelector("#name");
let studentID = document.querySelector("#studentid");
let email = document.querySelector("#email");
let contactNumber = document.querySelector("#contactnumber");
let newlyregisteredstudent = document.querySelector(".newlyregisteredstudent");
let form = document.querySelector("form");

// Targeting button
let submitButton = document.querySelector("#submitbutton");

loadValuesIntoTable();

function resetValues() {
  studentName.value = "";
  studentID.value = "";
  email.value = "";
  contactNumber.value = "";
}

function addContent() {
  let studentToBeAdded = {
    name: studentName.value,
    id: studentID.value,
    email: email.value,
    number: contactNumber.value,
  };

  let tempLocalStorage = localStorage.getItem("studentInfo");

  if (tempLocalStorage == null) {
    tempLocalStorage = [];
  } else {
    tempLocalStorage = JSON.parse(tempLocalStorage);
  }

  tempLocalStorage.push(studentToBeAdded);

  tempLocalStorage = JSON.stringify(tempLocalStorage);

  localStorage.setItem("studentInfo", tempLocalStorage);

  window.location.reload();
}

submitButton.addEventListener("click", addContent);

function loadValuesIntoTable() {
  let tempLocalStorage = JSON.parse(localStorage.getItem("studentInfo"));
  let newtable = document.createElement("tbody");
  newtable.classList.add("newlyregisteredstudent");

  for (let row in tempLocalStorage) {
    console.log(row);

    let studentcontainer = document.createElement("tr");

    // Table row childs are created here

    let box1 = document.createElement("td");
    let box2 = document.createElement("td");
    let box3 = document.createElement("td");
    let box4 = document.createElement("td");
    let box5 = document.createElement("button");
    let box6 = document.createElement("button");
    // Boxes content

    box1.textContent = tempLocalStorage[row].name;
    box2.textContent = tempLocalStorage[row].id;
    box3.textContent = tempLocalStorage[row].email;
    box4.textContent = tempLocalStorage[row].number;
    box5.innerHTML = '<ion-icon name="trash-bin-outline"></ion-icon>';
    box6.innerHTML = '<ion-icon name="card-outline"></ion-icon>';

    box5.classList.add("deletebutton");
    box5.id = tempLocalStorage[row].id;
    box5.addEventListener("click", deleteContent);

    box6.classList.add("editbutton");
    box6.addEventListener("click", editContent);

    // Appending to student container (tr)
    studentcontainer.appendChild(box1);
    studentcontainer.appendChild(box2);
    studentcontainer.appendChild(box3);
    studentcontainer.appendChild(box4);
    studentcontainer.appendChild(box5);
    studentcontainer.appendChild(box6);

    newtable.appendChild(studentcontainer);

    // Appending to newlyregisteredstudent the tbody in the table
  }
  console.log(tempLocalStorage);
  newlyregisteredstudent.replaceWith(newtable);
}
// deleting a studnet  row 


function deleteContent(event) {
  let tempLocalStorage = JSON.parse(localStorage.getItem("studentInfo"));

  tempLocalStorage = tempLocalStorage.filter(
    (item) => item.id != event.target.id
  );

  localStorage.setItem("studentInfo", JSON.stringify(tempLocalStorage));

  window.location.reload();
}
// editing a student row

function editContent(event) {
  let tempLocalStorage = JSON.parse(localStorage.getItem("studentInfo"));
  let touched = event.target.closest("button");

  if (touched.classList.contains("editbutton")) {
    let row = touched.closest("tr");
    let cells = row.querySelectorAll("td");

    studentName.value = cells[0].textContent;
    studentID.value = cells[1].textContent;
    email.value = cells[2].textContent;
    contactNumber.value = cells[3].textContent;

    tempLocalStorage = tempLocalStorage.filter(
      (item) => item.id !== studentID.value
    );

    localStorage.setItem("studentInfo", JSON.stringify(tempLocalStorage));
  }
}
// if the delete and edit button is clicked perform the task 
submitButton.addEventListener("click", function () {
  editContent();
  addContent();
});
