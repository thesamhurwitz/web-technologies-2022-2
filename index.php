<?php
$photos = array(
    "img/photo1.jpg",
    "img/photo2.jpg",
    "img/photo3.png",
    "img/photo4.jpg",
    "img/photo5.jpg"
);
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Gallery</title>
    <style>
        .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .gallery img {
            margin: 10px;
            width: 200px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div class="gallery">
        <?php foreach ($photos as $photo): ?>
        <img src="<?php echo $photo; ?>" onclick="window.open('<?php echo $photo; ?>', '_blank')">
        <?php endforeach; ?>
    </div>
</body>

</html>