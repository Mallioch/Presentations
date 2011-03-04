using System;
using System.Collections.Generic;
using Pizza.Codez;

namespace Pizza.ViewModels.Home
{
    public class PizzasViewModel
    {
        public int CountOfPizzas { get; set; }
        public List<PizzaType> PizzaTypes { get; set; }
    }
}