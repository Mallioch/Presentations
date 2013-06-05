using System;
using System.Web.Mvc;

namespace MobileMVC
{
    public static class MapHelper
    {
        private static string _imageMarkup = "<img src=\"http://maps.googleapis.com/maps/api/staticmap?center={0}&zoom=13&size=400x300&sensor=false\" />";
        private static string _jsApiMarkup = "<a href=\"https://maps.google.com/?q={0}\">{1}</a>";

        public static MvcHtmlString Map(this HtmlHelper helper, string address)
        {
            string image = String.Format(_imageMarkup, address);

            string userAgent = helper.ViewContext.HttpContext.Request.UserAgent;
            if (userAgent.IndexOf("BlackBerry", StringComparison.OrdinalIgnoreCase) >= 0)
                return MvcHtmlString.Create(image);
            else
                return MvcHtmlString.Create(String.Format(_jsApiMarkup, address, image));
        }
    }
}