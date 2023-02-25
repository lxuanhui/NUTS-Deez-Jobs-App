from flask import Flask
from flask_cors import CORS
import datetime

x = datetime.datetime.now()

app = Flask(__name__)
CORS(app)

@app.route('/time')
def getTime():
    return {
     "logo": "https://media.licdn.com/dms/image/C560BAQE0iX_dgdH7nA/company-logo_100_100/0/1672279162274?e=1685577600&v=beta&t=0FlikIFsw3XQOIKrAu7lVW2yMtsGC-ZQFuyiBTLJO8g",
     "companyName": "Shopee",
     "salary": ["$5000", "LinkedIn"],
     "yearOfExperience": [0, 2],
     "noOfApplicants": [127, "LinkedIn"],
     "typeOfWork": "WFH",
     "source": ["LinkedIn", "https://www.linkedin.com/jobs/search/?currentJobId=3289369580&keywords=software%20engineer%20shopee"]

    }

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)