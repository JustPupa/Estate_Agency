﻿using Real_Estate_Agency.Dto;
using Real_Estate_Agency.Models;

namespace Real_Estate_Agency.Contracts
{
    public record UserRequest(string login, string password);
    public record UserLoginResponse(string crlogin, string crpassword, int role, string cookie);
    public record AuthorizationRequest(string? elogin, string? epassword, string? cookiekey);
    public record AuthorizationResponse(User user, List<Category>? categories, List<EstateFull>? estates, List<int>? favourites);
    public record FilterRequest(int? category, int? minprice, int? maxprice, int? rooms);
    public record ToggleFavRequest(int userid, int estateid);
    public record RealtorResponse(User user, List<EstateFull>? estates);
    public record PhotoRequest(int estateid, string photourl);
    public record SaveEstateRequest(int estateid, string description, string address, decimal price, int rooms, int categoryid, int size);
    public record RemoveEstateRequest(int estateid);
    public record AddEstateRequest(int uid, string description, string address, decimal price, int rooms, int category, int size);
    public record GetEstatesByUserRequest(int userid);
    public record GetPhotosRequest(int estateid);
    public record CreateUserRequest(string login, string username, string password);
}
