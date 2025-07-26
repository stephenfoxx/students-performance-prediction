document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const studentData = {};
  formData.forEach((value, key) => {
    studentData[key] = value;
  });

  console.log("Student Data:", studentData);

  // Here you can add the logic to send the studentData to your backend or process it using SVM.
  // For now, we'll just log it to the console.

  //   fetch("http://localhost:3030/student", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res)
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));

  // Get values from form inputs
  const StudentID = document.getElementById("studentID").value;
  const Age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const ethnicity = document.getElementById("ethnicity").value;
  const parentalEducation = document.getElementById("parentalEducation").value;
  const studyTimeWeekly = document.getElementById("studyTimeWeekly").value;
  const absences = document.getElementById("absences").value;
  const tutoring = document.getElementById("tutoring").value;
  const parentalSupport = document.getElementById("parentalSupport").value;
  const extracurricular = document.getElementById("extracurricular").value;
  const sports = document.getElementById("sports").value;
  const music = document.getElementById("music").value;
  const volunteering = document.getElementById("volunteering").value;

  // Construct JSON object
  const data = {
    Gender: parseInt(gender),
    Ethnicity: parseInt(ethnicity),
    ParentalEducation: parseInt(parentalEducation),
    StudyTimeWeekly: parseFloat(studyTimeWeekly),
    Absences: parseInt(absences),
    Tutoring: parseInt(tutoring),
    ParentalSupport: parseInt(parentalSupport),
    Extracurricular: parseInt(extracurricular),
    Sports: parseInt(sports),
    Music: parseInt(music),
    Volunteering: parseInt(volunteering),
  };

  // Prepare fetch request
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  // Send fetch request
  fetch("http://127.0.0.1:3030/student", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      sessionStorage.setItem("predictionResult", result);
      sessionStorage.setItem("StudentID", StudentID);
      sessionStorage.setItem("Age", Age);

      // Redirect to another page where you want to display the result
      window.location.href = "result.html";
    })
    .catch((error) => console.error(error));
});
