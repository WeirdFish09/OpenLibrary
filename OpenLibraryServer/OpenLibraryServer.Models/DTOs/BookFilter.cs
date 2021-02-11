namespace OpenLibraryServer.Models.DTOs
{
    public class BookFilter
    {
        public string Title { get; set; } = "";
        public string Author { get; set; } = "";
        public int[] Genres { get; set; } = new int[] { };
    }
}