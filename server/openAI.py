import os
import openai
from dotenv import load_dotenv
load_dotenv()

api_key = os.environ.get("openai_key")
organization = os.environ.get("organization")


def writeMeACoverLetter(link):
    openai.organization = organization
    openai.api_key = api_key
    response = openai.Completion.create(
        model="text-davinci-001",
        prompt= link + " Write me a professional cover letter to apply for this job in less than 200 words",
        max_tokens=200,
        temperature= 0.7,
        top_p= 1,
        frequency_penalty= 1,
        presence_penalty= 1,
        best_of= 1
        )
    
    text = response["choices"][0]["text"][1:]
    print(text)
    return text


# writeMeACoverLetter(link)
