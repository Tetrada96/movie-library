import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { CardList } from '../../components/cardList/cardList.js';

export class FavoritesView extends AbstractView {

	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.setTitle('Мои фильмы')
	}

	destroy() {
		onChange.unsubscribe(this.appState);
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render()
		}
	}
	

	render() {
		const main = document.createElement('div');
		main.innerHTML=`
				<h1>Мои фильмы - ${this.appState.favorites.length}</h1>
			`
		main.append(new CardList(this.appState, {list: this.appState.favorites}).render());
		this.app.innerHTML = '';
		this.app.append(main);
		this.renderHeader();
	}

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	}
}