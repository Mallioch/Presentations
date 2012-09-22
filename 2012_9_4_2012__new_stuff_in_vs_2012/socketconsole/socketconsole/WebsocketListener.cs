using System;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace socketconsole
{
    public class WebsocketListener
    {
        public async void Listen(string uri)
        {
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add(uri);
            listener.Start();
            Console.WriteLine("Listening...");

            while (true)
            {
                HttpListenerContext listenerContext = await listener.GetContextAsync();

                if (listenerContext.Request.IsWebSocketRequest)
                {
                    ProcessRequest(listenerContext);
                }
                else
                {
                    listenerContext.Response.StatusCode = 400;
                    listenerContext.Response.Close();
                }
            }
        }

        private async void ProcessRequest(HttpListenerContext listenerContext)
        {
            WebSocketContext webSocketContext = await listenerContext.AcceptWebSocketAsync(subProtocol: null);

            using (WebSocket webSocket = webSocketContext.WebSocket)
            {
                Random rand = new Random(1);
                while (webSocket.State == WebSocketState.Open)
                {
                    string randomValue = rand.Next(1, 5000).ToString();
                    ArraySegment<byte> outputBuffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(randomValue));
                    await webSocket.SendAsync(outputBuffer, WebSocketMessageType.Text, true, CancellationToken.None);

                    await Task.Delay(new TimeSpan(0, 0, 1));
                }
            }
        }
    }
}
