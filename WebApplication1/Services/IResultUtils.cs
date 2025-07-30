using WebApplication1.Data;
using WebApplication1.Data.Entites;

namespace WebApplication1.Services
{
    public interface IResultUtils
    {

        IList<Result> GetResults(User user);
        IList<Result> GetAllResults();
        IList<Result> Get100BestResults();
        void CreateResult(Result result);


    }
}
