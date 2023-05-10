import "./App.css";
import { useState } from "react";

function App() {
  // Original list with all the students
  let studentsList = ["Cristian K.", "Joie S."];

  /*   let studentsList = [
    "Ana R.",
    "Bernardo A.",
    "Cristian K.",
    "Elnaz F.",
    "Erik K.",
    "Francisco B.",
    "Francisco C.",
    "Guglielmo G.",
    "Guilherme D.",
    "Gustavo C.",
    "Guy D.",
    "Henrique P.",
    "João C.",
    "João M.",
    "Joie S.",
    "Lucas T.",
    "Margarida P.",
    "Marisa P.",
    "Niroj G.",
    "Nuno D.",
    "Pedro N.",
    "Renato P.",
    "Robson B.",
    "Roshan P.",
    "Tomás M.",
    "Victoria A.",
  ]; */

  // Array of already picked students
  const [pickedStudents, setPickedStudents] = useState([]);
  // Array of pairs already assigned (results box)
  const [studentPairs, setStudentPairs] = useState([]);
  // Student that is picking a card
  const [selectTarget, setSelectTarget] = useState("default");

  // Get half of the cards
  const numOfCards = studentsList.length / 2;

  // Assign a random person to the picking student
  const pickFunction = (e) => {
    let randomStudent;

    // Check if the the picked card is valid
    if (
      !e.target.classList.contains("flippedCard") &&
      selectTarget !== "default" &&
      !pickedStudents.includes(selectTarget)
    ) {
      // Pick a random student and check if it is valid otherwise pick again
      for (let i = 0; i < 50; i++) {
        randomStudent =
          studentsList[Math.floor(Math.random() * studentsList.length)];
        if (
          randomStudent !== selectTarget &&
          !pickedStudents.includes(randomStudent)
        ) {
          break;
        }
      }

      /* -------------- Special condition -------------- */
      let condition =
        ["Cristian K.", "Renato P.", "Niroj G.", "Joie S."].includes(
          randomStudent
        ) &&
        ["Cristian K.", "Renato P.", "Niroj G.", "Joie S."].includes(
          selectTarget
        );

      if (condition) {
        let rStudents = studentsList.filter(
          (student) => !pickedStudents.includes(student)
        );
        let rIndex = Math.floor(
          Math.random() * ((studentsList.length-1) - (pickedStudents.length-1) +1)
        );

        console.log(rStudents.length, pickedStudents.length, rIndex);
        randomStudent = rStudents[rIndex];
      }
      /* ----------------------------------------------- */

      // Update the array of already picked students
      setPickedStudents([randomStudent, selectTarget, ...pickedStudents]);

      // Flip the card
      e.target.classList.add("flippedCard");
      e.target.textContent = randomStudent;

      // Keep track of pairs already assigned
      setStudentPairs([...studentPairs, `${selectTarget} 🤝 ${randomStudent}`]);

      // Reset select dropdown to default after pair is assigned
      setSelectTarget("default");
    }
  };

  return (
    <>
      {/* BACKGROUND ANIMATION */}
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        {/* IRONHACK LOGO */}
        <div className="pickingStudent">
          <img src="ironhackLogo.png" alt="ironhack logo" />

          {/* SELECT DROPDOWN TO CHOOSE THE PICKING STUDENT */}
          <select
            id="selectStudents"
            className="classic"
            onChange={(e) => {
              setSelectTarget(e.target.value);
            }}
            value={selectTarget}
          >
            <option key="default" value="default">
              Select your name
            </option>
            {studentsList.map((student, index) => {
              if (!pickedStudents.includes(student))
                return (
                  <option key={index} value={student}>
                    {student}
                  </option>
                );
            })}
          </select>

          {/* ALERT MESSAGE IF STUDENT ALREADY HAS A PAIR */}
          {pickedStudents.length > 1 &&
          pickedStudents.includes(selectTarget) ? (
            <p id="selectAlert">Student already picked!</p>
          ) : (
            <p></p>
          )}
        </div>

        {/* ALL CARDS WITH STUDENTS NAMES */}
        <div className={"resultsAndCards"}>
          <div className="allCards">
            {studentsList.slice(0, numOfCards).map((student, index) => {
              return (
                <div
                  key={index}
                  className="card"
                  onClick={(e) => pickFunction(e)}
                ></div>
              );
            })}
          </div>

          {/* BOX WITH STUDENT PAIRS ALREADY ASSIGNED */}
          <div className="resultsBox">
            <p>Pairs:</p>
            <ul id={"results"}>
              {studentPairs.map((pair, index) => {
                return <li key={index}>{pair}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
