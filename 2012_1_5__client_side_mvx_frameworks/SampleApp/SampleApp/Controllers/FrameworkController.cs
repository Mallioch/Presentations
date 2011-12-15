using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleApp.Controllers
{
    public class FrameworkController : Controller
    {
        public ActionResult Backbone()
        {
            return View();
        }

        public ActionResult Spine()
        {
            return View();
        }

    }
}
