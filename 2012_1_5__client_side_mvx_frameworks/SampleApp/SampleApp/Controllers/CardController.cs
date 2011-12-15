using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using SampleApp.Code;

namespace SampleApp.Controllers
{
    public class CardController : Controller
    {
        public ActionResult Active()
        {
            var activeWords = GetWords(true);

            return Json(activeWords, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Archived()
        {
            var archivedWords = GetWords(false);

            return Json(archivedWords, JsonRequestBehavior.AllowGet);
        }


        private static List<Card> GetWords(bool active)
        {
            var activeWords = new List<Card>();

            var tbl = new CardRepository();
            IEnumerable<dynamic> words = tbl.All(where: "WHERE IsArchived=@0", args: (active == true ? 0 : 1));
            foreach (var record in words)
            {
                var card = new Card();
                card.id = record.CardId;
                card.correctCount = record.TimesCorrect;
                card.incorrectCount = record.TimesIncorrect;
                card.isArchived = record.IsArchived == 1 ? true : false;
                card.recto = record.Recto;
                card.verso = record.Verso;

                activeWords.Add(card);
            }
            return activeWords;
        }

        [HttpPut]
        public ActionResult MarkCorrect(int cardId)
        {
            var tbl = new CardRepository();
            var card = tbl.Single(cardId);
            card.TimesCorrect++;
            tbl.Save(card);

            return Json(true);
        }

        [HttpPut]
        public ActionResult MarkIncorrect(int cardId)
        {
            var tbl = new CardRepository();
            var card = tbl.Single(cardId);
            card.TimesIncorrect++;
            tbl.Save(card);

            return Json(true);
        }

        [HttpPut]
        public ActionResult Archive(int cardId)
        {
            var tbl = new CardRepository();
            var card = tbl.Single(cardId);
            card.IsArchived = true;
            tbl.Save(card);

            return Json(true);
        }

        [HttpPut]
        public ActionResult Unarchive(int cardId)
        {
            var tbl = new CardRepository();
            var card = tbl.Single(cardId);
            card.IsArchived = false;
            tbl.Save(card);

            return Json(true);
        }

    }

}