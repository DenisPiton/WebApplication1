
using Microsoft.Extensions.DependencyModel;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using WebApplication1.Services;

namespace WebApplication1.CustomAttributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public  class EmailExist : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            IUserUtils? utils = validationContext.GetService<IUserUtils>();
            string email = value as string ?? "";
            if (utils != null)
            {
                return utils.AnyUsersByEmail(email) ? ValidationResult.Success : new ValidationResult(ErrorMessage="данного адреса эл. почты не существует");
            }
            return ValidationResult.Success;
        }
    }
}