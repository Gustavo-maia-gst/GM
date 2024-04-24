from python:3.12.3-bullseye

COPY ./back-end /src
WORKDIR /src

RUN pip install -r requirements.txt 

EXPOSE 8000

ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
