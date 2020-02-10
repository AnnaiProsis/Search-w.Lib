(function()  {
	
    let materilizeScript = document.createElement("script");
    materilizeScript.src = //'https://d3js.org/d3.v5.min.js';
     // "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js";
	"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js";
	materilizeScript.async = false;
	document.head.appendChild(materilizeScript);
	materilizeScript.onerror = function() {
		alert("Error loading " + this.src); 
	  };
	  materilizeScript.onload = function() {
		alert("Loaded");
	  };

//   let jqScript = document.createElement("script");
//   jqScript.src = "https://code.jquery.com/jquery-3.4.1.slim.js";
//   jqScript.async = false;
//   document.head.appendChild(jqScript);


    let materilizeCss = document.createElement("link");
    materilizeCss.rel = "stylesheet";
    materilizeCss.type = "text/css";
    materilizeCss.href =
      //"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
	 "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.css";
    document.head.appendChild(materilizeCss);

    let materilizeIcons = document.createElement("link");
    materilizeIcons.rel = "stylesheet";
    materilizeIcons.type = "text/css";
    materilizeIcons.href =
      "https://fonts.googleapis.com/icon?family=Material+Icons";
  
    document.head.appendChild(materilizeIcons);
  
	
	let tmpl = document.createElement('template');
	
	tmpl.innerHTML = `
	.container {
		width: 80%;
		margin: 15px auto;
	  }

	<div class="container">
  <h2>Chart.js — Bar Chart Demo</h2>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</div>



	`;
	  const csss = new CSSStyleSheet();
	  document.adoptedStyleSheets = [csss];
	//  materilizeScript.onload = () => 
  //  customElements.define('com-iprosis-sample-search', class ISearch extends HTMLElement {

	
	class ISearch extends HTMLElement {
		constructor() {
			super();
			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));
			 shadow.appendChild(materilizeCss);
			 shadow.appendChild(materilizeIcons);
			shadow.appendChild(materilizeScript);
			//shadow.appendChild(jqScript);
			this.adoptedStyleSheets = [csss];	
			var that = this;
			//this.x = shadow.querySelector('.autocomplete');
			// document.addEventListener('DOMContentLoaded', function() {
			// 	var elems = document.querySelectorAll('.autocomplete');
			//	var instances = M.Autocomplete.init(elems, options);
			//   });
			//var ctx = document.getElementBy("myChart").getContext('2d');
			//var ctx1 = shadow.querySelector('#myChart');
			var ctx = ctx1.getContext('2d');
			//querySelector('#myChart').getContext('2d');
				var myChart = new Chart(ctx1, {
				type: 'bar',
				data: {
					labels: ["M", "T", "W", "T", "F", "S", "S"],
					datasets: [{
					label: 'apples',
					data: [12, 19, 3, 17, 28, 24, 7],
					backgroundColor: "rgba(153,255,51,1)"
					}, {
					label: 'oranges',
					data: [30, 29, 5, 5, 20, 3, 10],
					backgroundColor: "rgba(255,153,0,1)"
					}]
				}
});
		}  // end of constructor



		/* initialization of selected value */
		selectedValue = ''; 

		//template until setter is pressed
		dataModel = [''];
		dataModel0 = ['Search'];
		dataModel1 = ['Search'];
		dataModel2 = ['Search'];

		/* getter of selected value */
		getSelectedValue() {
				return this.dataModel0[this.index];
		}

		getSelectedText(){
			// 	return this.dataModel1[this.index];
			var instance = M.Autocomplete.getInstance({"Anya":'1',"Yasha":'2',"Liza":'3'},);
			return instance;
		}

		/* getter of data list */
		getMembers() {
			//return this.dataModel;
			var instance = M.Autocomplete.getInstance(this.elems);
			return instance;
			
		}

		/* setter of datalist to autocomplete*/
		setMembers(newdata,displayType) {
			 this.display = displayType;
			 this.elems = newdata;
			 var instances =M.Autocomplete.init({"Anya":'1',"Yasha":'2',"Liza":'3'},{});
			 //M.Autocomplete.init(elems);
			 instances.updateData({
				"Apple": null,
				"Microsoft": null,
				"Google": 'https://placehold.it/250x250'
			  });

			  instances.open();


			// console.log(M.Autocomplete.init({"Anya":'1',"Yasha":'2',"Liza":'3'}));
			 //M.Autocomplete.init(shadow.querySelector('.autocomplete'),newdata );
			// instance.open();
			}

			getPlaceholder(){
				return this.input.placeholder;				
			}

			setPlaceholder(placeholderName){
				this.input.placeholder = placeholderName;
			}

			getDisplayType (){
				if (this.display == 'k'){
					return 'key';
				}
				else if (this.display == 't'){
					return 'text';
				}
				else return 'key & text';
			}

			setDisplayType(displayType){
				this.display = displayType;
				//chooseData();
				if (this.display == 'k'){
					this.dataModel = this.dataModel0;
				}
				else if (this.display == 't'){
					this.dataModel = this.dataModel1;
				}
				else if (this.display == 'kt'){
					this.dataModel=this.dataModel2;
				}
			}

			setEnableSuggestions(bool){
				if (bool){
					this.showSuggestions = true;
				}
				else {
					this.showSuggestions = false;
				}
			}

			isEnableSuggestions(){
				return this.showSuggestions;
			}

			getSelectedDimension(){
				return this.dim;
			}

}; //end of class
//})();
//}); //end of function

	/* Define web component - input: tag and class */
 	customElements.define('com-iprosis-sample-search', ISearch);
 })();
	// d3Script.onload = () => 
    // customElements.define('com-iprosis-search', class ISearch extends HTMLElement {

	// 	disconnectedCallback () {
    //         // your cleanup code goes here
    //         try{
    //             document.head.removeChild(d3Script);
    //         }
    //         catch{}
    //     }

    //     connectedCallback () {
    //         const bcRect = this.getBoundingClientRect();
    //         this._widgetHeight = bcRect.height;
    //         this._widgetWidth = bcRect.width;
	// 	}
		

	// 	constructor() {
	// 		var view = sap.ui.xmlview({
	// 			viewContent: '<mvc:View height="100%" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" > <Page title="" class="sapUiContentPadding" showNavButton="false" > <subHeader> <Toolbar> <SearchField id="search-field"/> </Toolbar> </subHeader> </Page> </mvc:View>'
	// 			});
	// 		//	var model = new sap.ui.model.json.JSONModel();
	// 		//Constants
    //         // if (!window._d3){
    //         //     window._d3 = d3;
    //         // }
	// 		super();
	// 		this._shadowRoot = this.attachShadow({mode: 'open'});
	// 		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
	// 		this._key='k';
	// 		this._enable=true;
	// 		this._length=false;
	// 		this._place= "Search";
	// 		this._suggest=true;
	// 		this._showbutton = true;
	// 		this._props = {};


	// 		var dataResultSet = null;
	// 	var isEnabled = null;
	// 	var placeHolder = null;
	// 	var isSearchButton = null;
	// 	var isSuggestions = null;
	// 	var maxLength = null;
	// 	var selectedDimension = null;
		
	// 	var displayKey = null;
	// 	var selectedValue = null;
	// 	var selectedText = null;
	// 	var reload = false;
	// 	var Data = null;
	// 	this.oSearchField = null;
		
	// 	if (window.sap && sap.zen && sap.zen.designmode) {
	// 		var x = "dd";
	// 	}


	// 	// console.log("This :");
	// 	// console.log(this);

	// 	// if (this._alive) {
	// 	// 	console.log('5');
	// 	// 	return;
	// 	// } else {

	// 	// 	console.log('10');
	// 	// 	var currentDiv = "DIV_" + Math.floor(Math.random() * 1000);
	// 	// 	console.log('20');
	// 	// 	var currentSf = "SF_" + Math.floor(Math.random() * 1000);
	// 	// 	// currentDiv = "DIV_" + this.$().attr('id');
	// 	// 	// var currentSf = "SF_" + this.$().attr('id');

	// 	// 	// Create Search Field control and load data
	// 	// 	this.oSearchField = new sap.m.SearchField(currentSf, {
	// 	// 		enableSuggestions: true,
	// 	// 		search: function (oEvent) {
	// 	// 			console.log("Im here");
	// 	// 			var text = "";
	// 	// 			var key = "";
	// 	// 			var isFire = true;
	// 	// 			if (isSuggestions === false) {
	// 	// 				text = oEvent.getParameter("query");
	// 	// 				key = text;
	// 	// 			} else {
	// 	// 				var item = oEvent.getParameter("suggestionItem");
	// 	// 				if (item) {
	// 	// 					text = item.getText();
	// 	// 					key = item.getKey();
	// 	// 				} else if (oEvent.getParameter("query") === selectedText) {
	// 	// 					isFire = false;
	// 	// 				}
	// 	// 			}
	// 	// 			//		oEvent.getParameter("query");
	// 	// 			if (isFire) {
	// 	// 				selectedValue = key;
	// 	// 				selectedText = text;
	// 	// 				that.firePropertiesChanged(["SelectedValue"]);
	// 	// 				that.firePropertiesChanged(["SelectedText"]);
	// 	// 				that.fireEvent("onSearch");
	// 	// 			}
	// 	// 		},

	// 	// 		suggest: function (oEvent) {
	// 	// 			var value = oEvent.getParameter("suggestValue");
	// 	// 			var filters = [];
	// 	// 			if (value !== "") {
	// 	// 				filters = that.getFilters(value);
	// 	// 			} else {
	// 	// 				filters = that.getFilters("999999iprosis");
	// 	// 			}
	// 	// 			that.oSearchField.getBinding("suggestionItems").filter(filters);
	// 	// 			that.oSearchField.suggest();
	// 	// 		}
	// 	// 	});

	// 	// 	//this.innerHTML = '<div id="' + currentDiv + '"> ';
			
	// 	// 	let divContainer = document.createElement('div');
	// 	// 	divContainer.id = "xyz";
	// 	// 	//this.oSearchField.placeAt("xyz");
			
	// 	// 	this._shadowRoot.appendChild(divContainer);
	// 	// 	console.log("Shadow root :");
	// 	// 	console.log(this._shadowRoot);
	// 	// 	console.log("Seaarch  field :");
	// 	// 	console.log(this.oSearchField);
	// 	// 	//this.id = currentDiv;
			
	// 	// 	this._alive = true;
	// 	// }

					
	// 	}  // end of constructor

	// 	onCustomWidgetBeforeUpdate(changedProperties) {
	// 		this._props = { ...this._props, ...changedProperties };
	// 	}
	
	// 	onCustomWidgetAfterUpdate(changedProperties) {
	// 		if ("key" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("key_val").value = changedProperties["key"];
	// 		}
	// 		if ("enable" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("enable_val").value = changedProperties["enable"];
	// 		}
	// 		if ("length" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("length_val").value = changedProperties["length"];
	// 		}
	// 		if ("place" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("place_val").value = changedProperties["place"];
	// 		}
	// 		if ("suggest" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("suggest_val").value = changedProperties["suggest"];
	// 		}
	// 		if ("showbutton" in changedProperties) {
	// 		//	this._shadowRoot.getElementById("showbutton_val").value = changedProperties["showbutton"];
	// 		}
	// 	}
		

	

	 //}); //end of class
