namespace WebApplication1.Auth
{
    public class AuthCont
    {
        const string ISSUER = "WebApplication1";
        const string AUDIENCE = "ReactFront";
        const string SECRETKEY = "papapopulapalpapapopulapal123_secretololo!";


        public string GetIssuer()
        {
            return ISSUER;
        }
        public string GetAudience() { return AUDIENCE; }
        public string GetSecret() { return SECRETKEY; }
    }
}
