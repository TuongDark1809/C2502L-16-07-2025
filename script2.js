let editingIndex = null;
let tasks = [];
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.getElementById("taskName").value; //Tạo task 
    
    if (task.trim() === "") {
        alert("Please add your task!");
        return;
    }; //Alert nếu không có task nào được điền

    tasks.push(task); //Đẩy task vào mảng tasks
    tablePrint(tasks); //In mảng tasks ra

    if (editingIndex !== null) {
        tasks.splice(editingIndex, 1, task); //Xóa task tại vị trí cần sửa và thêm vào task mới
        tasks.pop(); //Xóa task ở cuối đi
        editingIndex = null;
        document.getElementById("submitButton").textContent = "Submit";
        tablePrint(tasks);
    }
});


function tablePrint(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; //Xóa thông tin của bảng cũ

    data.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${task}</td>
        <td><button class="delete">Delete</button></td>
        <td><button class="edit">Edit</button></td>
        <td><button class="complete">Completed</button></td>`; //Tạo ra dòng chứa thông tin student

        row.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter((_, i) => i !== index); //Xóa task khỏi mảng khi nhấn nút xóa 
            tablePrint(tasks);
        });

        row.querySelector(".edit").addEventListener("click", () => {
            document.getElementById("taskName").value = task;
            editingIndex = index;
            document.getElementById("submitButton").textContent = "Update";
        });

        row.querySelector(".complete").addEventListener("click", () => {
            row.classList.add("green"); //Thêm màu background và chữ khi nhấn nút hoàn thành
        })

        tableBody.appendChild(row); //Thêm dòng chứa thông tin task vào bảng

    });
};

