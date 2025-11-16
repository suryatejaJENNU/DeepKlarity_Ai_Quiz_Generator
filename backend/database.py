import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

MYSQL_USER = "root"
MYSQL_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD")
MYSQL_HOST = "127.0.0.1"
MYSQL_DB = "quiz_db"

DATABASE_URL = (
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"
    "?charset=utf8mb4"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()
