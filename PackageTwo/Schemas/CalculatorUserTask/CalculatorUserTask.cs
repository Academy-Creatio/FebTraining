namespace Terrasoft.Core.Process.Configuration
{
	using global::Common.Logging;
	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Factories;
	using Terrasoft.Core.Process;
	using Terrasoft.UI.WebControls.Controls;

	#region Class: CalculatorUserTask

	/// <exclude/>
	public partial class CalculatorUserTask
	{

		#region Methods: Protected

		protected override bool InternalExecute(ProcessExecutingContext context) {
			ILog loggerer = LogManager.GetLogger("GuidedLearning");
			var ca = new ConstructorArgument("myName", "this is a test");
			var calc = ClassFactory.Get<PackageTwo.Interfaces.ICalculator>("Version1", ca);
			var result = calc.Add(A, B);
			loggerer.Info($"Value of the sum is {result} from UserTast");
			Result = result;


			//var ca2 = new ConstructorArgument("logger", loggerer);
			//var calc2 = Terrasoft.Core.Factories.ClassFactory.Get<PackageTwo.Interfaces.ICalculator>("Version2", ca2);
			//var result2 = calc2.Add(10, 15);
			//loggerer.Info($"Value of the sum is {result2}");
			return true;
		}

		#endregion

		#region Methods: Public

		public override bool CompleteExecuting(params object[] parameters) {
			return base.CompleteExecuting(parameters);
		}

		public override void CancelExecuting(params object[] parameters) {
			base.CancelExecuting(parameters);
		}

		public override string GetExecutionData() {
			return string.Empty;
		}

		public override ProcessElementNotification GetNotificationData() {
			return base.GetNotificationData();
		}

		#endregion

	}

	#endregion

}

