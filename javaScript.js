const btnSend = document.querySelector('.btn_js_1');
const btnGeo = document.querySelector('.btn_js_2');
const user = document.querySelector('.user');
const serv = document.querySelector('.serv');
const inPut = document.querySelector('.inp_mass');
const outPutAlert = document.querySelector('.alert');

const error = () => {
	outPutAlert.textContent = 'Невозможно получить данные!';
}

const success = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	user.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude};`
	user.textContent = 'Ваша Гео-локация';
}

document.addEventListener("DOMContentLoaded", function () {
    const websocket = new WebSocket('wss://echo.websocket.org/');

    btnSend.addEventListener("click", () => {
    	user.textContent = '';
		user.textContent = inPut.value;
		websocket.send(inPut.value);
	});

    
    websocket.onmessage = function(event) {
    	console.log("WebSocket message received:", event.data);
    	serv.textContent = ("WebSocket message received:", event.data);
	};

	btnGeo.addEventListener("click", () => {
		user.textContent = '';
		user.href = '';
		serv.textContent = '';

		if (!navigator.geolocation) {
			outPutAlert.textContent = 'Опредиление геолокации не поддерживается!';
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	})
	

});
