# Student Performance Web App

## Overview

The Student Performance Web App is a project developed to analyze and predict student performance data. It uses Python Flask for the backend and Flask-RESTful API for creating RESTful services. This web app provides endpoints for data retrieval and operations, and it includes a simple frontend to display the data.

## Features

- **RESTful API**: Provides endpoints to perform operations on student performance.
- **User-Friendly Interface**: Simple and intuitive frontend for interaction.

## Technologies Used

- **Python**: Programming language.
- **Flask**: Web framework for building the backend.
- **Flask-RESTful**: Extension for creating RESTful APIs.
- **HTML/CSS/JavaScript**: Frontend technologies.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/emmyvera/student-performance-webapp.git
   cd student-performance-webapp
   ```

2. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install the Required Packages**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Application**:
   ```bash
   flask run
   ```

## API Endpoints

- **GET /**: Check the health of the server.
- **POST /student**: Predict a single student performance.
- **POST /students**: Predict students performance.

### Sample Requests

- **GET /api/students**:

  ```bash
  curl -X GET http://127.0.0.1:3030/
  ```

- **POST /student**:

  ```bash
  curl --location 'http://localhost:3030/student' \
  --header 'Content-Type: application/json' \
  --data '{
  "Gender": 0,
  "Ethnicity": 1,
  "ParentalEducation": 3,
  "StudyTimeWeekly": 10.5,
  "Absences": 3,
  "Tutoring": 1,
  "ParentalSupport": 2,
  "Extracurricular": 1,
  "Sports": 0,
  "Music": 1,
  "Volunteering": 0
  }'
  ```

- **POST /student**:
  ```bash
  curl --location 'http://localhost:3030/students' \
  --form 'file=@"/Student_performance_text_data.csv"'
  ```

## Project Structure

```
student-performance-webapp/
│
├── model/
│ ├── data_model.pkl
│
├── venv/
│
├── app.py
├── requirements.txt
├── README.md
└── student_performance.py
```
