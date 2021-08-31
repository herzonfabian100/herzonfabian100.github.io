let today = new Date();
const ThisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("P"); // Create paragraph
copyright.innerHTML = `&copy;Fabian Aparicio  ${ThisYear}`;
footer.appendChild(copyright);

const skills = ["Web sides", "JavaScript", "Html", "Internet Conection", "GIT", "GitHub", "Visual Studio"];
const skillsSection = document.getElementById("skills1");
const skillsList = skillsSection.querySelector("ul");
//Show up skill
for (let i = 0; i < skills.length; i++) {
    var skill = document.createElement("li");
    skill.innerHTML = `${skills[i]}`;
    skillsList.appendChild(skill);
}
// Get Form with DOM
const messageForm = document.querySelector('form[name="leave_message"]');
console.log(messageForm);
const submit = document.querySelector('button[type="submit"]');
console.log(submit);



function HideMessages() {
    document.getElementById("messages").style.visibility = "hidden";
}
HideMessages();

function ShowMessages() {
    document.getElementById("messages").style.visibility = "visible";

}




function ResetForm() {
    document.getElementById("Form_Message").reset();
}

submit.addEventListener('click', ButtonElements);



function ButtonElements(event) {
    event.preventDefault();
    ShowMessages();

    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const textarea = document.querySelector('textarea[name="message"]');
    console.log(name.value);
    console.log(email.value);
    console.log(textarea.value);
    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');




    //Create message 
    newMessage.innerHTML = `<div>
        <span class="strong">${textarea.value}</span>
        <p>${today.toLocaleString()} from <a class="link" href="mailto:${
        email.value
      }">${name.value}</a> &nbsp;</p>
      </div>`;
    messageList.appendChild(newMessage);

    //Create BUTTON

    const removeButton = document.createElement('BUTTON');
    removeButton.innerText = 'remove';
    removeButton.setAttribute('type', 'button');
    newMessage.appendChild(removeButton);
    removeButton.addEventListener('click', deleteItem)

    function deleteItem(e) {
        const entry = e.target.parentNode;
        entry.remove();
        console.log(entry);

    }

    ResetForm();
}
//Display Projects in GitHub with Fetch
fetchData('https://api.github.com/users/herzonfabian100/repos')

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => githubRequest(data))
        .catch((error) => {
            console.error("Error:", error);
        })
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}





function githubRequest(repositoriesData) {
    var projectSection = document.querySelector('#projects');
    var projectList = projectSection.getElementsByTagName('ul')[0];

    for (let i = 0; i < repositoriesData.length; i += 1) {
        let project = document.createElement("li");
        let UrlRepo = document.createElement("a");

        if (new Date(repositoriesData[i].created_at) > new Date(2021, 02, 22, 10, 33, 30, 0)) {

            UrlRepo.href = repositoriesData[i].html_url;
            //project.innerText = $repositoriesData[i].name " Date " created_at;
            project.innerHTML = `<div>
                <span class="strong"> ${repositoriesData[i].name }</span>
                <span> Created  :  ${ new Date(repositoriesData[i].created_at).toDateString()}</span><br><p> Description : ${repositoriesData[i].description }</p>
                </div>`;
            UrlRepo.appendChild(project);
            projectList.appendChild(UrlRepo);
        }


    }


}