/**
 * Выполняет асинхронный HTTP-запрос для получения данных с сервера.
 * @param {string} url - URL-адрес, на который отправляется запрос.
 * @param {string} method - HTTP-метод запроса (например, "GET" или "POST").
 * @param {function} callback - Функция вызывающаяся в случае успешного завершения запроса, которая примет данные.
 * @returns {void}
 */
export function fetchData({
  url,
  method,
  callback,
}: {
  url: string;
  method: string;
  callback: Function;
}): void {
  const xhr = new XMLHttpRequest();

  let status: number | undefined = undefined;

  xhr.onreadystatechange = function () {
    status = this.status;

    if (this.readyState == 4) {
      if (this.status == 200) {
        callback(JSON.parse(this.responseText));
      } else if (this.status == 404) {
        callback();
        console.warn(
          'Failed to load resource: the server responded with a status of 404'
        );
      } else if (this.status == 0) {
        callback();
        console.warn('Произошла сетевая ошибка. Код ошибки: ' + status);
      } else {
        callback();
        console.warn('непредвиденная ошибка', this.status);
      }
    }
  };

  xhr.ontimeout = function () {
    callback();
    console.warn('Время запроса истекло. Код ошибки: ' + status);
  };

  xhr.open(method, url);

  try {
    xhr.send();
  } catch (e) {
    callback();
    console.error('Не удалось отправить запрос:', e);
  }
}
