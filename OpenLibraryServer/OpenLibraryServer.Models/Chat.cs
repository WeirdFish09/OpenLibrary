using System;
using System.ComponentModel.DataAnnotations;

namespace OpenLibraryServer.Models
{
    public class Chat
    {
        [Key]
        public Guid ChatId { get; set; }
        public string Name { get; set; }
    }
}