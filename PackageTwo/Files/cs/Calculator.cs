using Common.Logging;
using PackageTwo.Interfaces;
using Terrasoft.Core.Factories;

namespace PackageTwo.Files.cs
{

	[DefaultBinding(typeof(ICalculator), Name = "Version1")]
	internal class Calculator : ICalculator
	{
		private readonly string myName;

		public Calculator(string myName)
		{
			this.myName = myName;
		}

		public int Add(int a, int b)
		{

			var CommonConfiguration = ClassFactory.Get<ICommonConfiguration>();
			CommonConfiguration.PostMessageToAll(GetType().Name, "WebSocket message from clio through configurtation");
			return a + b;
		}

		public int Subtract(int a, int b)
		{
			return a - b;
		}
	}
	[DefaultBinding(typeof(ICalculator), Name = "Version2")]
	internal class CalculatorTwo : ICalculator
	{
		private readonly ILog logger;

		public CalculatorTwo(ILog logger)
		{
			this.logger = logger;
		}
		

		public int Add(int a, int b)
		{
			logger.Info("Logging from the clio app");
			var CommonConfiguration = ClassFactory.Get<ICommonConfiguration>();
			CommonConfiguration.PostMessageToAll(GetType().Name, "WebSocket message from clio through configurtation");
			return a + b;

		}

		public int Subtract(int a, int b)
		{
			return a - b;
		}
	}
}
