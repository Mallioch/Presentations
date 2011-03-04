using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

namespace Pizza.Helpers
{
    public static class PizzaHelper
    {
        public static MvcHtmlString ShowSomePizzaStuff(this HtmlHelper helper, int count)
        {
            var sb = new StringBuilder();

            for (int i = 0; i < count; i++)
                sb.Append("<p>Some pizza stuff goes here.</p>");

            return MvcHtmlString.Create(sb.ToString());
        }
    }
}