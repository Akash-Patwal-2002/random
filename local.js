let userForm = document.getElementById("user-form");

let userEntries =[];


if(localStorage.getItem("user-entries")===null){
     userEntries = []
}
else{
    userEntries = JSON.parse(localStorage.getItem("user-entries"));
}

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");

    if(entries){
        entries = JSON.parse(entries);
    }else{
        entries = [];
    }
    return entries;
}

const displayEntries = () =>
{
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) =>{
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const tncCell = `<td class='border px-4 py-2'>${entry.tncEl}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${tncCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>

    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">accepted terms?</th>
    </tr>${tableEntries} </table>`;


    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("nameEl").value;
  const email = document.getElementById("emailEl").value;
  const password = document.getElementById("passwordEl").value;
  const dob = document.getElementById("dobEl").value;
  const tncEl = document.getElementById("TncEl").checked;
  let cur = new Date().getFullYear();
  let year = dob.split("-");
  let exe = year[0];
  let age = cur - exe;
  if(age<18 || age >55){
    document.getElementById('dobEl').style='border:1px solid red'
    return alert("Invalid Age");
}
   else{
const entry = {
        name,
        email,
        password,
        dob,
        tncEl
    };
    userEntries.push(entry);
   localStorage.setItem("user-entries", JSON.stringify(userEntries));
   displayEntries();
}}

userForm.addEventListener("submit", saveUserForm);
displayEntries();