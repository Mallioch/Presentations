using System;
using System.Web.Mvc;
using System.Web.WebPages;

namespace MobileMVC
{
    public class CustomViewEngine : RazorViewEngine
    {
        protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
        {
            if (String.IsNullOrWhiteSpace(masterPath))
                masterPath = @"~/Views/Shared/_Layout.cshtml";

            string altViewPath = String.Empty;
            string altMasterPath = String.Empty;

            string testVersion = GetTestVersion(controllerContext, viewPath);

            if (controllerContext.HttpContext.GetOverriddenUserAgent().IndexOf("MSIE 10.0; Windows Phone 8.0", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                CheckView(viewPath, ref altViewPath, "wp8", testVersion, controllerContext);
                CheckView(masterPath, ref altMasterPath, "wp8", String.Empty, controllerContext);
            }

            if (controllerContext.HttpContext.GetOverriddenBrowser().IsMobileDevice)
            {
                if (String.IsNullOrWhiteSpace(altViewPath))
                    CheckView(viewPath, ref altViewPath, "mobile", testVersion, controllerContext);
                if (String.IsNullOrWhiteSpace(altMasterPath))
                    CheckView(masterPath, ref altMasterPath, "mobile", String.Empty, controllerContext);
            }

            if (!String.IsNullOrWhiteSpace(altViewPath))
                viewPath = altViewPath;
            if (!String.IsNullOrWhiteSpace(altMasterPath))
                masterPath = altMasterPath;

            return base.CreateView(controllerContext, viewPath, masterPath);
        }

        private string GetTestVersion(ControllerContext controllerContext, string viewPath)
        {
            if (viewPath == "~/Views/Home/Index.cshtml")
            {
                var testCookie = controllerContext.HttpContext.Request.Cookies["testcookie"];
                if (testCookie == null)
                    return String.Empty;

                if (testCookie.Value == "a")
                    return "v1";
                else
                    return "v2";
            }
            else
            {
                return String.Empty;
            }
        }

        private void CheckView(string viewPath, ref string altPath, string skinType, string testVersion, ControllerContext context)
        {
            string temp = viewPath.Replace(".cshtml", String.Format(".{0}.{1}.cshtml", skinType, testVersion));
            if (FileExists(context, temp))
            {
                altPath = temp;
                return;
            }

            temp = viewPath.Replace(".cshtml", String.Format(".{0}.cshtml", skinType));
            if (FileExists(context, temp))
                altPath = temp;
        }
    }
}