import iconSpinner from '../../img/icons8-spinner-30.png'
import iconDanger from '../../img/icons8-danger-50.png'

export default class View {
  _data;

  render(data) {
    //Guard clause if there is no data found or empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    console.log(this._data);
    this.clear();
    this.show();
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  hide() {
  this._parentElement.classList.add('hidden');
  }
  
  show() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.remove('hidden');
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <img src="${iconSpinner}" alt="icon-spinner">
        </div>
      `;

    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
                    <div class="icon-danger-div">
                    <img src="${iconDanger}" alt="icon-danger">
                    </div>
                    <p>${message}</p>
                  </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
