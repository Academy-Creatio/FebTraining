define("ContactPageV2", ["DevTrainingMixin","ServiceHelper", "ProcessModuleUtilities"], function(DevTrainingMixin, ServiceHelper, ProcessModuleUtilities) {
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
			},

			Account: {
				lookupListConfig: {
					columns: ["Web", "Owner", "Country"]
				}
			},
		},
		mixins: {
			"DevTrainingMixin": "Terrasoft.DevTrainingMixin"
		},
		messages:{
			/**
				 * Published on: ContactSectionV2
				 * @tutorial https://academy.creatio.com/docs/developer/front-end_development/sandbox_component/module_message_exchange
				 */
				"SectionActionClicked":{
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
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
				this.subscribeToMessages();

			},
			/**
			 * Handler of the entity initialized.
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.test();
			},	
			subscribeToMessages: function(){
				this.sandbox.subscribe(
					"SectionActionClicked",
					function(){this.onSectionMessageReceived();},
					this,
					[this.sandbox.id]
				)
			},
			onSectionMessageReceived: function(){
				this.showInformationDialog("Message received");
			},
			onNameChanged: function(a, columnName){
				
				let newValue = this.get(columnName);
				this.showInformationDialog("Column: "+ columnName +" has changed, it new value is: "+newValue);
			},
			onEmailChanged: function(a, columnName){
				
				let newValue = this.get(columnName);
				this.showInformationDialog("Column: "+ columnName +" has changed, it new value is: "+newValue);
			},
			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			 getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "tag1",
					"Caption": {"bindTo": "Resources.Strings.ActionItemOne"},
					"Click": {"bindTo": "onActionItemClicked"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "tag2",
					"Caption": {"bindTo": "Resources.Strings.ActionItemTwo"},
					"Click": {"bindTo": "onActionItemClicked"},
					Items: this.addSubItems(),
					ImageConfig: this.get("Resources.Images.CreatioSquare")
				}));
				return actionMenuItems;
			},
			onActionItemClicked: function(tag){
				this.showInformationDialog(tag);

				if(tag === "tag1"){
					this.doESQ();
				} else if(tag === "tag2"){
					this.callWebService();
				}
			},
			/**
			 * Call Custom Configuration WebService
			 * @tutorial https://academy.creatio.com/docs/developer/back_end_development/web_services/call_a_web_service_front_end
			 */
			callWebService: function(){
				
				//Payload
				var serviceData = {
					"email": "k.krylov@creatio.com"
				};

				// Calling the web service and processing the results.
				// Can only execute/send POST requests
				//https://baseUrl/0/rest/DemoService/PostMethodName
				ServiceHelper.callService(
					"DemoService", 			//CS - ClassName
					"PostMethodName", 		//CS Method
					function(response) 
					{
						var result = response;
						if(result){
							var name = result.name;
						}
						this.showInformationDialog(name);
					}, 
					serviceData, 			//payload
					this
				);
			},


			onSubActionOneClick: function (){
				var id = this.$Id;
				var scope = this;

				var args = {
					sysProcessName: "Process_FromUI",
					parameters:{
						contactId: id,
						Email:""
					},
					callback: scope.onProcessCompleted(),
					scope: scope
				}
				ProcessModuleUtilities.executeProcess(args, function(response){
					console.log(response);
				});
			},

			onProcessCompleted: function(){
				this.hideBodyMask();
			},

			addSubItems: function(){
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				collection.addItem(this.getButtonMenuItem({
					"Caption": this.get("Resources.Strings.SubActionOneCaption"),
					"Click": {"bindTo": "onSubActionOneClick"},
					"Tag": "sub1"
				}));
				collection.addItem(this.getButtonMenuItem({
					"Caption": this.get("Resources.Strings.SubActionTwoCaption"),
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				return collection;
			},
			onMyMainButtonClick: function(a, b, c, tag){
				//this.showInformationDialog("Button with a tag of: "+tag+" was clicked");
			},


			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			 setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Email", this.emailValidator);
				this.addColumnValidator("Name", this.nameValidator);
			},

			emailValidator: function(){

				let invalidMessage = "";
				if(this.$Email.split('@')[1] === this.$Account.Web){
					invalidMessage = "";
				} else {
					invalidMessage = "Email domain must match to corporate domain";
				}

				return {
					invalidMessage: invalidMessage
				}
			},
			
			nameValidator: function(){
				let invalidMessage = "";
				if(this.$Name.length >= 2){
					invalidMessage = "";
				} else {
					invalidMessage = "Name is too short";
				}
				return {
					invalidMessage: invalidMessage
				}
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
				"name": "MyRedButtonRed",
				"values": {
					"itemType": 5,
					"style": "red",
					"classes": {
						"textClass": [
							"actions-button-margin-right"
						],
						"wrapperClass": [
							"actions-button-margin-right"
						]
					},
					"caption": "Red button",
					"hint": "Page red button hint",
					"click": {
						"bindTo": "onMyMainButtonClick"
					},
					"tag": "LeftContainer_Red"
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 7
			},
				// {
				// 	"operation": "insert",
				// 	"name": "MyRedButtonGreen",
				// 	"values": {
				// 		"itemType": 5,
				// 		"style": "green",
				// 		"classes": {
				// 			"textClass": [
				// 				"actions-button-margin-right"
				// 			],
				// 			"wrapperClass": [
				// 				"actions-button-margin-right"
				// 			]
				// 		},
				// 		"caption": "Green button",
				// 		"hint": "Red btn hint goes here !!!",
				// 		"click": {
				// 			"bindTo": "onMyMainButtonClick"
				// 		},
				// 		"tag": "LeftContainer_Green"
				// 	},
				// 	"parentName": "LeftContainer",
				// 	"propertyName": "items",
				// 	"index": 8
				// }
		]/**SCHEMA_DIFF*/
	};
});