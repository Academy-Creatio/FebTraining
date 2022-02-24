using Common.Logging;
using System;
using System.Threading;
using Terrasoft.Common;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace PackageThree.Files.cs
{
	/// <summary>
	/// Listener for 'EntityName' entity events.
	/// </summary>
	/// <seealso cref="BaseEntityEventListener" />
	[EntityEventListener(SchemaName = "Contact")]
	internal class ContactEventListener : BaseEntityEventListener
	{

		#region Methods

		#region Methods : Private

		#endregion

		#region Methods : Public

		#region Methods : Public : OnSave
		public override void OnSaving(object sender, EntityBeforeEventArgs e)
		{
			base.OnSaving(sender, e);
			Entity entity = (Entity)sender;
			entity.Validating += Entity_Validating;
			ILog loggerer = LogManager.GetLogger("GuidedLearning");


			var changedColumns = entity.GetChangedColumnValues();
			foreach(var col in changedColumns)
			{
				var changedColumnName = col.Column;
				var changedColumnValue = col.Value ?? "";
			
				loggerer.Info($"Changed Column: {changedColumnName.Caption} = {changedColumnValue.ToString()}");
			}

			UserConnection userConnection = entity.UserConnection;
			string newfullName = entity.GetTypedColumnValue<string>("Name");
			string oldFullName = entity.GetTypedOldColumnValue<string>("Name");

			
			loggerer.Info($"newfullName: {newfullName} oldFullName:{oldFullName}");
		}

		private void Entity_Validating(object sender, EntityValidationEventArgs e)
		{
			Entity entity = (Entity)sender;
			string newfullName = entity.GetTypedColumnValue<string>("Name");
			
			if (newfullName.Length <= 3)
			{
				var evm = new EntityValidationMessage
				{
					Text = "Full name cannot be shorter than 4 charachters",
					MassageType = Terrasoft.Common.MessageType.Error,
					Column = entity.Schema.Columns.FindByName("Name")
				};
				entity.ValidationMessages.Add(evm);
			}
		}

		public override void OnSaved(object sender, EntityAfterEventArgs e)
		{
			base.OnSaved(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;

			string newfullName = entity.GetTypedColumnValue<string>("Name");
			string oldFullName = entity.GetTypedOldColumnValue<string>("Name");

			ILog loggerer = LogManager.GetLogger("GuidedLearning");
			loggerer.Info("Logging OnSaved-Event from Clio");
			loggerer.Info($"newfullName: {newfullName} oldFullName:{oldFullName}");
		}
		#endregion

		#region Methods : Public : OnInsert
		public override void OnInserting(object sender, EntityBeforeEventArgs e)
		{
			base.OnInserting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnInserted(object sender, EntityAfterEventArgs e)
		{
			base.OnInserted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;

			ILog loggerer = LogManager.GetLogger("GuidedLearning");
			loggerer.Info("Logging OnInserted-Event from Clio");
		}
		#endregion

		#region Methods : Public : OnUpdate
		public override void OnUpdating(object sender, EntityBeforeEventArgs e)
		{
			base.OnUpdating(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnUpdated(object sender, EntityAfterEventArgs e)
		{
			base.OnUpdated(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;

			ILog loggerer = LogManager.GetLogger("GuidedLearning");
			loggerer.Info("Logging OnUpdated-Event from Clio");
		}
		#endregion

		#region Methods : Public : OnDelete
		public override void OnDeleting(object sender, EntityBeforeEventArgs e)
		{
			base.OnDeleting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnDeleted(object sender, EntityAfterEventArgs e)
		{
			base.OnDeleted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;

			ILog loggerer = LogManager.GetLogger("GuidedLearning");
			loggerer.Info("Logging OnDeleted-Event from Clio");
		}
		#endregion

		#endregion

		#endregion
	}
}
