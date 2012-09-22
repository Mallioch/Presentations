using System;
using System.Collections.Generic;
using System.Linq;

namespace EvolvingAjaxAndASPNETMVCPractices.Code
{
    public class BookRepository : IBookRepository
    {
        static BookRepository()
        {
            _books.Add(new Book { Author = "Robert C. Martin", Title = "Clean Code", Subject = "General Programming" });
            _books.Add(new Book { Author = "Charles Petzold", Title = "Applications = Code + Markup", Subject = "WPF" });
            _books.Add(new Book { Author = "Jon Loeliger", Title = "Version Control with Git", Subject = "Git" });
            _books.Add(new Book { Author = "Obie Fernandez", Title = "The Rails 3 Way", Subject = "Ruby on Rails" });
            _books.Add(new Book { Author = "James Edward Gray II", Title = "Best of Ruby Quiz", Subject = "Ruby" });
            _books.Add(new Book { Author = "Nancy Duarte", Title = "slide:ology", Subject = "Presentations" });
            _books.Add(new Book { Author = "Laurent Pflughaupt", Title = "Letter by Letter", Subject = "Typography" });
            _books.Add(new Book { Author = "Ellen Lupton", Title = "Thinking with Type", Subject = "Typography" });
            _books.Add(new Book { Author = "Jeffrey Zeldman", Title = "Designing with Web Standards", Subject = "Web Development" });
            _books.Add(new Book { Author = "Chad Fowler", Title = "The Passionate Programmer", Subject = "General Programming" });
            _books.Add(new Book { Author = "Mike Gunderloy", Title = "Coder to Developer", Subject = "General Programming" });
            _books.Add(new Book { Author = "Shay Friedman", Title = "IronRuby Unleashed", Subject = "Ruby" });
            _books.Add(new Book { Author = "Paul Kimmel", Title = "LINQ Unleashed", Subject = "C#" });
            _books.Add(new Book { Author = "Bill Wagner", Title = "Effective C#", Subject = "C#" });
            _books.Add(new Book { Author = "Jesse Liberty", Title = "Programming C#", Subject = "C#" });
            _books.Add(new Book { Author = "Adam Nathan", Title = "Windows Presentation Foundation Unleashed", Subject = "WPF" });
            _books.Add(new Book { Author = "Charles Petzold", Title = "Programming Microsoft Windows with C#", Subject = "Windows Forms" });
        }

        private static List<Book> _books = new List<Book>();

        public List<string> GetAuthors()
        {
            return (from b in _books
                        orderby b.Author ascending
                        select b.Author).Distinct().ToList();
        }

        public List<Book> GetBooksByAuthor(string author)
        {
            return (from b in _books
                        orderby b.Title ascending
                        where b.Author == author
                        select b).ToList();
        }
    }
}