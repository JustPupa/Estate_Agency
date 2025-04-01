using Real_Estate_Agency.Dto;
using Real_Estate_Agency.Models;

namespace Real_Estate_Agency.Contracts
{
    public record UserRequest(string login, string password);
    public record UserLoginResponse(string crlogin, string crpassword, int role, string cookie);
    public record AuthorizationRequest(string elogin, string epassword, string cookiekey);
    public record AuthorizationResponse(User user, List<Category>? categories, List<EstateFull>? estates, List<int>? favourites);
    public record FilterRequest(int? category, int? minprice, int? maxprice, int? rooms);
    public record ToggleFavRequest(int userid, int estateid);
    public record RealtorResponse(User user, List<int>? ctgids, List<string>? ctgstr, List<EstateFull>? estates);
}
