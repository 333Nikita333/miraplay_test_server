# Test Task from company Doka Development (Back-end)
This Full Stack web application includes a back-end part responsible for authorizing users in [this test task](https://github.com/333Nikita333/miraplay_test_client). The development was carried out using the following technologies: NodeJS, ExpressJS, MongoDB (for storing user data), Mongoose (for interaction with MongoDB) ans JWT (to create access tokens).

## Routes:
**@ POST /api/users/register**<br>
User registration. Accepts an object with email and passwords fields. Returns a user object with token and email, or an error if such an email is already registered.<br>
**@ POST /api/users/login**<br>
User authorization. Accepts an object with email and password fields. Returns a user object with token and email, or error if such email address does not exist.<br>
**@ GET /api/users/current**<br>
Getting user data by his token. Returns a user object with email, or an error if there is no such email in the database.<br>
**@ POST /api/users/logout**<br>
Exit the current user from the profile. Removes the token from the user or returns an error if the user does not exist.

## Technologies Used
**Back-end**:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cors
