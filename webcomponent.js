(function()  {
    let d3Script = document.createElement('script');
    d3Script.src = 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js';
    d3Script.async = false;
	document.head.appendChild(d3Script);
	
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
	div#content {
		border: 1px solid black;
		height: 400px;
	}
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
		}
		

		constructor() {
			var view = sap.ui.xmlview({
				viewContent: '<mvc:View height="100%" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" > <Page title="OpenUI5 Bind aggregation example" class="sapUiContentPadding" showNavButton="false" > <subHeader> <Toolbar> <SearchField id="search-field"/> </Toolbar> </subHeader> </Page> </mvc:View>'
				});
			//Constants
            // if (!window._d3){
            //     window._d3 = d3;
            // }
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


			var dataResultSet = null;
		var isEnabled = null;
		var placeHolder = null;
		var isSearchButton = null;
		var isSuggestions = null;
		var maxLength = null;
		var selectedDimension = null;
		
		var displayKey = null;
		var selectedValue = null;
		var selectedText = null;
		var reload = false;
		var Data = null;
		this.oSearchField = null;
		
		if (window.sap && sap.zen && sap.zen.designmode) {
			var x = "dd";
		}


		// console.log("This :");
		// console.log(this);

		// if (this._alive) {
		// 	console.log('5');
		// 	return;
		// } else {

		// 	console.log('10');
		// 	var currentDiv = "DIV_" + Math.floor(Math.random() * 1000);
		// 	console.log('20');
		// 	var currentSf = "SF_" + Math.floor(Math.random() * 1000);
		// 	// currentDiv = "DIV_" + this.$().attr('id');
		// 	// var currentSf = "SF_" + this.$().attr('id');

		// 	// Create Search Field control and load data
		// 	this.oSearchField = new sap.m.SearchField(currentSf, {
		// 		enableSuggestions: true,
		// 		search: function (oEvent) {
		// 			console.log("Im here");
		// 			var text = "";
		// 			var key = "";
		// 			var isFire = true;
		// 			if (isSuggestions === false) {
		// 				text = oEvent.getParameter("query");
		// 				key = text;
		// 			} else {
		// 				var item = oEvent.getParameter("suggestionItem");
		// 				if (item) {
		// 					text = item.getText();
		// 					key = item.getKey();
		// 				} else if (oEvent.getParameter("query") === selectedText) {
		// 					isFire = false;
		// 				}
		// 			}
		// 			//		oEvent.getParameter("query");
		// 			if (isFire) {
		// 				selectedValue = key;
		// 				selectedText = text;
		// 				that.firePropertiesChanged(["SelectedValue"]);
		// 				that.firePropertiesChanged(["SelectedText"]);
		// 				that.fireEvent("onSearch");
		// 			}
		// 		},

		// 		suggest: function (oEvent) {
		// 			var value = oEvent.getParameter("suggestValue");
		// 			var filters = [];
		// 			if (value !== "") {
		// 				filters = that.getFilters(value);
		// 			} else {
		// 				filters = that.getFilters("999999iprosis");
		// 			}
		// 			that.oSearchField.getBinding("suggestionItems").filter(filters);
		// 			that.oSearchField.suggest();
		// 		}
		// 	});

		// 	//this.innerHTML = '<div id="' + currentDiv + '"> ';
			
		// 	let divContainer = document.createElement('div');
		// 	divContainer.id = "xyz";
		// 	//this.oSearchField.placeAt("xyz");
			
		// 	this._shadowRoot.appendChild(divContainer);
		// 	console.log("Shadow root :");
		// 	console.log(this._shadowRoot);
		// 	console.log("Seaarch  field :");
		// 	console.log(this.oSearchField);
		// 	//this.id = currentDiv;
			
		// 	this._alive = true;
		// }

					
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