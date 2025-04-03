using Real_Estate_Agency.Dto;
using Real_Estate_Agency.Models;
using System.Net;
using System.Xml.Linq;

namespace Real_Estate_Agency.Contracts
{
    public record UserRequest(string login, string password);
    public record UserLoginResponse(string crlogin, string crpassword, int role, string cookie);
    public record AuthorizationRequest(string elogin, string epassword, string cookiekey);
    public record AuthorizationResponse(User user, List<Category>? categories, List<EstateFull>? estates, List<int>? favourites);
    public record FilterRequest(int? category, int? minprice, int? maxprice, int? rooms);
    public record ToggleFavRequest(int userid, int estateid);
    public record RealtorResponse(User user, List<int>? ctgids, List<string>? ctgstr, List<EstateFull>? estates);
    public record RemovePhotoRequest(int estateid, string photourl);
    public record SaveEstateRequest(int estateid, string name, string address, decimal price, int rooms, int categoryid, int size);
    public record RemoveEstateRequest(int estateid);
    public record AddEstateRequest(int uid, string name, string address, decimal price, int rooms, int category, int size);
    public record GetEstatesByUserRequest(int userid);
    public record AddPhotoRequest(int estateid, string url);
    public record GetPhotosRequest(int estateid);
}
