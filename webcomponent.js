(function()  {
    // let d3Script = document.createElement('script');
    // / d3Script.src = 'https://openui5.hana.ondemand.com/1.48.4/resources/sap-ui-core.js';
    //d3Script.async = false;
	//document.head.appendChild(d3Script);
	
	let tmpl = document.createElement('template');
	tmpl.innerHTML = `
	<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background-color: #232C31;
}

.search-bar {
    position: absolute;
    top: 100px;
    left: 100px;
}

input {
    position: relative;
    padding-left: 20px;
    font: 1em "Helvetica", sans-serif;
    width: 200px;
    height: 50px;
    border-radius: 5px 0px 0px 5px;
    border: none;
    background-color: #151A1D;
    outline: none;
    color: white;
}

.search-icon {
    position: absolute;
    left: 200px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 0px 5px 5px 0px;
    background-color: #42D8D3;
}

.search-icon {
    cursor: pointer;
    font-size: 1em;
}

.autocomplete-items {
	position: absolute;
	border: 1px solid #d4d4d4;
	border-bottom: none;
	border-top: none;
	z-index: 99;
	/*position the autocomplete items to be the same width as the container:*/
	top: 100%;
	left: 0;
	right: 0;
	}
	.autocomplete-items div {
	padding: 10px;
	cursor: pointer;
	background-color: #fff; 
	border-bottom: 1px solid #d4d4d4; 
	}
	/*when hovering an item:*/
	.autocomplete-items div:hover {
	background-color: #e9e9e9; 
	}
	/*when navigating through the items using the arrow keys:*/
	.autocomplete-active {
	background-color: DodgerBlue !important; 
	color: #ffffff; 
	
</style>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<div class="search-bar">
    <input type="text" name="search" placeholder="Search..." onfocus="this.placeholder=''" onblur="this.placeholder='Search...'"></input>
    <button class="search-icon"><span class="search-btn fa fa-search"></span></button>
</div>

	`;
	class ISearch extends HTMLElement {
		constructor() {
			// var view = sap.ui.xmlview({
			// 	viewContent: '<mvc:View height="100%" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" > <Page title="OpenUI5 Bind aggregation example" class="sapUiContentPadding" showNavButton="false" > <subHeader> <Toolbar> <SearchField id="search-field"/> </Toolbar> </subHeader>  </Page> </mvc:View>'
			// });
			super();
			let shadow = this.attachShadow({ mode: 'open' });
			shadow.appendChild(tmpl.content.cloneNode(true));

			let that = this;
			that.index = 0;
			that.showSuggestions = true;
			that.display = 'k';
			that.input = shadow.querySelector('#myInput');
			that.dim = '';
			function autocomplete(that) {

				let inp = that.input;
				let currentFocus;
			
				inp.addEventListener('input', function(e) {
					if (that.showSuggestions){
					let val = this.value;
					closeAllLists();
					currentFocus = -1;
					let a = document.createElement('div');
					a.id = this.id + 'autocomplete-list';
					a.classList.add('autocomplete-items');
					this.parentNode.appendChild(a);

					for (let i = 0; i < that.dataModel.length; i++) {
						if (
							// that.dataModel[i]
							// 	.substr(0, val.length)
							// 	.toUpperCase() == val.toUpperCase()
							that.dataModel[i].toLowerCase().indexOf(val.toLowerCase())>-1
						) {
							let b = document.createElement('div');
							b.innerHTML =
								'<strong>' +
								that.dataModel[i].substr(0, val.length) +
								'</strong>' +
								that.dataModel[i].substr(val.length);
							b.addEventListener('click', function(e) {
								that.selectedValue = this.innerText;
								inp.value = this.innerText;
								closeAllLists();
								that.index = i;
							});
							a.appendChild(b);
						}
					}
					} // end auto suggest
				});
				inp.addEventListener('keydown', function(e) {
					var x = shadow.getElementById(
						this.id + 'autocomplete-list'
					);
					if (x) x = x.getElementsByTagName('div');
					// arrow down
					if (e.keyCode == 40) {
						currentFocus++;
						addActive(x);
						// arrow up
					} else if (e.keyCode == 38) {
						currentFocus--;
						addActive(x);
					} else if (e.keyCode == 13) {
						//enter
						e.preventDefault();
						if (currentFocus > -1) {
							if (x) x[currentFocus].click();
						}
					}
				});

				function addActive(x) {
					if (!x) return false;
					removeActive(x);
					if (currentFocus >= x.length) currentFocus = 0;
					if (currentFocus < 0) currentFocus = x.length - 1;
					x[currentFocus].classList.add('autocomplete-active');
				}
				function removeActive(x) {
					for (var i = 0; i < x.length; i++) {
						x[i].classList.remove('autocomplete-active');
					}
				}
				function closeAllLists(elmnt) {
					var xContainer = shadow.getElementById('container');
					var x = xContainer.getElementsByClassName(
						'autocomplete-items'
					);
					for (var i = 0; i < x.length; i++) {
						if (elmnt != x[i] && elmnt != inp) {
							x[i].parentNode.removeChild(x[i]);
						}
					}
				}
				document.addEventListener('click', function(e) {
					closeAllLists(e.target);
				});
			} // end of autocomplete
			
				autocomplete(that);				
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
			 	return this.dataModel1[this.index];
		}

		/* getter of data list */
		getMembers() {
			return this.dataModel;
		}

		/* setter of datalist to autocomplete*/
		setMembers(newdata,displayType) {
			this.display = displayType;
				for (let index = 0; index < newdata.length; index++) {
						this.dataModel0[index] = newdata[index].displayId;
						this.dataModel1[index] = newdata[index].description;
						this.dataModel2[index] = newdata[index].displayId + ' ' + newdata[index].description;			
				};	
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
				this.dim = newdata[0].dimensionId;
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

			// chooseData(){
			// 	if (this.display == 'k'){
			// 		this.dataModel = this.dataModel0;
			// 	}
			// 	else if (this.display == 't'){
			// 		this.dataModel = this.dataModel1;
			// 	}
			// 	else if (this.display == 'kt'){
			// 		this.dataModel=this.dataModel2;
			// 	}
			// }

	} //end of class

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
		

	

	// }); //end of class
