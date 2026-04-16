using WebApplication1.Data;
using WebApplication1.Data.Entites;

namespace WebApplication1.Services
{
    public interface IUserUtils
    {
        public AppllContext appllContext { get; set; }
        IList<User> GetAllUsers();
        IList<User> GetUsersWhere(System.Linq.Expressions.Expression<Func<User, bool>> expression);

        User? GetUserById(int id);
        User? GetUserById(int? id);
        User? GetUserByEmail(string email);
        User? GetUserByLogin(string login);

        User CreateUser(string username, string password, string email);

        bool AnyUsersByEmail(string email);
        bool AnyUserByLogin(string login);
    }
}
