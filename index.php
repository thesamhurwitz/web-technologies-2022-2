<?php

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
    <section>
        <h3>Task 1</h3>
        <div>
            <?php
            $a = 5;
            $b = -3;

            if ($a >= 0 && $b >= 0) {
                echo $a - $b;
            } elseif ($a < 0 && $b < 0) {
                echo $a * $b;
            } else {
                echo $a + $b;
            }
            ?>
        </div>
    </section>
    <section>
        <h3>Task 2</h3>
        <div>
            <?php
            $a = rand(0, 15);

            switch ($a) {
                case 0:
                    echo "0<br>";
                case 1:
                    echo "1<br>";
                case 2:
                    echo "2<br>";
                case 3:
                    echo "3<br>";
                case 4:
                    echo "4<br>";
                case 5:
                    echo "5<br>";
                case 6:
                    echo "6<br>";
                case 7:
                    echo "7<br>";
                case 8:
                    echo "8<br>";
                case 9:
                    echo "9<br>";
                case 10:
                    echo "10<br>";
                case 11:
                    echo "11<br>";
                case 12:
                    echo "12<br>";
                case 13:
                    echo "13<br>";
                case 14:
                    echo "14<br>";
                case 15:
                    echo "15<br>";
            }
            ?>
        </div>
    </section>

    <section>
        <h3>Task 3+4</h3>
        <div>
            <?php
            function sum($a, $b)
            {
                return $a + $b;
            }

            function sub($a, $b)
            {
                return $a - $b;
            }

            function mul($a, $b)
            {
                return $a * $b;
            }

            function div($a, $b)
            {
                return $a / $b;
            }

            function mathOperation($arg1, $arg2, $operation)
            {
                switch ($operation) {
                    case 'sum':
                        return sum($arg1, $arg2);
                    case 'sub':
                        return sub($arg1, $arg2);
                    case 'mul':
                        return mul($arg1, $arg2);
                    case 'div':
                        return div($arg1, $arg2);
                }
            }

            echo mathOperation(5, 3, 'sum');
            ?>
        </div>
    </section>

    <section>
        <h3>Task 5</h3>
        <div>
            <?php
            echo date('Y');

            $date = date('Y');
            require('date.php');

            $content = file_get_contents('date.html');
            $content = str_replace("{{ date }}", $date, $content);
            echo $content;
            ?>
        </div>
    </section>

    <section>
        <h3>Task 6</h3>
        <div>
            <?php
            function power($val, $pow)
            {
                if ($pow == 0) {
                    return 1;
                } else {
                    return $val * power($val, $pow - 1);
                }
            }

            echo power(2, 10);
            ?>
        </div>
    </section>

</body>

</html>