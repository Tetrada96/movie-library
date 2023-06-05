import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Pagination } from '../../components/pagination/pagination.js';

export class MainView extends AbstractView {
	state = {
		list:[],
		isLoading: false,
		searchQuery: undefined,
		offset: 1,
		numFound: 0,
	}

	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.state = onChange(this.state, this.stateHook.bind(this))
		this.setTitle('Поиск фильмов')
	}

	destroy() {
		onChange.unsubscribe(this.appState);
		onChange.unsubscribe(this.state);
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render()
		}
	}

	
	async stateHook(path) {
		if (path === 'searchQuery') {
			this.state.isLoading = true;
			const data = await this.loadList(this.state.searchQuery, this.state.offset)
			this.state.isLoading = false;
			this.state.numFound = data.total;
			this.state.list = data.docs;
		}
		if (path === 'list' || path === 'isLoading') {
			this.render()
		}
		if (path === 'offset') {
			this.state.isLoading = true;
			const data = await this.loadList(this.state.searchQuery, this.state.offset)
			this.state.isLoading = false;
			this.state.numFound = data.total;
			this.state.list = data.docs;
		}
	}
	
	async loadList(q, offset) {
		const res = await fetch(`https://api.kinopoisk.dev/v1.2/movie/search?page=${offset}&limit=6&query=${q}`,
			{headers: {'X-API-KEY': 'GJB64JP-HZEMTEX-M2YAH57-8EWGCYM'}}
		);
		return res.json();
	}

	render() {
		const main = document.createElement('div');
		main.innerHTML=`
				<h1>Найдено фильмов - ${this.state.numFound}</h1>
			`
		main.append(new Search(this.state).render());
		main.append(new CardList(this.appState, this.state).render());
		main.append(new Pagination(this.state).render())
		this.app.innerHTML = '';
		this.app.append(main);
		this.renderHeader();
	}

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	}
}