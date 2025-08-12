using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
namespace WebApplication1.Filters
{
    public class AuthFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            ISession ses = context.HttpContext.Session;
            int? id = ses.GetInt32("User_id");
            if (id == null)
            {
                context.Result = new UnauthorizedResult();
            }
            return;
        }
        

                
    }
}