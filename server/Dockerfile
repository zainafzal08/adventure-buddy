FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
COPY ./app/requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY ./app /app