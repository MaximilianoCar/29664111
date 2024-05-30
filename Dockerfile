
FROM ubuntu:latest


RUN apt-get update && apt-get install -y apache2


COPY . /var/www/html/


EXPOSE 80


CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

#comandos:

# docker build -t proyecto .

# docker run -d -p 8080:80 proyecto