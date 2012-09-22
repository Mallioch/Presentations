using System;
using System.Web.Mvc;
using System.Web.Routing;
using StructureMap;

namespace EvolvingAjaxAndASPNETMVCPractices.Code
{
    public class StructureMapControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            if (controllerType != null)
            {
                var ctrl = (IController)ObjectFactory.GetInstance(controllerType);
                return ctrl;
            }
            return null;
        }
    }
}