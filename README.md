<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project is a backend application for a product shop, developed using the NestJS framework. The application provides a robust and scalable solution for managing various aspects of an online store. Here is a detailed overview of the core features and components of the project:

### Core Resources

1. **Auth**

   - **Purpose**: Handles user authentication and registration.
   - **Features**: Allows users to create accounts and log in. It manages user sessions and ensures secure access to the system.

2. **Order**

   - **Purpose**: Facilitates the process of placing orders for products.
   - **Features**: Users can create and manage their orders through this resource. It ensures that orders are processed accurately and efficiently. Additionally, upon placing an order, the system sends a confirmation email to the user with detailed information about their order. This functionality is powered by an integrated email sender service, ensuring that users receive timely updates and confirmations regarding their purchases.

3. **Products**

   - **Purpose**: Manages CRUD (Create, Read, Update, Delete) operations for product data.
   - **Features**: Provides functionalities to add, update, retrieve, and delete products in the database. This resource maintains the product catalog and ensures data integrity.

4. **Profile**

   - **Purpose**: Manages user profiles and related functionalities.
   - **Features**: Allows users to view and update their profile information, manage their cart, access their order history, and change their passwords. It ensures a personalized experience for users.

5. **Admin Panel**

   - **Purpose**: Provides advanced management capabilities for admin and moderator users.
   - **Features**:
     - View and manage user accounts, profiles, and orders.
     - Grant roles to users, changing their access permissions.
     - Retrieve detailed information about orders and filter them by status.
     - The panel is protected by role-based access control, allowing only authorized users (Admins and Moderators) to perform actions.

### Role-Based Access Control

The application incorporates a role-based access control system to ensure that only authorized users can access specific resources. This system is implemented using NestJS guards, which:

- **Validate JWT Tokens**: Ensure that users are authenticated and their tokens are valid.
- **Check User Roles**: Verify that users have the appropriate roles required to access particular endpoints. Roles include `User`, `Admin`, and `Moderator`, each with different levels of access permissions.

### Swagger API Documentation

For a detailed overview of the available API endpoints, request/response structures, and data models, the Swagger documentation is available at `/api`. This documentation provides interactive API exploration and helps developers understand and integrate with the API efficiently.

### Additional Information

This project is designed with scalability and security in mind, making it suitable for a production environment. The use of NestJS ensures that the application is maintainable and extensible, while the role-based access control system adds an extra layer of security.

Feel free to explore the API documentation, install the application, and contribute to its development. For any issues or support, please refer to the [NestJS documentation](https://docs.nestjs.com/support) and community resources.

## Installation

```bash
$ pnpm install
```

## Running the app

To run this application, you need to set up several environment variables. Create a `.env` file in the root directory of the project and add the following variables:

- `DB_CONNECT`: The connection string for your database.
- `PORT`: The port on which the server will run.
- `HASH_LVL`: The hashing level for password security.
- `JWT_SECRET`: The secret phrase used for JWT (JSON Web Token) generation and verification.
- `EMAIL_API_KEY`: The API key for the email sender service.
- `EMAIL`: The email address from which the emails will be sent.
- `EMAIL_TEMPLATE_ID`: The ID of the email template used by the email sender service.

Here is an example of what the `.env` file might look like:

```env
DB_CONNECT=mongodb://username:password@host:port/database
PORT=3000
HASH_LVL=10
JWT_SECRET=your_jwt_secret_phrase
EMAIL_API_KEY=your_email_api_key
EMAIL=your_email@example.com
EMAIL_TEMPLATE_ID=your_email_template_id
```

After setting up the .env file, you can start the application using the following commands:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
