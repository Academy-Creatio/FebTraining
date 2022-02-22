using Terrasoft.Core;

namespace PackageTwo.Interfaces
{
	public interface ICommonConfiguration
	{
		void PostMessage(UserConnection userConnection, string senderName, string messageText);
		void PostMessageToAll(string senderName, string messageText);
	}
}
