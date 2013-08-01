using System.Web;
using System.Web.Mvc;

namespace Html5AndCss3Today
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}