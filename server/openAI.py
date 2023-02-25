import os
from dotenv import load_dotenv
import openai

def writeMeACoverLetter(link):
    load_dotenv()
    openai.organization = os.getenv('ORG')
    openai.api_key = os.getenv('OPENAIAPI')
    response = openai.Completion.create(
        model="text-davinci-001",
        prompt= link + " Write me a professional cover letter to apply for this job in less than 200 words",
        max_tokens=150,
        temperature= 1,
        top_p= 1,
        frequency_penalty= 1,
        presence_penalty= 1,
        best_of= 1
        )
    
    text = response["choices"][0]["text"][1:]
    print(text)
    return text


# writeMeACoverLetter(link)
