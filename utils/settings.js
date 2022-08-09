// Настройки внутри этого блока
const pageSettings = {
	discussFormSendURI: 'leave-tg.php',
	skillsTools: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'SCSS', 'PHP', 'MySQL'],
	socialLinks: {
		wrapperTag: 'li',
		wrapperClassName: 'bragging-links__item',
		linkClassName: 'bragging-links__link',
		iconClassName: 'bragging-links__icon',
		iconDir: 'assets/images/icons/social/',
		links: [
			'https://t.me/st4rkaliv3',
			'https://github.com/st4rkaliv3',
			'https://nowapp.me/4w350m3_m1k3',
			'http://muswriter2k.tora.ru'
		],
		linksIcons: [
			//[0] - имя файла иконки, [1] - расширение
			['telegram', 'svg'],
			['github', 'svg'],
			['now', 'svg'],
			['website', 'svg']
		]
	}
};
// ============================

/*
data-sid - идентификатор настройки
data-sprop - куда ее записать (по умолчанию - textContent)
data-sarrmode - в каком виде записать, если это массив:
 - prefabNest - каждый элемент массива заключить в блоки, подобные вложенному в текущий блок
   (пока поддерживает только 1й уровень вложенности)
*/
const settingsApply = () => {
	const fields = document.querySelectorAll('[data-sid]');
	fields.forEach(e => {
		let v = pageSettings[e.dataset.sid] || '';
		let outProp = e.dataset.sprop || 'textContent';
		if (e.dataset.sid == 'socialLinks') {
			const socialLinks = pageSettings.socialLinks;
			let v = socialLinks.links.map((v, i) => {
				let w = document.createElement(socialLinks.wrapperTag);
				w.className = socialLinks.wrapperClassName;
				let l = document.createElement('a');
				l.href = v;
				l.className = socialLinks.linkClassName;
				w.appendChild(l);
				let icon = document.createElement('img');
				icon.className = socialLinks.iconClassName;
				icon.src = socialLinks.iconDir + socialLinks.linksIcons[i].join('.');
				icon.alt = socialLinks.linksIcons[i][0] || '';
				l.appendChild(icon);
				return w;
			});
			while (e.firstChild) {
				e.removeChild(e.lastChild);
			}
			for (let i in v) {
				e.appendChild(v[i]);
			}
		}
		// Массивы
		else if (Array.isArray(v)) {
			if (e.dataset.sarrmode == 'prefabNest') {
				let prefab = e.children[0];
				v = v.map(v => {
					let e = document.createElement(prefab.tagName);
					e.className = prefab.className;
					e[outProp] = v;
					return e;
				});
				while (e.firstChild) {
					e.removeChild(e.lastChild);
				}
				for (let i in v) {
					e.appendChild(v[i]);
				}
			} else {
				e[outProp] = v[0];
				for (let i = 1; i < v.length; i++) {
					e[outProp] += ' ' + v[i];
				}
			}
		} else {
			e[outProp] = v;
		}
	});
};

settingsApply();