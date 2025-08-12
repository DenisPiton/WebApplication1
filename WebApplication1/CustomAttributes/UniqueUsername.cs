using System.ComponentModel.DataAnnotations;
using WebApplication1.Data.Entites;
using WebApplication1.Services;
using WebApplication1.Services.Implementations;
namespace WebApplication1.CustomAttributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class UniqueLogin : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            IUserUtils? utils = validationContext.GetService<IUserUtils>();
            string? username = value as string;
            if (utils != null && username != null)
            {

                if (!utils.AnyUserByLogin(username))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage ?? "Имя уже занято");
                }
            }
            else if (string.IsNullOrEmpty(username))
            {
                return new ValidationResult(ErrorMessage ?? "Вы не указали имя пользователя");
            }
            else
            {
                return new ValidationResult(ErrorMessage ?? "Проблемы с сервером");
            }
        }
    }
}