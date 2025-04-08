using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Real_Estate_Agency.Contracts;
using Real_Estate_Agency.Controllers;
using Real_Estate_Agency.Models;
using Real_Estate_Agency.Networking;
using Real_Estate_Agency.Encodings;
using Xunit;
using Moq;
using Real_Estate_Agency.Repositories;
using System.Xml.Linq;

namespace Real_Estate_Agency.Tests
{
    public class EstateControllerTests
    {
        [Fact]
        public async Task LoginAsValidUser_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.Login(new UserRequest("testUser", "test"));
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task LoginAsInvalidUser_Returns401Unauthorized()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.Login(new UserRequest("invalidUser", "invalidPassword"));
            var unauthorizedResult = result as ObjectResult;
            // assert
            unauthorizedResult?.StatusCode.Should().Be(StatusCodes.Status401Unauthorized);
        }

        [Fact]
        public async Task GetUserData_Returns200OkWithEstatesAndUserInformation()
        {
            // arrange
            var controller = new EstateController();
            // act
            string testCookieKey = CookieGenerator.RandomString(20);
            string? testEncryptedLogin = StringCipher.Encrypt("testUser", testCookieKey);
            string? testEncryptedPassword = StringCipher.Encrypt("test", testCookieKey);
            var result = await controller.GetUserData(new AuthorizationRequest(
                testEncryptedLogin, testEncryptedPassword, testCookieKey));
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task GetFakeUserDataNullCokkie_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            string? testCookieKey = null;
            string? testEncryptedLogin = StringCipher.Encrypt("testUser", testCookieKey);
            string? testEncryptedPassword = StringCipher.Encrypt("test", testCookieKey);
            var result = await controller.GetUserData(new AuthorizationRequest(
                testEncryptedLogin, testEncryptedPassword, testCookieKey));
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
            badResult?.Value.Should().Be("Decrypt key is deprecated or incorrect");
        }

        [Fact]
        public async Task GetFakeUserDataNullCredentials_Returns400BadRequestNullCokkie()
        {
            // arrange
            var controller = new EstateController();
            // act
            string? testCookieKey = CookieGenerator.RandomString(20);
            string testEncryptedLogin = StringCipher.Encrypt("testUser", testCookieKey);
            string? testEncryptedPassword = null;
            var result = await controller.GetUserData(new AuthorizationRequest(
                testEncryptedLogin, testEncryptedPassword, testCookieKey));
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
            badResult?.Value.Should().Be("Login or password is missing");
        }

        [Fact]
        public async Task GetEstatesByUserId_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.GetEstatesByUserId(new GetEstatesByUserRequest(1000));
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task GetEstatesByNonExistentUserId_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.GetEstatesByUserId(new GetEstatesByUserRequest(-1));
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task GetByFilterZeroFilterCriteria_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.GetByFilter(new FilterRequest(null, null, null, null));
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task GetByFilterInvalidCategoryId_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.GetByFilter(new FilterRequest(-1, null, null, null));
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task ToggleFavoriteEstateValidUserAndEstate_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.ToggleFavorite(new ToggleFavRequest(999, 2));
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
            await controller.ToggleFavorite(new ToggleFavRequest(999, 2));
        }

        [Fact]
        public async Task ToggleFavoriteEstateInvalidUser_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var result = await controller.ToggleFavorite(new ToggleFavRequest(-1, 2));
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task AddPhotoToTestEstate_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new PhotoRequest(99999, "https://flatsatpcm.com/assets/images/cache/Copy-of-La-Femme-Living-9d3ac50cf750b58ce6fc066c5c9dc469.jpg");
            var result = await controller.AddPhoto(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task AddPhotoToNonExistentEstate_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new PhotoRequest(-1, "https://flatsatpcm.com/assets/images/cache/Copy-of-La-Femme-Living-9d3ac50cf750b58ce6fc066c5c9dc469.jpg");
            var result = await controller.AddPhoto(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task RemovePhotoFromTestEstate_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new PhotoRequest(99999, "https://flatsatpcm.com/assets/images/cache/Copy-of-La-Femme-Living-9d3ac50cf750b58ce6fc066c5c9dc469.jpg");
            var result = await controller.RemovePhoto(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task RemovePhotoFromNonExistentEstate_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new PhotoRequest(-1, "https://flatsatpcm.com/assets/images/cache/Copy-of-La-Femme-Living-9d3ac50cf750b58ce6fc066c5c9dc469.jpg");
            var result = await controller.RemovePhoto(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task CreateNewEstate_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new AddEstateRequest
                (1000, "Тестовое описание", "Тестовый адрес", 25500.50m, 2, 1, 35);
            var result = await controller.CreateEstate(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task CreateNewEstateWithEmptyDescription_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new AddEstateRequest
                (1000, string.Empty, "Тестовый адрес", 25500.50m, 2, 1, 35);
            var result = await controller.CreateEstate(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task SaveEstateWithNewDescription_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new SaveEstateRequest
                (99999, "Новое тестовое описание", "Тестовый адрес", 25000.00m, 1, 2, 35);
            var result = await controller.SaveEstate(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
            request = new SaveEstateRequest
                (99999, "Тестовое описание", "Тестовый адрес", 25000.00m, 1, 2, 35);
            await controller.SaveEstate(request);
        }

        [Fact]
        public async Task SaveEstateWithNonExistentId_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new SaveEstateRequest
                (-1, "Новое тестовое описание", "Тестовый адрес", 25500.50m, 2, 1, 35);
            var result = await controller.SaveEstate(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task RemoveTestEstate_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new RemoveEstateRequest(100000);
            var result = await controller.RemoveEstate(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task RemoveNonExistentEstate_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new RemoveEstateRequest(-1);
            var result = await controller.RemoveEstate(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task GetPhotosByEstateId_Returns200Ok()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new GetPhotosRequest(99999);
            var result = await controller.GetPhotosByEstate(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
        }

        [Fact]
        public async Task GetPhotosOfNonExistentEstate_Returns400BadRequest()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new GetPhotosRequest(-1);
            var result = await controller.GetPhotosByEstate(request);
            var badResult = result as ObjectResult;
            // assert
            badResult?.StatusCode.Should().Be(StatusCodes.Status400BadRequest);
        }

        [Fact]
        public async Task CreateNewTestUser_Returns200OkWithStatus2()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new CreateUserRequest("testLoginNew", "testUsernameNew", "testPasswordNew");
            var result = await controller.CreateUser(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
            var type = okResult?.Value?.GetType();
            var prop = type?.GetProperty("StatusCode");
            prop?.GetValue(okResult?.Value).Should().Be(2);

            await Repository.RemoveUserByCredentialsAsync("testLoginNew", "testPasswordNew");
        }

        [Fact]
        public async Task TryingToCreateUserWithExistingLogin_Returns200OkWithStatus1()
        {
            // arrange
            var controller = new EstateController();
            // act
            var request = new CreateUserRequest("testUser", "testUser", "test");
            var result = await controller.CreateUser(request);
            var okResult = result as ObjectResult;
            // assert
            okResult?.StatusCode.Should().Be(StatusCodes.Status200OK);
            var type = okResult?.Value?.GetType();
            var prop = type?.GetProperty("StatusCode");
            prop?.GetValue(okResult?.Value).Should().Be(1);
        }
    }
}
