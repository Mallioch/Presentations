using System;
using Massive;

namespace SampleApp.Code
{
    public class CardRepository : DynamicModel
    {
        public CardRepository() : base("default", tableName: "Card", primaryKeyField: "CardId") { }
    }
}