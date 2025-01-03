using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

public class SignLearn
{
    public Guid Id { get; set; }
    
    [Required]
    public string Word { get; set; }
    
    public string Description { get; set; }

    public string VideoName { get; set; }

    public class Configuration : IEntityTypeConfiguration<SignLearn>
    {
        public void Configure(EntityTypeBuilder<SignLearn> builder)
        {
            builder.HasIndex(e => e.Word)
                   .IsUnique();
        }
    }
}
