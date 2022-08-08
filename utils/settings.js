// Настройки внутри этого блока
const pageSettings = {
	discussFormSendURI: 'leave-tg.php'
};
// ============================

/*
data-sid - идентификатор настройки
data-sprop - куда ее записать (по умолчанию - textContent)
*/
const settingsApply = () => {
	const fields = document.querySelectorAll('[data-sid]');
	fields.forEach(e => {
		e[e.dataset.sprop || 'textContent'] = pageSettings[e.dataset.sid] || '';
	});
};

settingsApply();