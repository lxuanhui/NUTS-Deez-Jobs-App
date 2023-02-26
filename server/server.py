from flask import Flask, request
from flask_cors import CORS
from  openAI import writeMeACoverLetter
from JobScraper_2 import grabJobScraper
from JobScraper import jobStreetScraper
# import datetime
# import requests
# import bs4
# from bs4 import BeautifulSoup
# import pandas as pd

# x = datetime.datetime.now()

app = Flask(__name__)
CORS(app)

@app.route('/time', methods = ['GET', 'POST'])
def getTime():
    # data = request.data()
    # print(data)

    

    

    if request.method == 'GET':
        print('GET')

    if request.method == 'POST':
        print("POST")
        data = request.get_json()
        print(data)
        print(data['searchfield'])
        
        jobStreetData = jobStreetScraper(data['searchfield'])
        grabJobData = grabJobScraper(data['searchfield'])
        print(grabJobData)
        print(jobStreetData)
        newData = grabJobData + jobStreetData
        return newData
        # [

        # {'logo': 'https://image-service-cdn.seek.com.au/3c492d032cfdda4b4e2272f25b4cc7912079eb4b/ee4dce1061f3f616224767ad58cb2fc751b8d2dc', 'companyName': 'TikTok', 'jobTitle': ['IOS Software Engineer, TikTok Mobile Experience'], 'salary': [0, 'JobStreet'], 'yearOfExperience': ['1 year'], 'noOfApplicants': 0, 'typeOfWork': '', 'source': ['JobStreet', 'https://www.jobstreet.com.sg/en/job/ios-software-engineer-tiktok-mobile-experience-10478781?jobId=jobstreet-sg-job-10478781&sectionRank=28&token=0~524a5a67-9879-426e-b541-d2d695b31469&fr=SRP%20View%20In%20New%20Tab']}, {'logo': 'https://image-service-cdn.seek.com.au/326b87f9502c5daea2178e91c3356d7c98c3879a/ee4dce1061f3f616224767ad58cb2fc751b8d2dc', 'companyName': 'Illumina Singapore Pte Ltd', 'jobTitle': ['Software Engineer (Contract) - (35544-JOB)'], 'salary': [0, 'JobStreet'], 'yearOfExperience': [], 'noOfApplicants': 0, 'typeOfWork': '', 'source': ['JobStreet', 'https://www.jobstreet.com.sg/en/job/software-engineer-contract-35544-job-10480193?jobId=jobstreet-sg-job-10480193&sectionRank=29&token=0~524a5a67-9879-426e-b541-d2d695b31469&fr=SRP%20View%20In%20New%20Tab']}

        # ]
@app.route('/coverLetter', methods = ['GET', 'POST'])
def getLetter():
    if request.method == 'POST':
        print("POST")
        data = request.get_json()
        text = writeMeACoverLetter(data['value'])
    return {'text': text}

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)