# BadawczyProjektZespolowy - MongoDB

### Prerequisites

Before running this application composer and mongodb is needed.

### Installation

To run this application you need to clone the repo and install npm packages.

1. Clone the repo
   ```sh
   git clone https://github.com/LeCarteloo/BadawczyProjektZespolowy.git
   ```
2. Install composer packages, it will install **mongodb** and **phpdotenv**
   ```sh
   composer install
   ```
3. Create .env file and provide information about your mongodb data (docker or mongodb atlas)
   ```
   MONGO_USER=<your_user>
   MONGO_PASS=<your_password>
   MONGO_HOST=<your_host>
   MONGO_PORT=<your_port>
   ```
4. You're good to go, you can start the app. (e.g with Xampp)
