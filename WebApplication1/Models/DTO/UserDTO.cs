using System.ComponentModel.DataAnnotations;
using WebApplication1.CustomAttributes;
namespace WebApplication1.Models.DTO
{
    [LoginValidation]
    public class UserDTO
    {

        [MaxLength(240)]
        [Required(ErrorMessage = "Это поле обязательно")]
        [EmailAddress(ErrorMessage = "Адрес недействителен")]
        [EmailExist]
        public required string? email_or { get; set; }
        [Required(ErrorMessage = "Это поле обязательно" )]
        [MaxLength(100)]
        
        public required string? password { get; set; }
    }
}
