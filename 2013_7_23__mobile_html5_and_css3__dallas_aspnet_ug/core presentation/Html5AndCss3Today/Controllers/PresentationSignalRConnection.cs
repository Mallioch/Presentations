using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Html5AndCss3Today.Controllers
{
    public class PresentationSignalRConnection : PersistentConnection
    {
        public static string[] Pages { get { return _pages; } }

        public static string[] _pages = {
            "start"
            , "assumptions"
            , "about_code"
            , "on_your_own_device"
            , "what_we_are_using_now"
            , "modernizr"
            , "modernizr_code_css"
            , "modernizr_code_javascript"
            , "websockets"
            , "websockets_code1"
            , "websockets_code2"
            , "websockets_code3"
            , "server"
            , "viewport_meta_tag"
            , "css3"
            , "boxshadow"
            , "boxshadow_code"
            , "boxshadow2"
            , "boxshadow2_code"
            , "mediaqueries"
            , "mediaqueries_code"
            , "text_shadow"
            , "text_shadow_code"
            , "border_radius"
            , "border_radius_code"
            , "opacity"
            , "opacity_code"
            , "rgba"
            , "rgba_code"
            , "generated_content"
            , "generated_content_code"
            , "css_gradients"
            , "css_gradients_code"
            , "css_gradients_code_2"
            , "multiple_backgrounds"
            , "multiple_backgrounds_code"
            , "transforms"
            , "transforms_code_1"
            , "transforms_code_2"
            , "transforms_code_3"
            , "transforms_code_4"
            , "transition"
            , "transition_code_1"
            , "transition_code_2"
            , "animation_prep"
            , "animation"
            , "animation_code1"
            , "animation_code2"
            , "css_over"
            , "html5"
            , "video"
            , "video_code"
            , "audio"
            , "audio_2"
            , "audio_code"
            , "forms"
            , "forms_2"
            , "forms_1_code"
            , "forms_2_code"
            , "offline"
            , "offline_htmltag"
            , "offline_manifest"
            , "geolocation"
            , "geolocation_code"
            , "canvas"
            , "canvas_code"
            , "canvas-touch"
            , "webworkers"
            , "webworkers_code_1"
            , "webworkers_code_2"
            , "history"
            , "history_code"
            , "webstorage"
            , "webstorage_code"
            , "final_thoughts"
            , "progressive_enhancement"
            , "argument_of_speed"
            , "about_me" };

        private static int _currentPosition = 0;

        protected override System.Threading.Tasks.Task OnConnected(IRequest request, string connectionId)
        {
            var message = new PageMessage
            {
                type = "pageChange",
                data = _pages[_currentPosition]
            };
            Connection.Send(connectionId, message);

            return base.OnConnected(request, connectionId);
        }

        protected override System.Threading.Tasks.Task OnReceived(IRequest request, string connectionId, string data)
        {
            PageMessage message = null;
            if (data == "next")
            {
                _currentPosition++;
                if (_currentPosition >= _pages.Length)
                    _currentPosition = _pages.Length - 1;

                message = new PageMessage
                {
                    type = "pageChange",
                    data = _pages[_currentPosition]
                };
            }
            else if (data == "previous")
            {
                _currentPosition--;
                if (_currentPosition == -1)
                    _currentPosition = 0;

                message = new PageMessage
                {
                    type = "pageChange",
                    data = _pages[_currentPosition]
                };
            }
            else
            {
                for (int i = 0; i < _pages.Length; i++)
                {
                    if (_pages[i] == data)
                    {
                        _currentPosition = i;
                        break;
                    }
                }

                message = new PageMessage
                {
                    type = "pageChange",
                    data = data
                };
            }

            Connection.Broadcast(message);
            return base.OnReceived(request, connectionId, data);
        }
    }

    public class PageMessage
    {
        public string type;
        public string data;
    }
}