using System;

namespace OpenLibraryServer.Models.DTOs
{
    public class MessageTO
    {
        public DateTime DateTime { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }
    }
}