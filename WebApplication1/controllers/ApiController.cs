using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebApplication1.Data.Entites;
using WebApplication1.Filters;
using WebApplication1.Models.DTO;
using WebApplication1.Services;
using System.IO;

using System.Runtime.InteropServices.Marshalling;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Globalization;
using Microsoft.AspNetCore.Identity;



namespace WebApplication1.controllers
{
    public class LeaderboardBuf {
        public string username {  get; set; }
        public int result { get; set; }
    }
    public class buf
    {
        public List<string> words { get; set; }
    }
    public class results_buffer
    {
        public List<Result> slova { get; set; }
        public List<Result> primer { get; set; }
    }
    [Authorize]
    public class ApiController : Controller
    {
        private readonly IResultUtils _resultUtils;
        private readonly IUserUtils _userUtils;
        public ApiController(IResultUtils resultUtils,IUserUtils userUtils)  { this._resultUtils = resultUtils; this._userUtils = userUtils; }
        public IActionResult results()
        {
            return View();
        }


        [HttpPost]
        public IActionResult CreateResult([FromBody]ResultDTO dto)
        {
            Console.WriteLine("asljdg;askgd;kgals \n asdiahjskldhiaskldi \n asdkgasjdhfgalsjd\n asdhaskdhalkjsd \n");
            //Console.WriteLine(HttpContext.Session.GetString("User_id"));
            //Console.WriteLine(dto.score);
            //Console.WriteLine(dto.type);
            //Console.WriteLine(dto.time);

            if (User.FindFirst(ClaimTypes.NameIdentifier)?.Value != null)
            {
                User user = (User)_userUtils.GetUserById(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value));
                


                Result result = new Result { user = user, score = dto.score, time = dto.time, type = dto.type };
                _resultUtils.CreateResult(result);
                return Ok(new { result = dto.score });
            }
            else
            {
                return BadRequest(new { error = "Some Error has occurred" });
            }
     
        }
        [HttpGet]
        public IActionResult GetUsersForLeaderboard() {
            IList<User> users = _userUtils.GetAllUsers();
            List<LeaderboardBuf> bufs = new List<LeaderboardBuf>();
            foreach (var item in users)
            {
                bufs.Add(new LeaderboardBuf { username = item.userame, result = item.best_time });
            }


            return Ok(users);
        }



        [HttpGet]
        public JsonResult Get24Words()
        {
            string connectionstring = "words.json";
            StreamReader r = new StreamReader(connectionstring);
            string json_string = r.ReadToEnd();
            r.Close();
            Console.WriteLine(json_string);
            buf a = JsonSerializer.Deserialize<buf>(json_string);
            Console.WriteLine(a.words.Count);
            return Json(new { words = a.words });
        }

        
        public IActionResult GetResults()
        {
            User? user = (User)_userUtils.GetUserById(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value));
            Console.WriteLine(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (user != null)
            {
                IList<Result> results = _resultUtils.GetResults(user);
                return Json(new { slova = results.Where(a => a.type == "words").ToList(), primer = results.Where(a=>a.type == "solvings")});

                
            }
            else
            {
                return Json(new {error = "asdfghjkl" });
            }
        }

    }
}
