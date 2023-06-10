<html>

<head></head>

<body>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        li {
            display: inline-block;
            margin: 10px;
            border: 1px solid #ccc;
            padding: 10px;
            width: 200px;
            vertical-align: top;
        }

        img {
            max-width: 100%;
        }

        h2,
        h3 {
            margin-top: 20px;
        }

        form label {
            display: block;
            margin-bottom: 5px;
        }

        form input[type="text"],
        form input[type="email"],
        form select,
        form textarea {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        form input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        form input[type="submit"]:hover {
            background-color: #3e8e41;
        }

        .product,
        .review {
            border: 1px solid gray;
            margin-bottom: 5px;
        }
    </style>

    <?php
    $host = "localhost";
    $user = "root";
    $password = "root";
    $dbname = "catalog";
    $dsn = "mysql:host=$host;dbname=$dbname";
    $options = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    try {
        $pdo = new PDO($dsn, $user, $password, $options);
    } catch (PDOException $e) {
        echo "Cannot connect to database: " . $e->getMessage();
    }

    if (!isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM products");
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo "<h1>Catalog</h1>";
        foreach ($products as $product) {
            echo "
                <div class='product'>
                    <img width='200' height='200' src='images/{$product['image']}' alt='{$product['name']}' />
                    <h2>{$product['name']}</h2>
                    <p>{$product['description']}</p>
                    <p>Price: \${$product['price']}</p>
                    <a href='?id={$product['id']}'>Read more...</a>
                </div>";
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        try {
            $query = $pdo->prepare('INSERT INTO reviews (product_id, author, text) VALUES (:product_id, :author, :text)');
            $query->bindParam(':product_id', $_POST['product_id'], PDO::PARAM_INT);
            $query->bindParam(':author', $_POST['author'], PDO::PARAM_STR);
            $query->bindParam(':text', $_POST['text'], PDO::PARAM_STR);

            $query->execute();
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id=:id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        echo "<h1>{$product['name']}</h1>";
        echo "<img width='300' height='300' src='images/{$product['image']}' alt='{$product['name']}' />";
        echo "<p>{$product['description']}</p>";
        echo "<p>Price: \${$product['price']}</p>";

        $stmt = $pdo->prepare("SELECT * FROM reviews WHERE product_id=:id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo "<h2>Reviews</h2>";
        if (count($reviews) == 0) {
            echo "<p>No reviews yet.</p>";
        } else {
            foreach ($reviews as $review) {
                echo "<div class='review'>";
                echo "<p>{$review['text']}</p>";
                echo "<p>Author: {$review['author']}</p>";
                echo "</div>";
            }
        }

        echo "<h2>Leave a review</h2>
            <form method='POST' action='?id={$_GET['id']}'>
                <input type='hidden' name='product_id' value='{$_GET['id']}' />
                <label>Name:</label><br />
                <input type='text' name='author' /><br />
                <label>Comment:</label><br />
                <textarea name='text'></textarea><br />
                <input type='submit' value='Send' />
            </form>";
    }

    $pdo = null;
    ?>
</body>

</html>