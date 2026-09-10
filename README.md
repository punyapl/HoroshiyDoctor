# Клиника "Хороший доктор"


## СТЕК
### Общее
- Nodejs 20.15.1
- Npm 10.7.0

### Фронтэнд
- Reactjs 19
- Sass 1.83.4

## Запуск
##### Установка зависимостей
```bash
npm i
```
##### Запуск
```bash
npm start
```
### PROD
#### Для продакшена необходима готовая сборка фротенда, лежащая в папке build!
##### Сборка фротенд
```bash
npm run build:prod
```
##### Пример Nginx
```bash
server {
    ...
    # Фронтэнд
    location / {
        root /var/www/static;
        try_files $uri $uri/ =404;
        index index.html index.htm;
    }
    ...
}
```