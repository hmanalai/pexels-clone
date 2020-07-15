from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
import requests
import os  
import json

app = Flask(__name__)
Bootstrap(app)

@app.route("/home",  methods=["POST", "GET"])
def home():
    photos = None 
    result = None

    if request.method == "POST":
        search_keyword = request.form.get('search_bar')

        headers = {
        'Authorization': '563492ad6f917000010000018046cdcf27ad49f5ad3bd77b16d40700',
        }

        params = (
            ('query', search_keyword),
            ('per_page', 80),
        )

        response = requests.get('https://api.pexels.com/v1/search', headers=headers, params=params)
        photos = json.loads(response.text)['photos']

    return render_template("index.html",
                        photos = photos)





