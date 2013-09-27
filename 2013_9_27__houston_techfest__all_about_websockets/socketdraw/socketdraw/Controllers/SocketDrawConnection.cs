using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace socketdraw.Controllers
{
    public class SocketDrawConnection : PersistentConnection
    {
        private static List<string> _lines = new List<string>();

        protected override System.Threading.Tasks.Task OnConnected(IRequest request, string connectionId)
        {
            Connection.Send(connectionId, _lines);

            return base.OnConnected(request, connectionId);
        }


        protected override System.Threading.Tasks.Task OnReceived(IRequest request, string connectionId, string data)
        {
            if (data == "clear")
            {
                _lines = new List<string>();
            }
            else
            {
                _lines.Add(data);
            }

            Connection.Broadcast(data);
            return base.OnReceived(request, connectionId, data);
        }


    }
}
