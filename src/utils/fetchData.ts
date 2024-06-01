
/**
 * Выполняет асинхронный HTTP-запрос для получения данных с сервера.
 * @param {string} url - URL-адрес, на который отправляется запрос.
 * @param {string} method - HTTP-метод запроса (например, "GET" или "POST").
 * @param {function} callback - Функция вызывающаяся в случае успешного завершения запроса, которая примет данные.
 * @returns {void}
 */
export function fetchData({url, method, callback}: {url: string, method: string, callback: Function}): void {
	const xhr = new XMLHttpRequest();

	let status = undefined;

	xhr.onreadystatechange = function() {
		status = this.status;

    if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
	  }
	};

	xhr.onerror = function() {
    console.warn("Произошла сетевая ошибка. Код ошибки: " + status);
  };

  xhr.ontimeout = function() {
    console.warn("Время запроса истекло. Код ошибки: " + status);
  };

	xhr.open(method, url);
	
	try {
    xhr.send();
  } catch (e) {
    console.error("Не удалось отправить запрос:", e);
  }
}