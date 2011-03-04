using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Pizza.Controllers;
using System.Web.Mvc;
using Pizza.ViewModels.Home;

namespace Pizza.Tests
{
    [TestClass]
    public class HomeControllerTests
    {
        [TestMethod]
        public void Pizzas_WhenAuthenticated_ReturnsView()
        {
            var ctrl = new HomeController();
            var result = ctrl.Pizzas() as ViewResult;

            Assert.IsNotNull(result, "The view was null.");

            var vm = result.Model as PizzasViewModel;
            Assert.AreEqual(4, vm.CountOfPizzas, "Foo");
        }
    }
}
