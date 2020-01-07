(function() {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `

	`;
	class ISearch extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: 'open'});
			this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
			this._key='k';
			this._enable=true;
			this._length=false;
			this._place= "Search";
			this._suggest=true;
			this._showbutton = true;
					
		}  // end of constructor

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}
	
		onCustomWidgetAfterUpdate(changedProperties) {
			if ("key" in changedProperties) {
				this._shadowRoot.getElementById("key_val").value = changedProperties["key"];
			}
			if ("enable" in changedProperties) {
				this._shadowRoot.getElementById("enable_val").value = changedProperties["enable"];
			}
			if ("length" in changedProperties) {
				this._shadowRoot.getElementById("length_val").value = changedProperties["length"];
			}
			if ("place" in changedProperties) {
				this._shadowRoot.getElementById("place_val").value = changedProperties["place"];
			}
			if ("suggest" in changedProperties) {
				this._shadowRoot.getElementById("suggest_val").value = changedProperties["suggest"];
			}
			if ("showbutton" in changedProperties) {
				this._shadowRoot.getElementById("showbutton_val").value = changedProperties["showbutton"];
			}
		}
		

	

	} //end of class

	/* Define web component - input: tag and class */
	customElements.define('com-iprosis-search', ISearch);
})();