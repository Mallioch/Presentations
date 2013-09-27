using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using System.Web.WebSockets;

namespace socketconsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Start();

            Console.WriteLine("Press <ENTER> to exit...");
            Console.ReadLine();
        }

        private static void Start()
        {
            string uri = String.Format("http://localhost:4000/bar/");
            var listener = new WebsocketListener();
            listener.Listen(uri);
            

        }

        
    }
}
