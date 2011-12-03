using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Massive;

namespace MyToDoListApp.Models
{
    public class Tasks : DynamicModel
    {
        public Tasks() : base("default", "Task", "TaskId") { }
    }
}