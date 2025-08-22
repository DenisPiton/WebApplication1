using System.ComponentModel.DataAnnotations;
using WebApplication1.CustomAttributes;
namespace WebApplication1.Models.DTO
{
    public class UserRegistrationDTO
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Ваше имя пользователя слишком длинное")]
        [UniqueLogin]
        public required string username { get; set; }
        [Required(ErrorMessage = "Введите пароль")]
        [DataType(DataType.Password)]
        public required string password { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Это не адрес эл. почты")]
        [DataType(DataType.EmailAddress)]
        [UniqueEmail]
        public required string email { get; set; }
        
    }
}