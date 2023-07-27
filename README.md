# Ankasa Ticketing API

This is the API of the Ankasa Ticketing project -> [Ankasa-ticketing](https://github.com/Ankasa-ticketing)

## About The Project

https://github.com/Ankasa-ticketing/ankasa-ticketing/tree/main

### Built With

This API was built with some technologies below:

![AGPL License](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![AGPL License](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![AGPL License](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Installation

If you clone this repo don't forget to install node modules / packages inside the project :

```
  npm install
```

And to run this project use

```bash
  npm run start
```


## API Reference

#### Get all tickets

```
  GET  /tickets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| | `string` | You can check all tickets from ur DB |


#### Get specific tickets

```
  GET /tickets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Have Id of spesific tickets |

#### Login

```
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try login with valid credentials |

#### Register

```
  POST /register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try register to have an account |


You can check the rest in repo folder ...


### Contributors
<a href = "https://github.com/Ankasa-ticketing/ankasa-ticketing/graphs/contributors">
  <img src="https://avatars.githubusercontent.com/u/68759989?s=60&amp;v=4" class="avatar avatar-user" alt="Fahmi Hadi" width="38" height="38">
  <img src="https://avatars.githubusercontent.com/u/121668350?s=60&amp;v=4" class="avatar avatar-user" alt="Ahmad Ubaildillah" width="38" height="38">
  <img src="https://avatars.githubusercontent.com/u/119777042?s=60&amp;v=4" class="avatar avatar-user" alt="Alif" width="38" height="38">
</a>
