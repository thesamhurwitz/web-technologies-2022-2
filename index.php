<?php
$title = 'Current Time';

function getCurrentTime()
{
    $hour = date('H');
    $minute = date('i');

    $hourText = getNumEnding($hour, array('час', 'часа', 'часов'));
    $minuteText = getNumEnding($minute, array('минута', 'минуты', 'минут'));

    return "$hourText $minuteText";
}

function getNumEnding($number, $endings)
{
    $number = $number % 100;
    if ($number >= 11 && $number <= 19) {
        $ending = $endings[2];
    } else {
        $i = $number % 10;
        switch ($i) {
            case (1):
                $ending = $endings[0];
                break;
            case (2):
            case (3):
            case (4):
                $ending = $endings[1];
                break;
            default:
                $ending = $endings[2];
        }
    }
    return "$number $ending";
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>
        <?php echo $title; ?>
    </title>
</head>

<body>
    <main>
        <p>Текущее время:
            <?php echo getCurrentTime(); ?>
        </p>
    </main>

</body>

</html>