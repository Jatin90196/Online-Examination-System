import React, { useState, useEffect } from "react";
// import './Students.css';

function AdminStudents() {
    const [students,setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/students")
          .then(res => res.json())
          .then(data => {
            setStudents(data);
            setLoading(false);
          });
      }, []);

      return (
        <div style={{ padding: 32 }}>
          <h2>Registered Students</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Roll Number</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                    <td>{student.roll_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
}


export default AdminStudents;