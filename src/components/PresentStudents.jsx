import React from "react";

const PresentStudents = (props) => {
  const { students, toggleHandler } = props;
  return (
    <div className="list present-student-list">
      <h2>Present Students</h2>
      <ul>
        {students
          .filter((s) => s.isPresent === true)
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

export default PresentStudents;
