using System.Reflection.Metadata;
using WebApplication1.Data;
using WebApplication1.Data.Entites;
using WebApplication1.Services;


namespace WebApplication1.Services.Implementations
{
    public class Comparer : IComparer<Result>
    {
        public int Compare(Result? x, Result? y)
        {
            return x.time.CompareTo(y.time);
        }
    }
    public class ResultUtils : IResultUtils
    {
        private readonly AppllContext _dbContext;
        public ResultUtils(AppllContext appllContext) { _dbContext = appllContext; }
        public void CreateResult(Result result)
        {
            _dbContext.Results.Add(result);
            _dbContext.SaveChanges();

        }

        public IList<Result> Get100BestResults()
        {
            List<Result> ress = _dbContext.Results.Where(a => (a.score >= 12 && a.type == "Words") || (a.type == "Solvings" && a.score >= 10)).ToList();
            ress.Sort(new Comparer());
            return ress;
        }

        public IList<Result> GetAllResults()
        {
            return _dbContext.Results.ToList();
        }

        public IList<Result> GetResults(User user)
        {
            return _dbContext.Results.Where(a=>a.user == user).ToList();
        }
    }


}