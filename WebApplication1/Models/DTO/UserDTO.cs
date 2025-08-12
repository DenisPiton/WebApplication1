using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.DTO
{
    public class UserDTO
    {
        
        [MaxLength(240)]
        [Required(ErrorMessage = "Это поле обязательно" )]
        [EmailAddress(ErrorMessage = "Адрес недействителен")]        
        public string? email_or { get; set; }
        [Required(ErrorMessage = "Это поле обязательно" )]
        [MaxLength(100)]
        
        public string? password { get; set; }
    }
}
