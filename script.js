/**
 * @file script.js
 * @description File untuk mengelola logika aplikasi To-Do List.
 * @author Synjoestar
 */

// Ambil todo dari local storage atau inisialisasi array kosong
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

/**
 * Inisialisasi event listener saat DOM telah dimuat.
 */
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default tombol Enter
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

/**
 * Menambahkan tugas baru ke daftar.
 */
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

/**
 * Menampilkan daftar tugas di halaman.
 */
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
          item.disabled ? "checked" : ""
        }>
        <p id="todo-${index}" class="${
          item.disabled ? "disabled" : ""
        }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

/**
 * Mengedit teks tugas yang dipilih.
 * @param {number} index - Indeks tugas yang akan diedit.
 */
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

/**
 * Mengubah status selesai/tidak selesai pada tugas.
 * @param {number} index - Indeks tugas yang akan diubah.
 */
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

/**
 * Menghapus semua tugas dari daftar.
 */
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

/**
 * Menyimpan daftar tugas ke local storage.
 */
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}