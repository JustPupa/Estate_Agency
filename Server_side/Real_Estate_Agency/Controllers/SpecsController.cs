using Microsoft.AspNetCore.Mvc;
using Real_Estate_Agency.Contracts;
using Real_Estate_Agency.Encodings;
using Real_Estate_Agency.Networking;
using Real_Estate_Agency.Repositories;

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
}