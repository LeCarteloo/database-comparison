<?php
    include_once 'config/mongo_connector.php';

    $connection = new MongoConnection();
    $client = $connection->getConnection();

    $collection = $client->selectCollection('DatabaseComparison', 'inventory');
    $result = $collection->findOne(['item' => 'canvas']);
    echo json_encode($result);
?>