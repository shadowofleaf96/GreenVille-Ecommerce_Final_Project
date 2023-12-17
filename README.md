# GreenVille Ecommerce Shop Project

![GreenVille Logo](https://github.com/shadowofleaf96/Ecommerce-Final-Project/blob/main/client/src/assets/logo.png?raw=true)

Welcome to GreenVille, an open-source MERN (MongoDB, Express.js, React.js, Node.js) stack ecommerce shop project. GreenVille is designed to provide a foundation for building a robust and scalable online bio Organic store. Whether you're a developer looking to learn MERN stack or an entrepreneur planning to kickstart your ecommerce venture, GreenVille is a great starting point.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure user authentication and authorization. (Completed)
- **Product Management**: Easily manage products, categories, subcategories. (Completed)
- **Shopping Cart**: Intuitive shopping cart functionality for users. (Completed, but need some improvements)
- **Payment Integration**: Seamless integration with popular payment gateways. (In Progress)
- **Order Management**: Track and manage customer orders efficiently. (In Progress)
- **Responsive Design**: Mobile-friendly and responsive UI for a great user experience. (In Progress)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/GreenVille.git
   ```

2. Change into the project directory:

   ```bash
   cd GreenVille
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

7. Create a `.env` file in the project root and configure your environment variables:

   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

8. Start the development server:

   ```bash
   cd client
   npm run dev
   cd ..
   cd client
   npx nodemon
   ```

Visit [http://localhost:5173](http://localhost:5173) to access the GreenVille application.

## Usage

1. **Create an Account**: Register for a new account on the GreenVille website.
2. **Explore Products**: Browse through the available products and categories.
3. **Add to Cart**: Add desired products to your shopping cart.
4. **Proceed to Checkout**: Complete the purchase by providing necessary details.
5. **Manage Orders**: View and manage your order history.

## Contributing

We welcome contributions from the community. If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request. Check our [contribution guidelines](CONTRIBUTING.md) for more details.
