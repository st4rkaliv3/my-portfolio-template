// Требует: adjustable-output-data.js
const ao = {
	values: aoLoadValues(),
	fallbackLocale: 'en',
	locale: 'ru'
};

(() => {
	const addingFields = document.querySelectorAll('[data-aoadd]');
	addingFields.forEach(e => {
		let outProp = e.dataset.aoprop || 'textContent';
		if (e.dataset.aoadd === 'pre' || e.dataset.aoadd === 'post') {
			e.dataset.aoinitial = e[outProp];
		}
	});
})();
/*
data-aoid - идентификатор фразы
data-aoprop - куда именно выводить (по умолчанию - textContent)
data-aoadd - вставка фразы
	none (или не задано) - перезаписать существующий контент
	pre - вставить перед контентом
	post - вставить после контента
*/
const aoValuesOutput = locale => {
	const fields = document.querySelectorAll('[data-aoid]');
	fields.forEach(e => {
		let outProp = e.dataset.aoprop || 'textContent';
		if (ao.values[e.dataset.aoid] || ao.values[e.dataset.aoid] === '') {
			let v = ao.values[e.dataset.aoid][ao.locale] || ao.values[e.dataset.aoid][ao.fallbackLocale] || '';
			if (v) {
				if (e.dataset.aoadd === 'pre') {
					e[outProp] = v + e.dataset.aoinitial;
				} else if (e.dataset.aoadd === 'post') {
					e[outProp] = e.dataset.aoinitial + v;
				} else {
					e[outProp] = v;
				}
			}
		}
	});
};

const aoLocaleUpdate = locale => {
	ao.locale = locale || ao.locale || ao.fallbackLocale;
	aoValuesOutput();
}

aoValuesOutput();