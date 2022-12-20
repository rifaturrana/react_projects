import React from "react";

const AbsentStudents = (props) => {
  const { students, toggleHandler } = props;

  return (
    <div className="list absent-student-list">
      <h2>Absent Students</h2>
      <ul>
        {students
          .filter((s) => s.isPresent === false)
          .map((student) => (
            <li>
              <span>{student.name}</span>
              <button onClick={() => toggleHandler(student.id)}>
                Accidentally Added
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AbsentStudents;
