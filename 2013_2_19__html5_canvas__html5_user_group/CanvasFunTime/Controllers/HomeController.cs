using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CanvasFunTime.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PacMan()
        {
            return View();
        }

        public ActionResult Isometric()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SavePicture(string fileData)
        {
            string clipped = fileData.Replace("data:image/jpeg;base64,", String.Empty);

            var path = HttpContext.Server.MapPath("~/content/upload/" + Guid.NewGuid().ToString() + ".jpg");

            byte[] filebytes = Convert.FromBase64String(clipped);
            using (FileStream fs = new FileStream(path,
                                           FileMode.CreateNew,
                                           FileAccess.Write,
                                           FileShare.None))
            {
                fs.Write(filebytes, 0, filebytes.Length);
            }


            return Json(true);
        }
    }
}
