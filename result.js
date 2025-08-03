const savedPredictedData = sessionStorage.getItem("predictionResult");

if (savedPredictedData) {
  const DisplayAge = sessionStorage.getItem("Age");
  const DisplayStudentID = sessionStorage.getItem("StudentID");
  const StudentCred = {
    age: parseInt(DisplayAge), // Parse age as an integer
    Id: DisplayStudentID,
  };
  console.log(StudentCred);
  const savedPrediction = JSON.parse(
    savedPredictedData.replace(/"(\w+)"\s*:/g, '"$1":')
  ); //JSON.parse(savedPredictedData);
  console.log(savedPrediction);
  document.getElementById("age").textContent = `Age: ${StudentCred.age}`;
  document.getElementById(
    "studentID"
  ).textContent = ` Student ID : ${StudentCred.Id}`;

  if (savedPrediction.PredictedGradeClass === "A") {
    document.getElementById(
      "Student-Grade"
    ).textContent = `You did Great, Student Grade: ${savedPrediction.PredictedGradeClass}`;
  } else if (savedPrediction.PredictedGradeClass === "B") {
    document.getElementById(
      "Student-Grade"
    ).textContent = `Student Grade : ${savedPrediction.PredictedGradeClass}`;
  } else if (savedPrediction.PredictedGradeClass === "C") {
    document.getElementById(
      "Student-Grade"
    ).textContent = `Student Grade : ${savedPrediction.PredictedGradeClass}`;
  } else if (savedPrediction.PredictedGradeClass === "D") {
    document.getElementById(
      "Student-Grade"
    ).textContent = `Student Grade : ${savedPrediction.PredictedGradeClass}`;
  } else if (savedPrediction.PredictedGradeClass === "F") {
    document.getElementById(
      "Student-Grade"
    ).textContent = `Student Grade : ${savedPrediction.PredictedGradeClass}`;
  } else {
    document.getElementById("Student-Grade").textContent = "Invalid Grade";
  }
  //   if(){} else if(){}
  //   if(){} else if(){}
  //   if(){} else if(){}

  if (savedPrediction && savedPrediction.Gender === 0) {
    document.getElementById("Gender").textContent = `Gender: Male`;
  } else if (savedPrediction && savedPrediction.Gender === 1) {
    document.getElementById("Gender").textContent = `Gender: Female`;
  }
  if (savedPrediction.Ethnicity === 0) {
    document.getElementById("Ethnicity").innerHTML = `Ethnicity: Caucasian`;
  } else if (savedPrediction.Ethnicity === 1) {
    {
      document.getElementById(
        "Ethnicity"
      ).innerHTML = `Ethnicity: African American`;
    }
  } else if (savedPrediction.Ethnicity === 2) {
    {
      document.getElementById("Ethnicity").innerHTML = `Ethnicity: Asian`;
    }
  } else if (savedPrediction.Ethnicity === 3) {
    {
      document.getElementById("Ethnicity").innerHTML = `Ethnicity: Other`;
    }
  }

  if (savedPrediction.ParentalEducation === 0) {
    document.getElementById(
      "Parent-Education"
    ).textContent = `Parental education: None`;
  } else if (savedPrediction.ParentalEducation === 1) {
    document.getElementById(
      "Parent-Education"
    ).textContent = `Parental education: High School`;
  } else if (savedPrediction.ParentalEducation === 2) {
    document.getElementById(
      "Parent-Education"
    ).textContent = `Parental education: Some College`;
  } else if (savedPrediction.ParentalEducation === 3) {
    document.getElementById(
      "Parent-Education"
    ).textContent = `Parental education: Bachelors`;
  } else if (savedPrediction.ParentalEducation === 4) {
    document.getElementById(
      "Parent-Education"
    ).textContent = `Parental education: Higher`;
  }

  document.getElementById(
    "Study-Time"
  ).textContent = `Study Time Weekly: ${savedPrediction.StudyTimeWeekly} hours`;

  document.getElementById(
    "absences"
  ).textContent = `Absences: ${savedPrediction.Absences} Time(s)`;

  if (savedPrediction.Tutoring === 0) {
    document.getElementById("Tutoring").textContent = `Tutoring: No`;
  } else if (savedPrediction.Tutoring === 1) {
    document.getElementById("Tutoring").textContent = `Tutoring: Yes`;
  }
  if (savedPrediction.ParentalSupport === 0) {
    document.getElementById(
      "parent-support"
    ).textContent = `Parental support: None`;
  } else if (savedPrediction.ParentalSupport === 1) {
    document.getElementById(
      "parent-support"
    ).textContent = `Parental support: Low`;
  } else if (savedPrediction.ParentalSupport === 2) {
    document.getElementById(
      "parent-support"
    ).textContent = `Parental support: Moderate`;
  } else if (savedPrediction.ParentalSupport === 3) {
    document.getElementById(
      "parent-support"
    ).textContent = `Parental support: High`;
  } else if (savedPrediction.ParentalSupport === 4) {
    document.getElementById(
      "parent-support"
    ).textContent = `Parental support: Very high`;
  }

  if (savedPrediction.Extracurricular === 0) {
    document.getElementById(
      "Extracurricular"
    ).textContent = `Extracurricular: No`;
  } else if (savedPrediction.Extracurricular === 1) {
    document.getElementById(
      "Extracurricular"
    ).textContent = `Extracurricular: Yes`;
  }
  if (savedPrediction.Sports === 0) {
    document.getElementById("Sports").textContent = `Sports: No`;
  } else if (savedPrediction.Sports === 1) {
    document.getElementById("Sports").textContent = `Sports: Yes`;
  }
  if (savedPrediction.Music === 0) {
    document.getElementById("Music").textContent = `Music: No`;
  } else if (savedPrediction.Music === 1) {
    document.getElementById("Music").textContent = `Music: Yes`;
  }
  if (savedPrediction.Volunteering === 0) {
    document.getElementById("Volunteering").textContent = `Volunteering: No`;
  } else if (savedPrediction.Volunteering === 1) {
    document.getElementById("Volunteering").textContent = `Volunteering: Yes`;
  }
} else {
  window.location.href = "single.html";
}
