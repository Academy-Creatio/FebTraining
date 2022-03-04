define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		messages:{
			
			/**
			 * Subscribed on: ContactPageV2 
			 * @tutorial https://academy.creatio.com/docs/developer/front-end_development/sandbox_component/module_message_exchange
			 */
			"SectionActionClicked":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			onMyMainButtonClick: function(a, b, c, tag){

				//var primaryColumnValue = this.$ActiveRow;
				//var gridData = this.getGridData();
				//var activeRow = gridData.get(primaryColumnValue);
				
				//SEND THE MESSAGE
				this.sandbox.publish("SectionActionClicked", null, [this.sandbox.id+"_CardModuleV2"]);
				
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PrimaryContactButtonRed",
				"parentName": "CombinedModeActionButtonsCardLeftContainer", //visible on the  page, INVISIBLE in the section, 
				"propertyName": "items",
				"values":{
					itemType: this.Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					caption: "Red Button",
					hint: "Section red button hint",
					click: {"bindTo": "onMyMainButtonClick"},
					tag: "CombinedModeActionButtonsCardLeftContainer_Red"
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryContactButtonGreen",
				"parentName": "SeparateModeActionButtonsLeftContainer", //visible in section and INVISIBLE on a page
				"propertyName": "items",
				"values":{
					itemType: this.Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						textClass: ["actions-button-margin-right"],
						wrapperClass: ["actions-button-margin-right"]
					},
					caption: "Green Button",
					hint: "Section red button hint",
					click: {"bindTo": "onMyMainButtonClick"},
					tag: "ActionButtonsContainer_Red"
				}
			}
		]/**SCHEMA_DIFF*/
		
		
	};
});
