using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;

namespace WebApplication1.CustomAttributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple =false)]
    public class LoginValidation : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            IUserUtils utils = validationContext.GetService<IUserUtils>();
            UserDTO userDTO = (value as UserDTO) ?? new UserDTO {email_or = "", password = "" };

            if(utils.GetUserByEmail(userDTO.email_or).password == userDTO.password)
            {
                
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(ErrorMessage = "Неправильный пароль");
            }


                ;

        }
    }
}
