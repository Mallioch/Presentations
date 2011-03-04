using System;
using System.Collections.Generic;

namespace Pizza.Codez
{
    public class PizzaTypeRepository
    {
        private static List<PizzaType> _pizzaTypes = new List<PizzaType>();

        public List<PizzaType> GetPizzaTypes()
        {
            return _pizzaTypes;
        }

        public void Add(PizzaType pizzaType)
        {
            _pizzaTypes.Add(pizzaType);
        }
    }
}