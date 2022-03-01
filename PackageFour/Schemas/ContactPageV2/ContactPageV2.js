define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {
			
			/**
			 * 
			 */
			 "MyEventListener": {
				dependencies: [
					{
						columns: ["Name"],
						methodName: "onNameChanged"
					},
					{
						columns: ["Email"],
						methodName: "onEmailChanged"
					}
				]
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			/**
			 * Initializes the initial values of the model
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			 init: function() {
				this.callParent(arguments);
				window.console.log("Hello world");
			},
			/**
			 * Handler of the entity initialized.
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			 onEntityInitialized: function() {
				this.callParent(arguments);
			},
			
			onNameChanged: function(a, columnName){
				
				let newValue = this.get(columnName);
				this.showInformationDialog("Column: "+ columnName +" has changed, it new value is: "+newValue);
			},
			onEmailChanged: function(a, columnName){
				
				let newValue = this.get(columnName);
				this.showInformationDialog("Column: "+ columnName +" has changed, it new value is: "+newValue);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Age",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 2,
						"row": 2
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"name": "Age2",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 2,
						"row": 3
					},
					"bindTo": "Age"
				}
			},
		]/**SCHEMA_DIFF*/
	};
});