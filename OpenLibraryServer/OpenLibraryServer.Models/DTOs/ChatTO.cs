using System;

namespace OpenLibraryServer.Models.DTOs
{
    public class ChatTO
    {
        public Guid ChatId { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public ChatMessage LastMessage { get; set; }
    }
}