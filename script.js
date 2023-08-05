// ACCESSING DOM ELEMENTS
const addButton = document.getElementById('button');
const taskList = document.querySelector('.task-list');
const noTaskMessage = document.querySelector('.no-task');
const tasksLeft = document.getElementById('tasksLeft');
const filterOptions = document.querySelectorAll('.filter-option');
const clearCompletedBtn = document.querySelector('.text p:nth-child(2)');
const completeAllBtn = document.querySelector('.text p:nth-child(1)');

addButton.onclick = () => {
    const input = document.getElementById('input');
    const taskText = input.value.trim();
    if (!taskText) {
        alert('Please enter a task');
    } else {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item', 'flex');  // ADDING CLASS TO DIV 
        taskList.appendChild(taskItem);

        const checkbox = document.createElement('input');  // CHECKBOX BEFORE TASK 
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox'); //ADDING CLASS TO CHECKBOX
        taskItem.appendChild(checkbox);

        const task = document.createElement('h3');  // THIS IS TASK ELEMENT 
        task.textContent = taskText;          // INPUT TEXT AS A H3 CONTENT IE TASK
        taskItem.appendChild(task);

        const deleteBtn = document.createElement('button');   // DELETE BUTTON AFTER THE TASK
        deleteBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
        deleteBtn.classList.add('delete-btn');
        taskItem.appendChild(deleteBtn);

        input.value = '';
        updateTasksLeft();
        noTaskMessage.style.display = 'none';  // THIS APPLIES TO (no tasK) WEHN WE ADD TASK 

        deleteBtn.onclick = () => {
            taskItem.remove();  //      REMOVING ENTIRE TASK DIV ON CLICKING DELETE BTN 
            updateTasksLeft();
            if (taskList.children.length === 1) {
                noTaskMessage.style.display = 'block';   // DISPLAY OF ( no task ) IF THERE IS NO TASK
            }
        };

        checkbox.onchange = () => {
            taskItem.classList.toggle('completed', checkbox.checked);  // IF WE CHECK ON CHECKBOX (ONCHANGE) IT ADDS CLASS COMPLETED TO TASKITEM // checkbox.checked(RETURNS BOOLENA)
            updateTasksLeft();
        };
    }
};
// Event listener for the "Clear Completed" button
clearCompletedBtn.onclick = () => {
  
    const completedTasks = document.querySelectorAll('.task-item .task-checkbox:checked');           // GET ALL THE TASK THAT ARE CHECKED (completed)

    completedTasks.forEach(task => task.closest('.task-item').remove());           //LOOPING THROUGN ALL CHECKED AND REMOVING ALL DIVS
  
    updateTasksLeft();            // Update the number of tasks left (since some tasks were cleared)

    // If there are no tasks left, display the "No tasks" message
    if (taskList.children.length === 1) {
        noTaskMessage.style.display = 'block';
    }
};

completeAllBtn.onclick = () => {
    const taskCheckboxes = document.querySelectorAll('.task-item .task-checkbox');
    const allTasksCompleted = !Array.from(taskCheckboxes).some(checkbox => !checkbox.checked);
    taskCheckboxes.forEach(checkbox => {
        checkbox.checked = !allTasksCompleted;
        checkbox.dispatchEvent(new Event('change'));
    });
};

filterOptions.forEach(option => {
    option.onclick = () => {
        filterOptions.forEach(opt => opt.classList.remove('active')); // Remove "active" class from all filter options
        option.classList.add('active'); // Add "active" class to the clicked filter option

        const filterValue = option.dataset.filter; // Get the filter value from the clicked filter option
        const taskItems = document.querySelectorAll('.task-item'); // Get all task items in the task list

        taskItems.forEach(item => {
            const isCompleted = item.querySelector('.task-checkbox').checked; // Check if the task item is completed

            // Set the display property of the task item based on the selected filter value
            // If filterValue is 'all' or the task is 'incomplete' and not checked, show the task; otherwise, hide it.
            item.style.display = (filterValue === 'all' || (filterValue === 'incomplete' && !isCompleted) || (filterValue === 'completed' && isCompleted)) ? 'flex' : 'none';
        });
    };
});

function updateTasksLeft() {
    const totalTasks = document.querySelectorAll('.task-item').length;      // ALL ITEMS IN TASK LIST
    const completedTasks = document.querySelectorAll('.task-item .task-checkbox:checked').length;   // ONLY CHECKED TASKS
    tasksLeft.textContent = totalTasks - completedTasks;   // ALL TASKS - CHECKED TASKS = LEFT TASKS
}
