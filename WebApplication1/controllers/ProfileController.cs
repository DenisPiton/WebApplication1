using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
    }
}
