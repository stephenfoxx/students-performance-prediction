from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import os

from student_performance import StudentPerformance, StudentsPerformance, Home

app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)

##
## Actually setup the Api resource routing here
##
api.add_resource(StudentPerformance, '/student')
api.add_resource(StudentsPerformance, '/students')
api.add_resource(Home, '/')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3030))
    app.run(host='0.0.0.0', port=port, debug=True)
    #app.run(debug=True)