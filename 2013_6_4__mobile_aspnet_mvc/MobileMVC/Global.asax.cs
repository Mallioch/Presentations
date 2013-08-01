using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.WebPages;
using WURFL;
using WURFL.Config;

namespace MobileMVC
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private static IWURFLManager _wurflManager;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            #region WP8 Display Mode

            /*

            Func<HttpContextBase, bool> condition = (context) =>
            {
                return context.GetOverriddenUserAgent()
                  .IndexOf("MSIE 10.0; Windows Phone 8.0", StringComparison.OrdinalIgnoreCase) >= 0;
            };

            var wp8DisplayMode = new DefaultDisplayMode("wp8");
            wp8DisplayMode.ContextCondition = condition;

            DisplayModeProvider.Instance.Modes.Insert(0, wp8DisplayMode);
            */
            #endregion
            #region Custom View Engine

            DisplayModeProvider.Instance.Modes.RemoveAt(0);

            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new CustomViewEngine());

            #endregion


            #region Setup Wurfl
            /*

            string wurflDataPath = Server.MapPath(@"~/App_Data/wurfl-latest.zip");
            var configurer = new InMemoryConfigurer().MainFile(wurflDataPath);
            _wurflManager = WURFLManagerBuilder.Build(configurer);

            #endregion
            #region Setup Wurfl-based Display Modes

            var superMode = new DefaultDisplayMode("super");
            superMode.ContextCondition = (context) =>
            {
                IDevice device = _wurflManager.GetDeviceForRequest(context.GetOverriddenUserAgent());
                string deviceOS = device.GetCapability("device_os").ToLower();
                string versionString = device.GetCapability("device_os_version");

                Version version = new Version();
                Version.TryParse(versionString, out version);

                bool isSupportedAndroid = deviceOS == "android" && version >= new Version("2.2");
                bool isSupportediOS = deviceOS == "ios" && version >= new Version("4.0");

                if (isSupportedAndroid || isSupportediOS)
                    return true;
                else
                    return false;
            };

            var basicMode = new DefaultDisplayMode("basic");
            basicMode.ContextCondition = (context) =>
            {
                IDevice device = _wurflManager.GetDeviceForRequest(context.GetOverriddenUserAgent());
                string deviceOS = device.GetCapability("device_os").ToLower();
                string versionString = device.GetCapability("device_os_version");

                Version version = new Version();
                Version.TryParse(versionString, out version);

                bool isSupportedAndroid = deviceOS == "android" && version < new Version("2.2");
                bool isSupportediOS = deviceOS == "ios" && version < new Version("4.0");

                if (isSupportedAndroid || isSupportediOS)
                    return true;
                else
                    return false;
            };

            DisplayModeProvider.Instance.Modes.Insert(0, basicMode);
            DisplayModeProvider.Instance.Modes.Insert(0, superMode);
            */
            #endregion


            #region System.Web.Optimization


            var css = new Bundle("~/content/allcss", new CssMinify());
            css.Include("~/content/minify/cssfile1.css",
              "~/content/minify/cssfile2.css",
              "~/content/minify/cssfile3.css");

            var js = new Bundle("~/content/alljs", new JsMinify());
            js.Include("~/content/minify/jsfile1.js",
              "~/content/minify/jsfile2.js",
              "~/content/minify/jsfile3.js",
              "~/content/minify/jquery.js",
              "~/content/minify/underscore.js",
              "~/content/minify/backbone.js");

            BundleTable.Bundles.Add(css);
            BundleTable.Bundles.Add(js);

            #endregion
        }
    }
}