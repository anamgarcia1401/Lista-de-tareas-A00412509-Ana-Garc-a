// Selección de elementos principales del DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Función para guardar las tareas en localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item span").forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskText) {
    // Crear <li>
    const li = document.createElement("li");
    li.classList.add("task-item");

    // Texto de la tarea
    const span = document.createElement("span");
    span.textContent = taskText;

    // Botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");

    // Evento para eliminar tarea
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    // Agregar elementos al <li> y luego al <ul>
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Guardar después de agregar
    saveTasks();
}

// Evento para el botón "Agregar"
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); // Quita espacios en blanco
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; // Limpiar campo
    }
});

// Función para cargar las tareas desde localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(task => {
            createTaskElement(task);
        });
    }
}

// Cargar tareas cuando la página inicia
loadTasks();