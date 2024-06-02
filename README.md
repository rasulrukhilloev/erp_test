Doing below task WITHOUT ORM with this stack: Express(v5) and Mysql as db

RUN FIRST: npm run setupDB 

RUN in dev mode: npm run dev

DOWNLOAD and RUN mysql image:</br>
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql

CONNECT TO MYSQL: sudo docker exec -it [container-id] mysql -u root -pselec


Задача:

Сделать сервис с REST API.

Авторизация по bearer токену (/info, /logout, /file(все роуты) );

Настроить CORS для доступа с любого домена;

DB – Mysql;

Токен создавать при каждой авторизации, действителен 10 минут. Продлевать по истечению, с помощью refresh токена;

Реализовать на основе фреймворка express js;

API:

/signin [POST] - запрос bearer токена по id и паролю;

/signin/new_token [POST]  - обновление bearer токена по refresh токену

/signup [POST] - регистрация нового пользователя;

Поля id и password, id это номер телефона или email;

/file/upload [POST] - добавление нового файла в систему и запись параметров файла в базу: название, расширение, MIME type, размер, дата загрузки;

/file/list [GET]  выводит список файлов и их параметров из базы с использованием пагинации с размером страницы, указанного в передаваемом параметре list_size, по умолчанию 10 записей на страницу, если параметр пустой. Номер страницы указан в параметре page, по умолчанию 1, если не задан;

/file/delete/:id [DELETE] - удаляет документ из базы и локального хранилища;

/file/:id [GET] - вывод информации о выбранном файле;

/file/download/:id [GET] - скачивание конкретного файла;

/file/update/:id [PUT] - обновление текущего документа на новый в базе и локальном хранилище;
При удачной регистрации вернуть пару  bearer токен и refresh токен;

/info [GET] - возвращает id пользователя;

/logout [GET] - выйти из системы;

После выхода необходимо заблокировать текущие токены пользователя. При следующем входе, пользователь должен получить новую пару токенов, отличную от тех, которые были при выходе;

Старые токены должны перестать работать после выхода;

Вход в API может осуществлять несколько устройств под одним логином.

После выхода одного из устройств, остальные устройства одного пользователя должны продолжать работать.

Download and Run Mysql via docker image:

docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql

Connect to Mysql via terminal:

sudo docker exec -it [container-id] mysql -u root -p



