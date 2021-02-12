using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenLibraryServer.Models;
using OpenLibraryServer.Models.DTOs;

namespace OpenLibraryServer.Service.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<Genre>> GetBookGenres();
        Task<BookTO> GetById(Guid guid);
        Task<IEnumerable<BookTO>> GetByFilter(BookFilter filter, int count, int offset);
        Task<BookTO> AddBook(BookTO bookTo);
        Task ChangeBookStatus(Guid bookId, string status);
    }
}