using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using WebApplication1.Data.Entites;
using WebApplication1.Filters;
using WebApplication1.Services;
namespace WebApplication1.controllers
{
    public class ProfileController : Controller
    {
        public IResultUtils _resultUtils { get; set; }
        public IUserUtils _userUtils { get; set; }
        public ProfileController(IResultUtils a, IUserUtils b) { this._resultUtils = a; this._userUtils = b; }



        [AuthFilter]
        public IActionResult Index()
        {

            ViewBag.user = _userUtils.GetUserById(HttpContext.Session.GetInt32("User_id")).userame;
            return View();
        }
        public IActionResult LeaderBoard()
        {
            IList<Result> a = _resultUtils.Get100BestResults();
            return View(a);
        }
        
    }
}
