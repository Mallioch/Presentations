using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SampleApp.Code;
using System.Dynamic;

namespace SampleApp.Areas.Api.Controllers
{
    public class CardController : Controller
    {
        public CardController()
        {
            _repo = new CardRepository();
        }

        private CardRepository _repo;

        [HttpGet]
        public ActionResult Index()
        {
            var cards = _repo.All();

            var vm = new List<Card>();
            foreach (dynamic card in cards)
            {
                vm.Add(new Card
                    {
                        id = Convert.ToInt32(card.CardId),
                        recto = card.Recto,
                        verso = card.Verso,
                        correctCount = card.TimesCorrect,
                        incorrectCount = card.TimesIncorrect,
                        isArchived = Convert.ToBoolean(card.IsArchived),
                        userId = card.UserId
                });
            }

            return Json(vm, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ActionName("Index")]
        public ActionResult Insert(Card card)
        {
            dynamic data = new ExpandoObject();
            data.Recto = card.recto;
            data.Verso = card.verso;
            data.TimesCorrect = card.correctCount;
            data.TimesIncorrect = card.incorrectCount;
            data.IsArchived = card.isArchived;
            data.UserId = 1;

            _repo.Save(data);

            return new EmptyResult();
        }

        [HttpPut]
        [ActionName("Index")]
        public ActionResult Update(Card card)
        {
            var data = _repo.Single(card.id);
            data.Recto = card.recto;
            data.Verso = card.verso;
            data.IsArchived = card.isArchived;

            _repo.Save(data);

            return new EmptyResult();
        }
    }
}
