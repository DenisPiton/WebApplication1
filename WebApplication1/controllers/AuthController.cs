using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;

namespace WebApplication1.controllers
{

    public class AuthController : Controller
    {
        private readonly IUserUtils utils;
        public AuthController(IUserUtils utils) { this.utils = utils; }

        [HttpGet]
        public ActionResult Index()
        {
            return View();

        }
        [HttpPost]
        public IActionResult Index([FromForm] UserDTO DTO)
        {
            User? user = utils.GetUsersWhere(a => a.userame == DTO.email_or && a.password == DTO.password).IsNullOrEmpty() ? null : utils.GetUsersWhere(a => a.userame == DTO.email_or && a.password == DTO.password).First();
            if (user != null)
            {
                ISession ses = HttpContext.Session;
                ses.SetInt32("User_id", user.id);

                return Redirect("/Tests/Main");


            }
            else
            {
                return Redirect("/Auth/Reg");
            }

        }
        [HttpGet]
        public IActionResult Reg()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Reg(UserRegistrationDTO dto)
        {
            if (ModelState.IsValid)
            {
                User user = utils.CreateUser(dto.username, dto.password, dto.email);
                ISession ses = HttpContext.Session;
                ses.SetInt32("User_id", user.id);

                return RedirectToAction("Main", "Tests");


            }
            else
            {
                return View(dto);
            }
        }
        



    }
}
