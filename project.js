function handleform(event){
    event.preventDefault();
    
    const task = document.getElementById('task').value;
    const des = document.getElementById('des').value;

    const work = {
        task: task,
        des: des
    };
    
    saveWork(work)
    .then(()=>{
        add();
    })
    .catch((err)=>{
        console.log(err);
    })
}

function saveWork(work){
    return axios({
        method : 'post',
        url : 'https://crudcrud.com/api/40cc3f9928584c2eba3c9cd3894ef260/todos',
        data : work
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

function add() {
    axios.get('https://crudcrud.com/api/40cc3f9928584c2eba3c9cd3894ef260/todos')
        .then((response) => {
            const ul = document.getElementById('unorderList');
            ul.innerHTML = '';

            if (response.data) {
                response.data.forEach(data => {
                    const li = document.createElement('li');
                    li.id = `${data._id}`;

                    const labelDone = document.createElement('label');
                    labelDone.textContent = "Do";

                    const done = document.createElement('input');
                    done.id = "done";
                    done.name = "done_not";
                    done.type = "radio";
                    done.value = 1;
                    
                    const labelNotDone = document.createElement('label');
                    labelNotDone.textContent = "NotDo";

                    const notDone = document.createElement('input');
                    notDone.id = "notdone";
                    notDone.name = "done_not";
                    notDone.type = "radio";
                    notDone.value = 0;
                
                    li.textContent = `${data._id} -- ${data.task} -- ${data.des}--`;
                    li.appendChild(labelDone);
                    li.appendChild(done);
                    li.appendChild(labelNotDone);
                    li.appendChild(notDone);
                    ul.appendChild(li);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
function submitForm(event) {
    event.preventDefault();
    const selectedID = document.querySelector('input[name="done_not"]:checked').parentNode.id;
    const selectedValue = document.querySelector('input[name="done_not"]:checked').value;

    if (selectedValue == 1) {
        workDoneDetails(selectedID);
    } else {
        workNotDoneDetails(selectedID);
    }
}


function workDoneDetails(selectedID) {
    axios.get(`https://crudcrud.com/api/40cc3f9928584c2eba3c9cd3894ef260/todos/${selectedID}`)
        .then((response) => {
            const detailsSection = document.getElementById('doDetails');
            const detailsParagraph = document.createElement('p');
            detailsParagraph.textContent = `ID: ${response.data._id}, Task: ${response.data.task}, Description: ${response.data.des}`;
            detailsSection.appendChild(detailsParagraph);

            // Remove the item from the above section
            removeItemFromList(selectedID);
        })
        .catch((error) => {
            console.error(error);
        });
}

function workNotDoneDetails(selectedID) {
    axios.get(`https://crudcrud.com/api/40cc3f9928584c2eba3c9cd3894ef260/todos/${selectedID}`)
        .then((response) => {
            const detailsSection = document.getElementById('notDoDetails');
            const detailsParagraph = document.createElement('p');
            detailsParagraph.textContent = `ID: ${response.data._id}, Task: ${response.data.task}, Description: ${response.data.des}`;
            detailsSection.appendChild(detailsParagraph);

            // Remove the item from the above section
            removeItemFromList(selectedID);
        })
        .catch((error) => {
            console.error(error);
        });
}

function removeItemFromList(selectedID) {
    const ul = document.getElementById('unorderList');
    const listItem = document.getElementById(selectedID);
    
    if (listItem) {
        ul.removeChild(listItem);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    add();
});

