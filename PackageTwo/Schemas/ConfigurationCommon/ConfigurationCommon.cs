using PackageTwo.Interfaces;
using Terrasoft.Configuration;
using Terrasoft.Core;
using Terrasoft.Core.Factories;

namespace PackageTwo.Configuration
{
	
	[DefaultBinding(typeof(ICommonConfiguration))]
	public class CommonConfiguration : ICommonConfiguration
	{

		public void PostMessage(UserConnection userConnection, string senderName, string messageText)
		{
			MsgChannelUtilities.PostMessage(userConnection, senderName, messageText);
		}
		
		public void PostMessageToAll(string senderName, string messageText)
		{
			MsgChannelUtilities.PostMessageToAll(senderName, messageText);
		}
	}
}
 