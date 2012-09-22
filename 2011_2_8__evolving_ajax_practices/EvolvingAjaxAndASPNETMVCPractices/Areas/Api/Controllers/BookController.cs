using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EvolvingAjaxAndASPNETMVCPractices.Code;

namespace EvolvingAjaxAndASPNETMVCPractices.Areas.Api.Controllers
{
    public class BookController : Controller
    {
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        private IBookRepository _bookRepository;

        public JsonResult GetAuthors()
        {
            var authors = _bookRepository.GetAuthors();

            return Json(authors, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetBooksByAuthor(string author)
        {
            var books = _bookRepository.GetBooksByAuthor(author);

            return Json(books);
        }
    }
}
