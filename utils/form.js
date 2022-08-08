"use strict";
// требует settings.js, adjustable-output.js

const ajaxSend = async (formData) => {
  // создаем функцию отправки формы
  const fetchResp = await fetch(pageSettings.discussFormSendURI, {
    // указываем обработчик формы — telegram.php (или другой, указанный в settings.js)
    method: "POST", // метод, которым мы отправляем форму
    body: formData, // что будет внутри формы — содержимое input
  });
  if (!fetchResp.ok) {
    // если ошибка, то...
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`); // выводим статус ошибки и текст
  }
  return await fetchResp.text(); // если все хорошо, возвращаем ответ сервера
};

const forms = document.querySelectorAll("form"); // находим все теги form
forms.forEach((form) => {
  // для каждой формы...
  form.addEventListener("submit", function (e) {
    // отслеживаем событие отправки
    e.preventDefault(); // отменить стандартную отправку формы
    const formData = new FormData(this); // собираем все данные из формы

    ajaxSend(formData) // передаем данные из формы в обработчик
      .then((response) => {
        // если все успешно, то..
        this.innerHTML = ao.values.thanksReceivedRequest[ao.locale] || ao.values.thanksReceivedRequest[ao.fallbackLocale]; /* окно благодарности */
        form.reset(); /*  очищаем поля формы */
      })
      .catch((err) => console.error(err)); /* если ошибка, выводим в консоль */
  });
});
