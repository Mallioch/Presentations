using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Massive;
using System.Dynamic;

namespace SampleSqlRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            var db = new Tasks();

            //AdHocQuery();
            //QueryAll(db);

            //CreateReadAndUpdateTask(db);
            
            //Console.WriteLine("Hello world!");

            //DeleteSomething(db);
        }

        private static void DeleteSomething(Tasks db)
        {
            decimal id = InsertSomething(db, "foo");
            db.Delete(id);
        }

        private static void CreateReadAndUpdateTask(Tasks db)
        {
            decimal id = InsertSomething(db, "blow nose");
            Console.WriteLine("New id: " + id);

            dynamic task = db.Single(id);
            task.Description = "blow nose loudly";

            db.Update(task, id);
        }

        private static decimal InsertSomething(Tasks db, string description)
        {
            dynamic data = new ExpandoObject();
            data.Description = description;

            dynamic retVal = db.Insert(data);
            return retVal.ID;
        }

        private static void QueryAll(Tasks db)
        {
            var tasks = db.All();
            ShowListOfData(tasks);
        }

        private static void AdHocQuery()
        {
            var data = DB.Current.Query("SELECT * FROM Task");

            ShowListOfData(data);
        }

        private static void ShowListOfData(IEnumerable<dynamic> data)
        {
            foreach (var row in data)
            {
                Console.WriteLine(row.Description + " - " + row.CreateDate);
            }
        }
    }

    public class Tasks : DynamicModel
    {
        public Tasks() : base("default", "Task", "TaskId") { }
    }
}
