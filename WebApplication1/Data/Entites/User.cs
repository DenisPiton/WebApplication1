using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace WebApplication1.Data.Entites
{
    public class User
    {
        public int id { get; set; }

        
        public required string userame { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }

        public int words_test_passed { get; set; } = 0;

        public int best_time { get; set; } = -1;

        public int test_passed { get; set; } = 0;


    }
}
