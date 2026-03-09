import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setAge(editingStudent.age);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email");
      return;
    }

    const student = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name,
      email,
      age
    };

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="btn btn-primary">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;