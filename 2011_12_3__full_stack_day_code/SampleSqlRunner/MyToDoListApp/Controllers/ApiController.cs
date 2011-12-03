using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyToDoListApp.Models;
using System.Dynamic;

namespace MyToDoListApp.Controllers
{
    public class ApiController : Controller
    {
        public ApiController()
        {
            _db = new Tasks();
        }

        private Tasks _db;

        [HttpDelete]
        public ActionResult Delete(int? id)
        {
            _db.Delete(id.Value);

            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult Add(string description)
        {
            //if (!ModelState.IsValid)
            //{
            //    return View();
            //}

            dynamic obj = new ExpandoObject();
            obj.Description = description;

            var retValue = _db.Insert(obj);

            return PartialView("~/views/home/TaskPartialView.cshtml", new Task
                {
                    Description = description,
                    TaskId = Convert.ToInt32(retValue.ID)
                });
        }

    }
}
