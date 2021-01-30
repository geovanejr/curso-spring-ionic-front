# Express Delivery
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/geovanejr/curso-spring-ionic-front/blob/master/LICENSE) 

# Sobre o projeto

Sistema de Pedidos é uma aplicação full stack web e mobile construída a partir do curso "Spring Boot, Hibernate, REST, Ionic, JWT, S3, MySQL, MongoDB" da Udemy (https://www.udemy.com/course/spring-boot-ionic/)

A aplicação consiste em um sistema de vendas de produtos, com autenticação via token, escolha de produtos a partir de categorias e a finalização do pedido (com envio de email ao cliente).

## Layout mobile
![Mobile 1](https://github.com/acenelio/assets/raw/main/sds1/mobile1.png) ![Mobile 2](https://github.com/acenelio/assets/raw/main/sds1/mobile2.png)

## Layout web
![Web 1](https://github.com/acenelio/assets/raw/main/sds1/web1.png)

![Web 2](https://github.com/acenelio/assets/raw/main/sds1/web2.png)

## Modelo conceitual
![Modelo Conceitual](https://github.com/acenelio/assets/raw/main/sds1/modelo-conceitual.png)

# Tecnologias utilizadas
## Back end
- Java
- Spring Boot
- JPA / Hibernate
- MySQL
- Maven
- Envio de email com SMTP da Google
- Armazenamento de imagens com storage S3 Amazon
- Autenticação com token JWT

## Front end
- HTML / CSS / JS / TypeScript
- Angular
- Ionic
## Implantação em produção
- Back end: Heroku
- Front end web: Netlify
- Banco de dados: MySQL

# Como executar o projeto

## Back end
Pré-requisitos: Java 11

```bash
# clonar repositório
git clone https://github.com/devsuperior/sds1-wmazoni

# entrar na pasta do projeto back end
cd backend

# executar o projeto
./mvnw spring-boot:run
```

## Front end web
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/devsuperior/sds1-wmazoni

# entrar na pasta do projeto front end web
cd front-web

# instalar dependências
yarn install

# executar o projeto
yarn start
```

# Autor

Geovane Soares Galvão Junior

https://www.linkedin.com/in/geovane-junior-7333412/
