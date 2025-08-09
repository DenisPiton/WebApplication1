using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;

namespace WebApplication1.controllers
{

    public class HomeController : Controller
    {
        private readonly IUserUtils utils;
        public HomeController(IUserUtils utils) { this.utils = utils; }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string Index([FromForm] UserDTO DTO)
        {
            User? user = utils.GetUsersWhere(a => a.userame == DTO.email_or && a.password == DTO.password).IsNullOrEmpty() ? null :  utils.GetUsersWhere(a => a.userame == DTO.email_or && a.password == DTO.password).First();
            if (user != null)
            {
                return user.email;
            }
            return "NULL";
        }



    }
}
