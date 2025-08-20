using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Entites;
using WebApplication1.Filters;
using WebApplication1.Models.DTO;
using WebApplication1.Services;



namespace WebApplication1.controllers
{
    public class ApiController : Controller
    {
        private readonly IResultUtils _resultUtils;
        public ApiController(IResultUtils resultUtils) { this._resultUtils = resultUtils; }
        public IActionResult results()
        {
            return View();
        }

        [HttpPost]
        [AuthFilter]
        public JsonResult CreateResult(ResultDTO dto)
        {

            Console.WriteLine(HttpContext.Session.GetString("User_id"));
            if ((User?)HttpContext.Items["CurrentUser"] != null)
            {
                Result result = new Result {user = (User)HttpContext.Items["CurrentUser"] , score = dto.score, time = dto.time, type = dto.type};
                _resultUtils.CreateResult(result);
                return Json(new {error = "NOPE"});
            }
            else
            {
                return Json(new { error = "Some Error has occurred" });
            }
                
        }
    }
}
