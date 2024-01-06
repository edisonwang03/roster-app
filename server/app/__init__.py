from flask import Flask
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DB_URI = os.getenv("MONGO_DB_URI")

client = MongoClient(MONGO_DB_URI)
db = client['roster']

app = Flask(__name__)

from app import routes