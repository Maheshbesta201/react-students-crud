import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => onEdit(student)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onDelete(student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;