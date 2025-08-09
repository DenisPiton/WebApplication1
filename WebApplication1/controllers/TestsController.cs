using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;
using WebApplication1.Services.Implementations;


namespace WebApplication1.controllers
{

    public class TestsController : Controller
    {
        private readonly IUserUtils utils;
        TestsController(UserUtils urils) { this.utils = utils; }
        public string Index()
        {
            User a = new User { email = "asd", password = "asd", userame = "asd", words_test_passed = 0, test_passed = 0, best_time = 0 };
            utils.CreateUser(a.userame, a.email, a.password);
            return "";
        }
    }
}