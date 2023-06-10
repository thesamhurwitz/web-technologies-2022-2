INSERT INTO
    `products` (`name`, `description`, `price`, `image`)
VALUES
    (
        'Product 1',
        'Description of product 1',
        10.99,
        'product1.jpg'
    ),
    (
        'Product 2',
        'Description of product 2',
        15.99,
        'product2.jpg'
    ),
    (
        'Product 3',
        'Description of product 3',
        25.99,
        'product3.jpg'
    );

INSERT INTO
    `reviews` (`product_id`, `author`, `text`)
VALUES
    (1, 'John Doe', 'Great product!'),
    (1, 'Jane Smith', 'I love it!'),
    (
        2,
        'Mike Johnson',
        'Not bad, but could be better.'
    ),
    (
        3,
        'Sarah Williams',
        'Amazing quality and design.'
    ),
    (3, 'David Brown', 'Expensive, but worth it.');