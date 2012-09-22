using System;
using System.Collections.Generic;

namespace EvolvingAjaxAndASPNETMVCPractices.Code
{
    public interface IBookRepository
    {
        List<string> GetAuthors();
        List<Book> GetBooksByAuthor(string author);
    }
}