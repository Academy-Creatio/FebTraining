using System;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Web.SessionState;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Web.Common;

namespace PackageFour
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class DemoService : BaseService, IReadOnlySessionState
	{
		#region Properties
		private SystemUserConnection _systemUserConnection;
		private SystemUserConnection SystemUserConnection
		{
			get
			{
				return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
			}
		}
		#endregion

		#region Methods : REST
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
			BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json)]
		public DemoService_Dto PostMethodName(string email)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			const string tableName = "Contact";
			EntitySchema contactSchema = UserConnection.EntitySchemaManager.GetInstanceByName(tableName);
			Entity contact = contactSchema.CreateEntity(UserConnection);
			var columns = new string[] { "Name", "Email" };
			contact.FetchFromDB("Email", email, columns);

			var httpContext = HttpContextAccessor.GetInstance();
			WebOperationContext.Current.OutgoingResponse.StatusCode = System.Net.HttpStatusCode.OK;

			return new DemoService_Dto
			{
				Count = 10,
				Name = contact.GetTypedColumnValue<string>("Name")
			};
		}

		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json,
			BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json)]
		public DemoService_Dto GetMethodname(int num)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			return new DemoService_Dto
			{
				Name = userConnection.CurrentUser.Name,
				Count = num+10
			};
		}

		#endregion

		#region Methods : Private

		#endregion
	}
}

[DataContract]
public class DemoService_Dto
{
	[DataMember(Name = "name")]
	public string Name { get; set; }

	[DataMember(Name = "count")]
	public int Count { get; set; }
}

