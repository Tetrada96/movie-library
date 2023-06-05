import { DivComponent } from '../../common/div-component';
import './pagination.css'

export class Pagination extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	clickBack() {

		if (this.state.offset > 1) {
			this.state.offset = this.state.offset -1
		}
	}

	clickForward() {
		if (this.state.offset * 10 < this.state.numFound) {
			this.state.offset = this.state.offset +1
		}
	}

	render() {
		if (this.state.list.length !== 0) {

			this.el.classList.add('pagination');
			this.el.innerHTML=`
				<div class='pagination'>
					<button class='button_back'>Назад</button>
					<button class='button_forward'>Вперед</button>
				</div>
			`;
			this.el.querySelector(".button_back").addEventListener('click', this.clickBack.bind(this));
			this.el.querySelector(".button_forward").addEventListener('click', this.clickForward.bind(this));
			return this.el;
		} 
		return this.el
	}
}