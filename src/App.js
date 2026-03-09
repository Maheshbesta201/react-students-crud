import React, { useState, useEffect } from "react";
import studentsData from "./data/StudentsData";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Loading from "./components/Loading";
import * as XLSX from "xlsx";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updated) => {
    setStudents(
      students.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Students Management</h2>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <button
        className="btn btn-success mb-3"
        onClick={downloadExcel}
      >
        Download Excel
      </button>

      <StudentTable
        students={students}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />

    </div>
  );
}

export default App;