(function()  {
    let d3Script = document.createElement('script');
    d3Script.src = ' https://sapui5.hana.ondemand.com/resources/sap-ui-core.js';
    d3Script.async = false;
	document.head.appendChild(d3Script);
	
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `

	`;

	d3Script.onload = () => 
    customElements.define('com-iprosis-search', class ISearch extends HTMLElement {

		disconnectedCallback () {
            // your cleanup code goes here
            try{
                document.head.removeChild(d3Script);
            }
            catch{}
        }

        connectedCallback () {
            const bcRect = this.getBoundingClientRect();
            this._widgetHeight = bcRect.height;
            this._widgetWidth = bcRect.width;
            this.redraw();
		}
		

		constructor() {
			//Constants
            if (!window._d3){
                window._d3 = d3;
            }
			super();
			this._shadowRoot = this.attachShadow({mode: 'open'});
			this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
			this._key='k';
			this._enable=true;
			this._length=false;
			this._place= "Search";
			this._suggest=true;
			this._showbutton = true;
			this._props = {};
					
		}  // end of constructor

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}
	
		onCustomWidgetAfterUpdate(changedProperties) {
			if ("key" in changedProperties) {
			//	this._shadowRoot.getElementById("key_val").value = changedProperties["key"];
			}
			if ("enable" in changedProperties) {
			//	this._shadowRoot.getElementById("enable_val").value = changedProperties["enable"];
			}
			if ("length" in changedProperties) {
			//	this._shadowRoot.getElementById("length_val").value = changedProperties["length"];
			}
			if ("place" in changedProperties) {
			//	this._shadowRoot.getElementById("place_val").value = changedProperties["place"];
			}
			if ("suggest" in changedProperties) {
			//	this._shadowRoot.getElementById("suggest_val").value = changedProperties["suggest"];
			}
			if ("showbutton" in changedProperties) {
			//	this._shadowRoot.getElementById("showbutton_val").value = changedProperties["showbutton"];
			}
		}
		

	

	}); //end of class
})();