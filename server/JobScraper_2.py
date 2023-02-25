from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import re

def grabJobScraper(searchKey):
    op = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=op, executable_path="Users/chao_/chromedriver_win32/chromedriver")
    wait = WebDriverWait(driver, 2)
    actions = ActionChains(driver)
    driver.get("https://grabjobs.co/singapore/jobs-in-singapore")

    wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="keyword"]')))

    # Pass the CAPTCHA manually
    search_box = driver.find_element(By.XPATH, '//*[@id="keyword"]')
    search_box.send_keys(searchKey)
    search_box.send_keys(Keys.ENTER)


    wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="keyword"]')))

    # Find all elements with data-automation="job-card-logo"
    # job_elements = driver.find_elements(By.CLASS_NAME, 'card-body.px-3')
    job_elements = driver.find_elements(By.CLASS_NAME, 'has-text-black.link-card.btn-amplitude')


    # job_elements = driver.find_elements(By.CLASS_NAME, 'is-grabjobs-color.fw-bold')


    totalDict = []
    # Loop through each logo element and extract information
    for job in job_elements:

        # Extract all information
        job_title = job.find_element(By.CLASS_NAME, 'card-title.h5')
        job_link_href = job.get_attribute('href') # str
        company_name = job.find_element(By.CLASS_NAME, 'mx-2')
        salary = job.find_element(By.CLASS_NAME, 'is-grabjobs-color.fw-bold')
        image = job.find_element(By.CLASS_NAME, 'logo')
        src = image.get_attribute('data-src') # str

        salaryArray = re.split('\s+', salary.text)


        tempDict = {}
        tempDict['logo'] = str(src)
        tempDict['companyName'] = company_name.text
        tempDict['salary'] = [int(salaryArray[0].removeprefix('$')), int(salaryArray[2]), 'GrabJob'] if len(salaryArray) > 3 else [int(salaryArray[0].removeprefix('$')), int(salaryArray[0].removeprefix('$')), 'GrabJob']
        tempDict['yearOfExperience'] = ['0 years']
        tempDict['noOfApplicants'] = None
        tempDict['typeOfWork'] = None
        tempDict['source'] = ['GrabJob', str(job_link_href)]
        tempDict['jobTitle'] = job_title.text

        totalDict.append(tempDict)

    # print(totalDict)

    driver.close()
    return totalDict
    # job_link = job.find_element(By.CLASS_NAME, "card-title.h5")
    # job_link = job.find_element(By.XPATH, '//*[@class="card-title.h5"]')
    # job_link = job.find_elements(By.XPATH, '//html/body/div[3]/div[1]/div/div[2]/div[2]/a[2]/div/div/div[1]/h2')
    # print(job_link.text)
    # print(job_link_href.text)
    # print(job_title.text)
    # print(job.text)