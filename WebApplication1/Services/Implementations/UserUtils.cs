using System.Linq.Expressions;
using WebApplication1.Data;
using WebApplication1.Data.Entites;

namespace WebApplication1.Services.Implementations
{
    public class UserUtils : IUserUtils
    {
        public AppllContext appllContext { get; set; }

        public UserUtils(AppllContext appllContext)
        {
            this.appllContext = appllContext;
        }

        public IList<User> GetAllUsers()
        {
            return appllContext.Users.ToList();
        }

        public User? GetUserByEmail(string email)
        {
            
            if (appllContext.Users.Any(a => a.email == email))
            {
                return appllContext.Users.First(a => a.email == email);
            }
            else return null;
        }

        public User? GetUserById(int id)
        {
           
            return appllContext.Users.Find(id);
        }

        public User? GetUserByLogin(string login)
        {
            if (appllContext.Users.Any(a => a.userame == login))
            {
                return appllContext.Users.First(a => a.userame == login);
            }
            else return null;

        }


        public IList<User> GetUsersWhere(Expression<Func<User, bool>> expression)
        {
            return appllContext.Users.Where(expression).ToList();
        }

        public User CreateUser(string username, string password, string email)
        {
            User user = new User { userame = username, email = email, password = password };
            appllContext.Users.Add(user);
            appllContext.SaveChanges();
            return appllContext.Users.Where(a => a.userame == user.userame).First();
        }

        public bool AnyUsersByEmail(string email)
        {
            return appllContext.Users.Any(a => a.email == email);
        }
        public bool AnyUserByLogin(string username)
        {
            return appllContext.Users.Any(a => a.userame == username);
        }

        public User? GetUserById(int? id)
        {
            if(id!= null)
            {
               return GetUserById(id??-1);
            }
            else
            {
                return null;
            }
        }
    }
}
