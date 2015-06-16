using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FWDNUG.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ToDo()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Notes()
        {
            return View();
        }
    }
}