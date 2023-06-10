<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
</head>

<body>
    <section>
        <h2>Task 1</h2>
        <?php
        $i = 0;
        do {
            if ($i == 0) {
                echo "$i - это ноль.<br>";
            } elseif ($i % 2 == 0) {
                echo "$i - чётное число.<br>";
            } else {
                echo "$i - нечётное число.<br>";
            }
            $i++;
        } while ($i <= 10);
        ?>
    </section>

    <section>
        <h2>Task 2</h2>
        <?php
        $regions = [
            "Московская область" => ["Москва", "Зеленоград", "Клин"],
            "Ленинградская область" => ["Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"],
            "Рязанская область" => ["Рязань", "Касимов", "Скопин"]
        ];

        foreach ($regions as $region => $cities) {
            echo "$region:<br>";
            foreach ($cities as $city) {
                echo "$city, ";
            }
            echo "<br>";
        }
        ?>
    </section>

    <section>
        <h2>Task 3</h2>
        <?php
        $translit = [
            'а' => 'a',
            'б' => 'b',
            'в' => 'v',
            'г' => 'g',
            'д' => 'd',
            'е' => 'e',
            'ё' => 'yo',
            'ж' => 'zh',
            'з' => 'z',
            'и' => 'i',
            'й' => 'y',
            'к' => 'k',
            'л' => 'l',
            'м' => 'm',
            'н' => 'n',
            'о' => 'o',
            'п' => 'p',
            'р' => 'r',
            'с' => 's',
            'т' => 't',
            'у' => 'u',
            'ф' => 'f',
            'х' => 'h',
            'ц' => 'ts',
            'ч' => 'ch',
            'ш' => 'sh',
            'щ' => 'sch',
            'ъ' => '',
            'ы' => 'y',
            'ь' => '',
            'э' => 'e',
            'ю' => 'yu',
            'я' => 'ya'
        ];

        function translit($str)
        {
            global $translit;
            $result = '';
            for ($i = 0; $i < mb_strlen($str); $i++) {
                $char = mb_substr($str, $i, 1);

                if (isset($translit[$char])) {
                    $result .= $translit[$char];
                } else {
                    $result .= $char;
                }
            }
            return $result;
        }

        echo translit("задание номер три");
        ?>
    </section>

    <section>
        <h2>Task 4</h2>
        <?php
        $menu = [
            "Home",
            "About",
            "Services" => ["Web", "Mobile", "SEO"],
            "Contacts"
        ];

        function generateMenu($menu)
        {
            echo "<ul>";
            foreach ($menu as $key => $item) {
                if (is_array($item)) {
                    echo "<li>$key";
                    generateMenu($item);
                    echo "</li>";
                } else {
                    echo "<li>$item</li>";
                }
            }
            echo "</ul>";
        }

        generateMenu($menu);
        ?>
    </section>

    <section>
        <h2>Task 6</h2>
        <?php
        $regions = [
            "Московская область" => ["Москва", "Зеленоград", "Клин"],
            "Ленинградская область" => ["Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"],
            "Рязанская область" => ["Рязань", "Касимов", "Скопин"]
        ];

        foreach ($regions as $region => $cities) {
            echo "$region:<br>";
            foreach ($cities as $city) {
                if (mb_substr($city, 0, 1) == "К") {
                    echo "$city, ";
                }
            }
            echo "<br>";
        }
        ?>
    </section>
</body>

</html>