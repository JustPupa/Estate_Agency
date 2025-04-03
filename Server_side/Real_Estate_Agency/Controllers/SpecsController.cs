using Microsoft.AspNetCore.Mvc;
using Real_Estate_Agency.Contracts;
using Real_Estate_Agency.Encodings;
using Real_Estate_Agency.Networking;
using Real_Estate_Agency.Repositories;
using System.Net;

namespace Real_Estate_Agency.Controllers;

public class SpecsController : ControllerBase
{
    //Check if user credentials are valid and return encrypted data is true
    [HttpPost]
    public async Task<IActionResult> Login([FromBody]UserRequest request)
    {
        var user = await Repository.GetByCredentialsAsync(request.login, request.password);
        string cookieKey = CookieGenerator.RandomString(20);
        if (user is not null)
        {
            string encLogin = StringCipher.Encrypt(request.login, cookieKey);
            string encPassword = StringCipher.Encrypt(request.password, cookieKey);
            return Ok(new UserLoginResponse(encLogin, encPassword, user.Role_Id, cookieKey));
        }
        return Unauthorized("Login or password is invalid. Try again");
    }
    
    //Get all page data for user according to his role
    [HttpGet]
    public async Task<IActionResult> GetUserData(AuthorizationRequest request)
    {
        if (request.cookiekey is null)
        {
           return BadRequest("Decrypt key is deprecated or incorrect");
        }
        string cookieKey = request.cookiekey;
        if (request.elogin is null || request.epassword is null)
        {
            return BadRequest("Login or password is missing");
        }
        string login = StringCipher.Decrypt(request.elogin, cookieKey);
        string password = StringCipher.Decrypt(request.epassword, cookieKey);
        var user = await Repository.GetByCredentialsAsync(login, password);
        return user?.Role_Id switch
        {
            //Regular user page
            1 => Ok(new AuthorizationResponse(
                user,
                Repository.GetAllCategories(),
                Repository.GetAllEstates()?.ToFull(),
                Repository.GetFavorites(user.Id)?.Select(f => f.EstateId).ToList()
            )),
            //Личный кабинет риэлтора
            2 => Ok(new RealtorResponse(
                user,
                Repository.GetAllCategories()?.Select(c => c.Id).ToList(),
                Repository.GetAllCategories()?.Select(c => c.Name).ToList(),
                Repository.GetEstatesByAuthor(user.Id)?.ToFull()
            )),
            //Гостевой режим
            _ => BadRequest("No page is available for provided credentials")
        };
    }

    //Get all estates by author
    [HttpGet]
    public async Task<IActionResult> GetEstatesByUserId(GetEstatesByUserRequest request)
    {
        var estates = await Repository.GetEstatesByAuthorAsync(request.userid);
        if (estates is null || estates.Count == 0)
        {
            return BadRequest("Can't find any data by request params");
        }
        return Ok(estates.ToFull());
    }

    //Get all page data for user according to his role
    [HttpGet]
    public async Task<IActionResult> GetByFilter(FilterRequest request)
    {
        var estates = await Repository.GetEstateByFilter(request.category, request.minprice, request.maxprice, request.rooms);
        if (estates is null || estates.Count == 0)
        {
           return BadRequest("Can't find any data by request params");
        }
        return Ok(estates);
    }

    [HttpPost]
    public async Task<IActionResult> ToggleFavorite([FromBody] ToggleFavRequest request)
    {
        var result = await Repository.ToggleFavoriteAsync(request.userid, request.estateid);
        if (result is null)
        {
            return BadRequest("The requested favorite bind is incorrect. Try again");
        }
        else return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> RemovePhoto([FromBody] RemovePhotoRequest request)
    {
        var result = await Repository.DeletePhotoAsync(request.estateid, request.photourl);
        if (result is false)
        {
            return BadRequest("Cannot delete selected photo. Try again");
        }
        else return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> SaveEstate([FromBody] SaveEstateRequest request)
    {
        var result = await Repository.UpdateEstateAsync(request.estateid, request.name, request.address,
            request.price, request.rooms, request.categoryid, request.size);
        if (result is false)
        {
            return BadRequest("Cannot update selected estate. Try again");
        }
        else return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> RemoveEstate([FromBody] RemoveEstateRequest request)
    {
        var result = await Repository.DeleteEstateAsync(request.estateid);
        if (result is false)
        {
            return BadRequest("Cannot remove selected estate. Try again");
        }
        else return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEstate([FromBody] AddEstateRequest request)
    {
        if (request.price == 0 || request.name == string.Empty || request.address == string.Empty ||
            request.size == 0)
        {
            return StatusCode(400, "One or more fields are empty");
        }
        var result = await Repository.AddEstateAsync(request.price, request.rooms, request.category,
            request.name, request.address, request.size, request.uid);
        if (result is false)
        {
            return StatusCode(500, "Server error. Try again");
        }
        else return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddPhoto([FromBody] AddPhotoRequest request)
    {
        var result = await Repository.AddPhotoAsync(request.estateid, request.url);
        if (result is false)
        {
            return BadRequest("Unable to add photo - check if there is the same photo or try again");
        }
        else return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetPhotosByEstate(GetPhotosRequest request)
    {
        var result = await Repository.GetPhotosByEstateAsync(request.estateid);
        if (result is not null && result.Any())
        {
            return Ok(result);
        }
        return BadRequest("No photos found. Check database connection");
    }
}