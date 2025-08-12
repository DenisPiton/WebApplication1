
using Microsoft.AspNetCore.Mvc.Filters;
using WebApplication1.Services;
using WebApplication1.Data.Entites;
using System.Net.Mime;

namespace WebApplication1.Filters
{
    public class CurrentUser : IActionFilter
    {
        private readonly IUserUtils _utils;
        public CurrentUser(IUserUtils utils){_utils = utils;}

        public void OnActionExecuted(ActionExecutedContext context)
        {
            
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            ISession ses = context.HttpContext.Session;
            int? userId = ses.GetInt32("User_id");
            if (userId == null) { return; }

            User? user = _utils.GetUserById((int)userId);
            if (user == null)
            {
                return;
            }
            context.HttpContext.Items["CurrentUser"] = user;
        }
    }
}