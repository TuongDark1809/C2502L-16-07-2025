let editingIndex = null;
let students = [];
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const student = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        gender: document.querySelector('input[name="gender"]:checked')?.value,
    }; //Tạo object student
    if (student.name.trim() === "" || isNaN(student.age) || !student.gender) {
        alert("Please add info");
        return;
    }; //Alert nếu không có thông tin nào được thêm

    students.push(student); //Đẩy student vào mảng students
    render(students); //In ra thông tin của mảng students

    if (editingIndex !== null) {
        students.splice(editingIndex, 1, student); //Xóa student tại vị trí cần sửa và thêm vào student mới
        students.pop(); //Xóa student ở cuối đi (do nút add và nút update là như nhau, nên khi ấn nút update sẽ thêm vào một student ở cuối)
        editingIndex = null;
        document.getElementById("submitBtn").textContent = "Thêm";
        render(students)
    }
});


function render(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; //Xóa thông tin của bảng cũ

    data.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td><button class="delete">Xóa</button></td>
            <td><button class="edit">Sửa</button></td>`; //Tạo ra dòng chứa thông tin student


        row.querySelector(".delete").addEventListener("click", () => {
            students = students.filter((_, i) => i !== index); //Xóa student khỏi mảng khi nhấn nút xóa 
            render(students);
        });


        row.querySelector(".edit").addEventListener("click", () => {
            document.getElementById("name").value = student.name;
            document.getElementById("age").value = student.age;
            document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
            editingIndex = index; 
            document.getElementById("submitBtn").textContent = "Update";
        });


        tableBody.appendChild(row); //Thêm dòng chứa thông tin student vào bảng
    });
};


document.getElementById("ageSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    const maxAge = Number(document.getElementById("ageInput").value);
    if (isNaN(maxAge)) {
        alert("Please add a suitable age");
        return;
    }; //Alert nếu tuổi nhập vào không hợp lệ

    const fStudents = students.filter(student => {
        const ageNum = Number(student.age);
        return !isNaN(ageNum) && ageNum >= maxAge;
    });
    render(fStudents);
});



