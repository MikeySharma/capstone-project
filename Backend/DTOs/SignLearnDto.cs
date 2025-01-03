namespace Backend.DTOs
{
	public class SignLearnDto
	{
		public string Word { get; set; }

		public string Description { get; set; }

		public IFormFile Video { get; set; }
	}
}