(function()  {
let tmpl = document.createElement('template');
tmpl.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Search Box Properties</legend>
				<table>
					<tr>
						<td>Type of Display Key</td>
						<td><input id="key_val" type="text" name="key" size="10" maxlength="10"></td>
					</tr>
					<tr>
						<td>Is Widget Enabled</td>
						<td><input id="enable_val" type="text" name="enable" size="10" maxlength="10"></td>
					</tr>
					<tr>
						<td>Max Length</td>
						<td><input id="length_val" type="text" name="length" size="10" maxlength="5"></td>
					</tr>
					<tr>
						<td>Choose Placeholder</td>
						<td><input id="place_val" type="text" name="place" size="20" maxlength="20"></td>
					</tr>
					<tr>
					<td>Show Suggestions</td>
					<td><input id="suggest_val" type="text" name="suggest" size="10" maxlength="5"></td>
					<td>Show search button</td>
					<td><input id="showbutton_val" type="text" name="showbutton" size="10" maxlength="5"></td>
					</tr>
				</table>
			</fieldset>
			<button type="submit">Submit</button>
		</form>
`;

class GaugeAps extends HTMLElement {
		  constructor() {
		    super();
		    this._shadowRoot = this.attachShadow({mode: 'open'});
		    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		    this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		  }

		  _submit(e) {
		    	e.preventDefault();
				this.dispatchEvent(new CustomEvent('propertiesChanged', { detail: { properties: {
					key: this.key,
					enable: this.enable,
					length:this.length,
					place:this.place,
					suggest:this.suggest,
					showbutton:this.showbutton
				}}}));
				return false;
		  }

		  get key() {
			 return this._shadowRoot.getElementById("key_val").value ;
	      }

		  set key(value) {
			  this._shadowRoot.getElementById("key_val").value = value;
		  }
		  get enable() {
			return this._shadowRoot.getElementById("enable_val").value ;
		 }

		 set enable(value) {
			 this._shadowRoot.getElementById("enable_val").value = value;
		 }
		 get length() {
			return this._shadowRoot.getElementById("length_val").value ;
		 }

		 set length(value) {
			 this._shadowRoot.getElementById("length_val").value = value;
		 }
		 get place() {
			return this._shadowRoot.getElementById("place_val").value ;
		 }

		 set place(value) {
			 this._shadowRoot.getElementById("place_val").value = value;
		 }
		 get suggest() {
			return this._shadowRoot.getElementById("suggest_val").value ;
		 }

		 set suggest(value) {
			 this._shadowRoot.getElementById("suggest_val").value = value;
		 }
		 get showbutton() {
			return this._shadowRoot.getElementById("showbutton_val").value ;
		 }

		 set showbutton(value) {
			 this._shadowRoot.getElementById("showbutton_val").value = value;
		 }

		  

		  static get observedAttributes() {
			  return ['key', 'enable','length','place','suggest','showbutton'];
	      }

		  attributeChangedCallback(name, oldValue, newValue) {
			 if (oldValue != newValue) {
				  this[name] = newValue;
			 }
		  }
}

customElements.define('com-iprosis-search-aps', GaugeAps);
})();