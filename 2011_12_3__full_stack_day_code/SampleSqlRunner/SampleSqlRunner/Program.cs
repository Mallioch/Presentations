using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Massive;

namespace SampleSqlRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            //AdHocQuery();

            var db = new Tasks();

            var tasks = QueryAll(db);

            
            
            
            //Console.WriteLine("Hello world!");

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
