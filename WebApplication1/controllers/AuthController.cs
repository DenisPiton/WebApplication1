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
            if (ModelState.IsValid)
            {
                User? user = utils.GetUserByEmail(DTO.email_or);
                if (user.password == DTO.password)
                {
                    ISession ses = HttpContext.Session;
                    ses.SetInt32("User_id", user.id);
                    return RedirectToAction("Main", "Tests");
                }
                else
                {
                    return View(DTO);
                }
                
            }
            else
            {
                return View(DTO);
            }

        }
        [HttpGet]
        public IActionResult Reg()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Reg([FromForm]UserRegistrationDTO dto)
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
