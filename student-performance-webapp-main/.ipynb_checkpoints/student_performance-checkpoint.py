from flask import Flask, request, jsonify, send_file
from flask_restful import reqparse, abort, Api, Resource, fields
import pandas as pd
import pickle
import json
from io import BytesIO


# Load the model
with open('model/data_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Validate User Input
parser = reqparse.RequestParser()
parser.add_argument('Gender', type=int, help='Gender 0: male, 1: female')
parser.add_argument('Ethnicity', type=int, help='Ethnicity 0: Caucasian, 1: African American, 2: Asian, 3: Other')
parser.add_argument('ParentalEducation', type=int, help='Parental Education 0: None, 1: High School, 2: Some College, 3: Bachelor\'s, 4: Higher')
parser.add_argument('StudyTimeWeekly', type=float, help='Weekly study time in hours (0 to 20)')
parser.add_argument('Absences', type=int, help='Number of absences during the school year (0 to 30)')
parser.add_argument('Tutoring', type=int, help='Tutoring status 0: No, 1: Yes')
parser.add_argument('ParentalSupport', type=int, help='Parental Support 0: None, 1: Low, 2: Moderate, 3: High, 4: Very High')
parser.add_argument('Extracurricular', type=int, help='Participation in extracurricular activities 0: No, 1: Yes')
parser.add_argument('Sports', type=int, help='Participation in sports 0: No, 1: Yes')
parser.add_argument('Music', type=int, help='Participation in music activities 0: No, 1: Yes')
parser.add_argument('Volunteering', type=int, help='Participation in volunteering 0: No, 1: Yes')

def map_to_grade(prediction):
    grade_map = {
        0.0: 'A',
        1.0: 'B',
        2.0: 'C',
        3.0: 'D',
        4.0: 'F'
    }
    
    return grade_map.get(prediction, 'Unknown')

#Home
class Home(Resource):
    def get(self):
        return jsonify({'message': "Welcome to the student performance prediction API!"})

# Student Performance
class StudentPerformance(Resource):
    def get(self):
        return jsonify({'message': "Welcome to the student performance prediction API!"})
    
    def post(self):
        # Get user input
        args = parser.parse_args()

        # Prepare dataframe 
        data = {
            'Gender': args['Gender'],
            'Ethnicity': args['Ethnicity'],
            'ParentalEducation': args['ParentalEducation'],
            'StudyTimeWeekly': args['StudyTimeWeekly'],
            'Absences': args['Absences'],
            'Tutoring': args['Tutoring'],
            'ParentalSupport': args['ParentalSupport'],
            'Extracurricular': args['Extracurricular'],
            'Sports': args['Sports'],
            'Music': args['Music'],
            'Volunteering': args['Volunteering']
        }

        df = pd.DataFrame(data, index=[0])
        
        # Make predictions
        prediction = model.predict(df)
        
        # Add predictions to the DataFrame
        df['Predictions'] = prediction
        df['PredictedGradeClass'] = map_to_grade(prediction[0])
        
        # Convert the DataFrame to JSON
        result = df.to_json(orient='records')


        # Parse the JSON string into Python object (list of dictionaries)
        data = json.loads(result)
        return data[0], 200

#Multiple Student Performance
class StudentsPerformance(Resource):
    def get(self):
        return jsonify({'message': "Welcome to the student performance prediction API!"})

    def post(self):
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'})
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'})
        
        if file and file.filename.endswith('.csv'):
            try:
                # Read the CSV file
                student_df = pd.read_csv(file)
                # Ensure the necessary columns are present
                required_columns = ['StudentID', 'Age','Gender', 'Ethnicity', 'ParentalEducation', 'StudyTimeWeekly',
                            'Absences', 'Tutoring', 'ParentalSupport', 'Extracurricular', 'Sports',
                            'Music', 'Volunteering']
                required_columns_for_testing = ['Gender', 'Ethnicity', 'ParentalEducation', 'StudyTimeWeekly',
                            'Absences', 'Tutoring', 'ParentalSupport', 'Extracurricular', 'Sports',
                            'Music', 'Volunteering']
                      
                df = student_df.drop(['StudentID', 'Age'], axis=1)
          
                if not all(column in student_df.columns for column in required_columns):
                    return jsonify({'error': f'Missing one of the required columns: {required_columns}'})
                
                
                # Make predictions
                predictions = model.predict(df[required_columns_for_testing])
                
                # Add predictions to the DataFrame
                student_df['Predictions'] = predictions
                student_df['PredictedGradeClass'] = student_df['Predictions'].apply(map_to_grade)
                
                # Save the results to a new CSV file in memory
                result = BytesIO()
                student_df.to_csv(result, index=False)
                result.seek(0)
                
                # Send the results as a downloadable file
                #return send_file(result, mimetype='text/csv', download_name='predictions.csv', as_attachment=True)

                # Send the results
                res = student_df.to_json(orient='records')
                data = json.loads(res)
                return data, 200
            except Exception as e:
                return jsonify({'error': str(e)})
        else:
            return jsonify({'error': 'Allowed file type is csv'})

