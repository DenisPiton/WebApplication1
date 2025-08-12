using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;
using WebApplication1.Filters;
using WebApplication1.Services.Implementations;


namespace WebApplication1.controllers
{

    public class TestsController : Controller
    {

        [AuthFilter]
        public IActionResult Main()
        {
            return View();
        }
        

    }
}