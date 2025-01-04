namespace Backend.DTOs
{
    public class CompleteWordDto
    {
        public string Word { get; set; }
    }

    public class WordProgressDto
    {
        public string CurrentWord { get; set; }
        public List<string> CompletedWords { get; set; }
        public bool IsCompleted { get; set; }
    }
}