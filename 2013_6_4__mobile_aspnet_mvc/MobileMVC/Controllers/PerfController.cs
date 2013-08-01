using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobileMVC.Controllers
{
    public class PerfController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Gzip()
        {
            return View();
        }

        public ActionResult Minify()
        {
            return View();
        }

        public ActionResult ClientSideCaching()
        {
            Response.Cache.SetExpires(DateTime.Now.AddSeconds(20));
            Response.Cache.SetSlidingExpiration(true);
            Response.Cache.SetCacheability(HttpCacheability.Public);
            Response.Cache.SetMaxAge(new TimeSpan(0, 0, 20));

            return View();
        }

        public ActionResult Sprites()
        {
            return View();
        }
    }
}
