document
  .getElementById("bulkUploadForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("csvFile");
    // Check if a file is selected
    if (fileInput.files.length > 0) {
      const fileName = fileInput.value;
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      // Send fetch request
      fetch("http://127.0.0.1:3030/students", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          sessionStorage.setItem("BulkpredictionResult", result);
          // Redirect to another page where you want to display the result
          window.location.href = "result-bulk.html";
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("No file selected.");
    }
  });
