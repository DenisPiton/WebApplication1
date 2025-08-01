using Microsoft.AspNetCore.Mvc;


namespace WebApplication1.controllers
{
    public class IndexController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}