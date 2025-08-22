
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.CustomAttributes
{
    [AttributeUsage(AttributeTargets.GenericParameter, AllowMultiple = false)]
    public class PasswordValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext context)
        {
            string? password = value as string;
            bool trig1 = false;
            bool trig2 = false;
            foreach (var i in password)
            {
                if (i.ToString() == i.ToString().ToUpper())
                {
                    trig1 = true;
                }
                else if ("1234567890".Contains(i))
                {
                    trig2 = true;
                }

            }
            if (trig1 && trig2)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(ErrorMessage = "Пароль не содержит цифр и заглавных букв");
            }

        }
    }
}