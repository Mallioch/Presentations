using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Pizza.Codez;
using Pizza.ViewModels.Home;

namespace Pizza.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Pizzas()
        {
            var repo = new PizzaTypeRepository();
            var pizzas = repo.GetPizzaTypes();

            var vm = new PizzasViewModel();
            vm.CountOfPizzas = pizzas.Count;
            vm.PizzaTypes = pizzas;

            return View(vm);
        }

        [HttpGet]
        public ActionResult CreateAPizza()
        {
            return View();
        }

        public ActionResult CreateAPizza(CreateAPizzaViewModel vm)
        {
            var repo = new PizzaTypeRepository();
            repo.Add(new PizzaType
            {
                Name = vm.Name
            });

            return RedirectToAction("Pizzas");
        }

        public ActionResult GetSomeStuff()
        {
            var pizzaType = new PizzaType
            {
                Name = "Tyranasaurus Rex"
            };

            return Json(pizzaType, JsonRequestBehavior.AllowGet);
        }
    }
}
