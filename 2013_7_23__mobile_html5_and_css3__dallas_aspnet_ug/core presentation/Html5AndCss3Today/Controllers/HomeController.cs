using System;
using System.Web.Mvc;

namespace Html5AndCss3Today.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SuperSecret()
        {
            ViewBag.Pages = PresentationSignalRConnection.Pages;

            return View();
        }
    }
}
