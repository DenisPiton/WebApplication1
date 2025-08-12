using System.ComponentModel.DataAnnotations;
using WebApplication1.CustomAttributes;
namespace WebApplication1.Models.DTO
{
    public class UserRegistrationDTO
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Your username is too long")]
        [UniqueLogin]
        public required string username { get; set; }
        [Required(ErrorMessage = "Please set your password")]
        [DataType(DataType.Password)]
        public required string password { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "This is not an email address")]
        [DataType(DataType.EmailAddress)]
        [UniqueEmail]
        public required string email { get; set; }
        
    }
}