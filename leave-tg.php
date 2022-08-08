<?php

$name = $_POST['name']; // получаем имя клиента
$email = $_POST['email']; // получаем почту клиента
$message = $_POST['msg']; // получаем сообщение клиента

require('tg-bot-credentials.php');

// Собираем данные в один массив 
$arr = array(
  'Клиент: ' => $name,
  'Email: ' => $email,
  'Сообщение: ' => $message
);

// составляем сообщение из данных массива
foreach($arr as $key => $value) {
  $txt .= $key."<b> ". urlencode($value)."</b> "."%0A";
};

// даем команду боту отправить сообщение с текстом
$sendToTelegram = fopen("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) { 
  return true; // если прошло успешно, возвращаем ответ true
} else {
  return false; // если ошибка, возвращаем false
}
?>