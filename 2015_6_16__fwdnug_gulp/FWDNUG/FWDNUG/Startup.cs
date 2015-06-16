using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FWDNUG.Startup))]
namespace FWDNUG
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}
