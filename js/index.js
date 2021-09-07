const today = new Date();
const ThisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("P"); // Create paragraph
//Create Footer
copyright.innerHTML = `&copy;Fabian Aparicio  ${ThisYear}`;
footer.appendChild(copyright);
//Skills 
const skills = ["Web sides", "JavaScript", "Html", "Internet Conection", "GIT", "GitHub", "Visual Studio"];
const skillsSection = document.getElementById("skills1");
const skillsList = skillsSection.querySelector("ul");
// Get Form with DOM
const messageForm = document.querySelector('form[name="leave_message"]');
// console.log(messageForm);
const submitButton = document.querySelector('button[type="submit"]');
// console.log(submit);
// Messages Form Const
const messageSection = document.querySelector('#messages');
const messageList = messageSection.querySelector('ul');


//Show up skill
for (let i = 0; i < skills.length; i++) {
    var skill = document.createElement("li");
    skill.innerHTML = `${skills[i]}`;
    skillsList.appendChild(skill);
}


function createMessagesList(name, email, textarea) {
    const newMessage = document.createElement('li');
    const removeButton = document.createElement('button');
    const editButton = document.createElement('button');
    // newMessage.innerHTML = `<div>
    //     <span class="message strong">${textarea.value}</span>
    //     <p>${today.toLocaleString()} from <a class="link" href="mailto:${
    //     email.value
    //   }">${name.value}</a> &nbsp;</p>
    //   </div>`;

    newMessage.innerHTML = ` From: <a href="mailto:${email.value}">${name.value} </a> <br> <span class="message">  Message: ${textarea.value}</span> 
    <p>${today.toLocaleString()} </p>
    `;
    //Remove Button
    removeButton.innerText = 'Remove';
    removeButton.setAttribute('type', 'button');
    //Edit Button
    editButton.innerText = 'Edit';
    editButton.setAttribute('type', 'button');
    //Appending
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    //Create message 
    messageList.appendChild(newMessage);
    //Display Messages Section
    messageSection.style.display = '';

}

//Form Value Collection
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const textarea = document.querySelector('textarea[name="message"]');
    createMessagesList(name, email, textarea);
    messageForm.reset();
});


//Hide Messages Section if Empty
if (messageList.children.length == 0) {
    messageSection.style.display = 'none';
}

messageList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (button.textContent === 'Remove') {
            ul.removeChild(li);
            if (messageList.children.length == 0) {
                messageSection.style.display = 'none';
            }
        } else if (button.textContent === 'Edit') {
            const span = li.querySelector('span');
            console.log(span);
            const input = document.createElement('input');
            input.className += 'input';
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'Save';
        } else if (button.textContent === 'Save') {
            const input = li.querySelector('input');
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'Edit';
        }
    }
});

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