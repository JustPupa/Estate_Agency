using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Real_Estate_Agency.Contracts;
using Real_Estate_Agency.Dto;
using Real_Estate_Agency.Encodings;
using Real_Estate_Agency.Networking;
using Real_Estate_Agency.Repositories;

namespace Real_Estate_Agency.Controllers;

public class SpecsController : ControllerBase
{
    [HttpPost]
    public IActionResult Create([FromBody] CreateSpecRequest request, CancellationToken ct)
    {
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> Login([FromBody]UserRequest request)
    {
        var user = Repository.GetByCredentials(request.login, request.password);
        string cookieKey = CookieGenerator.RandomString(20);
        if (user is not null)
        {
            string encLogin = StringCipher.Encrypt(request.login, cookieKey);
            string encPassword = StringCipher.Encrypt(request.password, cookieKey);
            return Ok(new UserLoginResponse(encLogin, encPassword, cookieKey));
        }
        return Unauthorized("Login or password is invalid. Try again");
    }
    [HttpPost]
    public async Task<IActionResult> Authorize([FromBody] AuthorizationRequest request)
    {
        string cookieKey;
        if (request.cookiekey is not null)
        {
            cookieKey = request.cookiekey;
        }
        else return BadRequest("Authorization from another session attempt");
        string encLogin = StringCipher.Decrypt(request.elogin, cookieKey);
        string encPassword = StringCipher.Decrypt(request.epassword, cookieKey);
        var user = Repository.GetByCredentials(encLogin, encPassword);
        return user?.Role_Id switch
        {
            //Страница обычного авторизованного пользователя
            1 => Ok(new AuthorizationResponse(
                user,
                Repository.GetAllCategories(),
                Repository.GetAllEstates()?.Select(e => EstateFull.EstateToFull(e)).ToList(),
                Repository.GetFavorites(user.Id)?.Select(f => f.EstateId).ToList()
            )),
            //Личный кабинет риэлтора
            2 => Ok(new RealtorResponse(
                user,
                Repository.GetAllCategories()?.Select(c => c.Id).ToList(),
                Repository.GetAllCategories()?.Select(c => c.Name).ToList(),
                Repository.GetEstatesByAuthor(user.Id)?.Select(e => EstateFull.EstateToFull(e)).ToList()
            )),
            //Гостевой режим
            _ => BadRequest("No page is available for those credits")
        };
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> ValidateUser()
    {
        return Ok();
    }

    public async Task<JsonResult> GetNumber()
    {
        return new JsonResult(new Random().Next(1, 20));
    }



    //[HttpGet]
    //public async Task<IActionResult> GetSearch(GetSpecRequest request)
    //{
    //    var result = SpecializationStorage.GetAll().Where(sp =>
    //    request.Search.Contains(sp.Title) ||
    //    request.Search.Contains(sp.Description)).ToList();
    //    return Ok(result);
    //}
}