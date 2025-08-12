using System.ComponentModel.DataAnnotations;
using WebApplication1.Data.Entites;
using WebApplication1.Services;
using WebApplication1.Services.Implementations;
namespace WebApplication1.CustomAttributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class UniqueEmail : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            IUserUtils? utils = validationContext.GetService<IUserUtils>();
            string? email = value as string;
            if (utils != null && email != null)
            {

                if (!utils.AnyUsersByEmail(email))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage ?? "BOBOBOBOOBOB");
                }
            }
            else if (string.IsNullOrEmpty(email))
            {
                return new ValidationResult(ErrorMessage ?? "Вы не указали Почту");
            }
            else
            {
                return new ValidationResult(ErrorMessage ?? "Проблемы с сервером");
            }
        }
    }
}