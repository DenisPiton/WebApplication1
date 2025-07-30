using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace WebApplication1.controllers
{
    
    public class HomeController: Controller
    {

        public IActionResult Index() {
            return View();
        }


    }
}
