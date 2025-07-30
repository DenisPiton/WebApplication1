using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Data.Entites
{

    public class Result
    {
        
        public int id{ get; set; }
        
        public int time { get; set; }
        public string type { get; set; }
        public string score { get; set; }
        public required int User_id { get; set; }
        [ForeignKey("User_id")]
        [Required]
        public User user { get; set; }
    }
}
