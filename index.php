<?php
function buildGallery($dir)
{
    $files = scandir($dir);
    $files = array_diff($files, array('.', '..', '.DS_Store'));
    echo '<div class="gallery">';
    foreach ($files as $file) {
        if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
            echo '<img src="' . $dir . '/' . $file . '" onclick="window.open(\'' . $dir . '/' . $file . '\', \'_blank\')">';
        }
    }
    echo '</div>';
}
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
    <?php buildGallery('img'); ?>
</body>

</html>