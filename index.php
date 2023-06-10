<?php
function buildGallery($dir)
{
    $files = scandir($dir);
    echo '<div class="gallery">';
    foreach ($files as $file) {
        if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
            echo '<img src="' . $dir . '/thumbnails/' . $file . '" onclick="window.open(\'' . $dir . '/' . $file . '\', \'_blank\')">';
        }
    }
    echo '</div>';
}

function resizeImage($source, $destination, $maxWidth, $maxHeight)
{
    list($width, $height, $type) = getimagesize($source);
    $ratio = min($maxWidth / $width, $maxHeight / $height);

    $newWidth = round($ratio * $width);
    $newHeight = round($ratio * $height);

    switch ($type) {
        case IMAGETYPE_JPEG:
            $sourceImage = imagecreatefromjpeg($source);
            break;
        case IMAGETYPE_PNG:
            $sourceImage = imagecreatefrompng($source);
            break;
        case IMAGETYPE_GIF:
            $sourceImage = imagecreatefromgif($source);
            break;
        default:
            return false;
    }

    $destinationImage = imagecreatetruecolor($newWidth, $newHeight);
    imagecopyresampled($destinationImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    switch ($type) {
        case IMAGETYPE_JPEG:
            imagejpeg($destinationImage, $destination);
            break;
        case IMAGETYPE_PNG:
            imagepng($destinationImage, $destination);
            break;
        case IMAGETYPE_GIF:
            imagegif($destinationImage, $destination);
            break;
        default:
            return false;
    }

    imagedestroy($sourceImage);
    imagedestroy($destinationImage);

    return true;
}

if (isset($_FILES['image'])) {
    $allowedTypes = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF);
    $detectedType = exif_imagetype($_FILES['image']['tmp_name']);
    if (!in_array($detectedType, $allowedTypes)) {
        echo 'Unsupported filetype';
        exit;
    }

    $maxSize = 1024 * 1024;
    if ($_FILES['image']['size'] > $maxSize) {
        echo 'File too large';
        exit;
    }

    $filename = uniqid() . '.jpg';

    $originalPath = 'img/' . $filename;
    move_uploaded_file($_FILES['image']['tmp_name'], $originalPath);

    $thumbnailPath = 'img/thumbnails/' . $filename;
    resizeImage($originalPath, $thumbnailPath, 200, 200);

    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
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

        form {
            margin-top: 20px;
        }

        input[type="file"] {
            display: block;
            margin-bottom: 10px;
        }

        input[type="submit"] {
            display: block;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <?php buildGallery('img'); ?>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="image">
        <input type="submit" value="Загрузить">
    </form>
</body>

</html>