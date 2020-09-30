sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("stel.demo.CustomerDetailsApp.controller.View1", {
		onInit: function () {
			//Create aJSON model and set it to the view
			var oViewModel = new sap.ui.model.json.JSONModel(),
				oData = {
					"idEditable":" " 
				};
			oViewModel.setData(oData);
			this.getView().setModel(oViewModel,"viewModel")
			

		},
		onFilterPress:function(){
		// {
		// 	var oFilter = new sap.ui.model.Filter({
		// 		path:'CompanyName',
		// 		operator: sap.ui.model.FilterOperator.EQ,
		// 		value1: "Alfreds Futterkiste"
		// 	});
	
		var oFilter = new Filter({
			path:'CompanyName',
			operator: FilterOperator.EQ,
			value1: "Alfreds Futterkiste"
			});

		var oList=this.getView().byId("customerList");
		var oBinding = oList.getBinding("items");
			oBinding.filter(oFilter);
			// debugger;
			// console.log(oFilter);
		},
			
		onInputChange: function(oEvent){
			var that = this,
			oVal = oEvent.getParameter("value");
			// Create the filter
			var oFilter = new Filter({
				path:"ContactName",
				operator:FilterOperator.Contains,
				value1:oVal
			});
			// Apply filter to the list
			var oList = that.getView().byId("customerList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(oFilter);
			
		},
		myCustomFormatter:function(oVal1){
			if(oVal1 === 'X') return "Correct";
			return "Wrong";

		},

		//Customer list item press handler
		onCustListItemPress:function(oEvent){
			var that = this,
				oMockdataModel = that.getView().getModel("mockdata"),
				oSource = oEvent.getSource(),
				sPath = oSource.getBindingContextPath();

				//Use element binding for display the details on screen
				var oCustDetailForm = that.getView().byId("idCustDetailsForm"),
					oAddrForm = that.getView().byId("idCustAddressForm");

					oCustDetailForm.bindElement("mockdata>"+sPath);
					oAddrForm.bindElement("mockdata>"+sPath);
					console.log("mockdata>"+sPath);
		}
	});
});