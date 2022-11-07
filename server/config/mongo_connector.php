<?php
    require_once __DIR__.'/../vendor/autoload.php';

    class MongoConnection {
        public function getConnection(){
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/../');
        $dotenv->load();
        $client = new MongoDB\Client("mongodb://{$_ENV['MONGO_USER']}:{$_ENV['MONGO_PASS']}@{$_ENV['MONGO_HOST']}:{$_ENV['MONGO_PORT']}/admin");

        return $client;
    }
}
?>