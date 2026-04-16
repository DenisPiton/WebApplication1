using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Data.Entites;
using WebApplication1.Models.DTO;
using WebApplication1.Services;
using WebApplication1.Auth;
namespace WebApplication1.controllers
{
    
    public class AuthController : Controller
    {
        private readonly IUserUtils utils;
        public AuthController(IUserUtils utils) { this.utils = utils; }

        private string GenerateJwtToken(User user)
        {
            var Auth = new AuthCont();
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.userame),
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
            };
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Auth.GetSecret()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Auth.GetIssuer(),
                audience: Auth.GetAudience(),
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //[HttpGet]
        //public ActionResult Index()
        //{
        //    return View();

        //}
        [HttpPost]
        public IActionResult Index([FromBody] UserDTO DTO)
        {
            Console.WriteLine(DTO.email_or);
            if (ModelState.IsValid)
            {
                User user = utils.GetUserByEmail(DTO.email_or);
                var token = GenerateJwtToken(user);
                Console.WriteLine(token);
                return Ok( new {username = user.userame,jwstoken = token.ToString() });
                //User? user = utils.GetUserByEmail(DTO.email_or);
                //if (user.password == DTO.password)
                //{

                    
                //}
                //else
                //{
                //    return View(DTO);
                //}
                
            }
            else
            {
                
                return BadRequest(new {Error = ModelState.ValidationState});
            }

        }
        //[HttpGet]
        //public IActionResult Reg()
        //{
        //    return View();
        //}
        [HttpPost]
        public IActionResult Reg([FromBody]UserRegistrationDTO dto)
        {
            if (ModelState.IsValid)
            {
                User user = utils.CreateUser(dto.username, dto.password, dto.email);
                var token = GenerateJwtToken(user);
                Console.WriteLine(token);
                return Ok(new { username = user.userame, jwstoken = token.ToString() });




            }
            else
            {
                return BadRequest();
            }
        }
        
        



    }
}
