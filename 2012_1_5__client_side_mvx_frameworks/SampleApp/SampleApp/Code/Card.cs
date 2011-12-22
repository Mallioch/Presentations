using System;

namespace SampleApp.Code
{
    public class Card
    {
        public int id { get; set; }
        public string recto { get; set; }
        public string verso { get; set; }
        public int correctCount { get; set; }
        public int incorrectCount { get; set; }
        public bool isArchived { get; set; }
        public int userId { get; set; }
    }

}