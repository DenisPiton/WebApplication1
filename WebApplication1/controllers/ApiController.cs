using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebApplication1.Data.Entites;
using WebApplication1.Filters;
using WebApplication1.Models.DTO;
using WebApplication1.Services;
using System.IO;

using System.Runtime.InteropServices.Marshalling;



namespace WebApplication1.controllers
{
    public class buf
    {
        public List<string> words { get; set; }
    }
    public class results_buffer
    {
        public List<Result> slova { get; set; }
        public List<Result> primer { get; set; }
    }
    public class ApiController : Controller
    {
        private readonly IResultUtils _resultUtils;
        public ApiController(IResultUtils resultUtils) { this._resultUtils = resultUtils; }
        public IActionResult results()
        {
            return View();
        }


        [AuthFilter]
        [HttpPost]
        public JsonResult CreateResult([FromBody]ResultDTO dto)
        {
            //Console.WriteLine("asljdg;askgd;kgals \n asdiahjskldhiaskldi \n asdkgasjdhfgalsjd\n asdhaskdhalkjsd \n");
            //Console.WriteLine(HttpContext.Session.GetString("User_id"));
            //Console.WriteLine(dto.score);
            //Console.WriteLine(dto.type);
            //Console.WriteLine(dto.time);
            if ((User?)HttpContext.Items["CurrentUser"] != null)
            {
                Result result = new Result { user = (User)HttpContext.Items["CurrentUser"], score = dto.score, time = dto.time, type = dto.type };
                _resultUtils.CreateResult(result);
                return Json(new { result = dto.score });
            }
            else
            {
                return Json(new { error = "Some Error has occurred" });
            }
     
        }

        [AuthFilter]
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


        [AuthFilter]
        public JsonResult GetResults()
        {
            User? user = (User?)HttpContext.Items["CurrentUser"];
            if(user != null)
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
