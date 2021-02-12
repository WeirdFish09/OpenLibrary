using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenLibraryServer.Models;
using OpenLibraryServer.Models.DTOs;
using OpenLibraryServer.Service.Exceptions;
using OpenLibraryServer.Service.Interfaces;

namespace OpenLibraryServer.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }
        
        public async Task<IEnumerable<Genre>> GetBooKGenres()
        {
            return await _bookService.GetBookGenres();
        }
        [HttpGet("{bookId}")]
        public async Task<BookTO> GetById([FromRoute] string bookId)
        {
            if (!Guid.TryParse(bookId, out Guid guid))
            {
                throw new InvalidFormatException($"String {bookId} is not a valid Guid");
            }
            return await _bookService.GetById(guid);
        }
        [HttpGet]
        public async Task<IEnumerable<BookTO>> GetByFilter([FromQuery] int count, [FromQuery] int offset, [FromQuery] BookFilter filter = null)
        {
            return await _bookService.GetByFilter(filter ?? new BookFilter(), count, offset);
        }

    }
}