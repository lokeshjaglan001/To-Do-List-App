document.addEventListener('DOMContentLoaded',()=>{
    let tasksdata = document.getElementById('task-form');
    let tasksList = document.getElementById('task-list');

    let filter = 'all';

    let all = document.getElementById('all');
    let completed = document.getElementById('completed');
    let incompleted = document.getElementById('incompleted');

    all.addEventListener('click',()=>{
        filter = 'all'
        all.classList.remove('btn-outline-dark')
        all.classList.add('btn-dark')
        completed.classList.remove('btn-dark')
        completed.classList.add('btn-outline-dark')
        incompleted.classList.remove('btn-dark')
        incompleted.classList.add('btn-outline-dark')
        renderTasks();
    })
    
    completed.addEventListener('click',()=>{
        filter = 'completed'
        completed.classList.remove('btn-outline-dark')
        completed.classList.add('btn-dark')
        all.classList.remove('btn-dark')
        all.classList.add('btn-outline-dark')
        incompleted.classList.remove('btn-dark')
        incompleted.classList.add('btn-outline-dark')
        renderTasks();
    })
    
    incompleted.addEventListener('click',()=>{
        filter = 'incompleted'
        incompleted.classList.remove('btn-outline-dark')
        incompleted.classList.add('btn-dark')
        all.classList.remove('btn-dark')
        all.classList.add('btn-outline-dark')
        completed.classList.remove('btn-dark')
        completed.classList.add('btn-outline-dark')
        renderTasks();
    })




    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        tasksList.innerHTML = '';
        allTasks.forEach((task,index)=>{
            if(filter === 'all'){

            }
            else if(filter === 'completed'){
                if(task.completed === false){
                    return
                }
            }
            else if(filter === 'incompleted'){
                if(task.completed === true){
                    return
                }
            }
            tasksList.innerHTML += `
            <div class="card p-3 border-2 border-dark m-2 d-flex flex-column justify-content-between" style='width:20rem'>
         
                    <div class="title h3 text-center fw-bold">${task.title}</div>
                    <div class="description text-center mb-3">${task.description}</div>
             
                <div>
                    <button class="completed border-2 w-100 fw-bold mb-3 border-dark btn ${task.completed ? 'bg-success' : 'bg-warning'}">${task.completed? 'Completed':"Not Completed"}</button>
                <div class="d-flex justify-content-around">
                    ${task.completed ?
                         `<button class="btn w-25 bg-warning border-2 border-dark" onclick="completeTask(${index})">
                            <svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 11h6v2H9z"></path><path d="M17 5H7c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM7 17V7h10l.002 10H7z"></path></g></svg>
                         </button>` :
                         `<button class="btn w-25 bg-success border-2 border-dark" onclick="completeTask(${index})">
                            <svg fill="#000000" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z"></path><path d="M10.996 12.556 9.7 11.285l-1.4 1.43 2.704 2.647 4.699-4.651-1.406-1.422z"></path></g></svg>
                         </button>`}
                    <button onclick='deleteTask(${index})' class="btn w-25 bg-danger border-2 border-dark">
                       <svg width="25px" height="25px" viewBox="-0.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>icon/18/icon-delete</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketch:type="MSShapeGroup"> </path> </g> </g></svg>
                    </button>
                </div>
                </div>
            </div>
            `;
        })
    }

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
    
    window.completeTask = function(id){
        allTasks[id].completed = !allTasks[id].completed;
        renderTasks();
        saveTasks();
    }
    
    window.deleteTask = function(id){
        allTasks.splice(id, 1);
        renderTasks();
        saveTasks();
    }
    
    tasksdata.addEventListener('submit' , (e)=>{
        e.preventDefault();
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        allTasks.push({title:title,description:description,completed:false});
        tasksdata.reset()
        saveTasks();
        renderTasks();
    })
    
    renderTasks();
});