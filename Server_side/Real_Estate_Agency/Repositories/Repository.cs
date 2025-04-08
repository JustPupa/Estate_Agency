using Microsoft.EntityFrameworkCore;
using Real_Estate_Agency.Dto;
using Real_Estate_Agency.Models;

namespace Real_Estate_Agency.Repositories
{
    public class Repository
    {
        //Выбрать всех пользователей
        public static List<User>? GetAllUsers()
        {
            using var context = new EstateContext();
            return [.. context.Users];
        }
        //Найти пользователя по идентификатору
        public static User? GetUserById(int id)
        {
            using var context = new EstateContext();
            return context?.Users.First(u => u.Id == id);
        }
        //Найти пользователя по логину и паролю
        public async static Task<User?>? GetByCredentialsAsync(string login, string password)
        {
            using var context = new EstateContext();
            return await context.Users.FirstOrDefaultAsync(u => u.Login == login && u.Password == password);
        }
        public static bool IsLoginInDatabase(string login)
        {
            using var context = new EstateContext();
            return context.Users.Any(u => u.Login.ToLower() == login.ToLower());
        }
        public static async Task<bool> CreateUserAsync(string login, string name, string password)
        {
            try
            {
                if (GetByCredentialsAsync(login, password)?.Result != null)
                {
                    return false;
                }
                //Идентификатор для пользователя будет высчитываться как максимальный + 1
                using var context = new EstateContext();
                int id = (int)context.Users.Max(u => u.Id)! + 1;
                User user = new()
                {
                    Id = id,
                    Name = name,
                    Role_Id = 1,
                    Login = login,
                    Password = password,
                    Phone = null
                };
                context.Users.Add(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //Выбрать все предложения о продаже
        public static List<RealEstate>? GetAllEstates()
        {
            using var context = new EstateContext();
            return [.. context.Estates];
        }
        //Выбрать недвижимость по фильтру
        public static async Task<List<EstateFull>?> GetEstateByFilterAsync(int? categoryId, decimal? priceMin, decimal? priceMax, int? roomNum)
        {
            List<RealEstate> result;
            using (var context = new EstateContext())
            {
                result = await context.Estates.ToListAsync();
            }
            if (categoryId != null && categoryId != 0)
            {
                result = [.. result.Where(e => e.CategoryId == categoryId)];
            }
            if (priceMin != null && priceMin != 0)
            {
                result = [.. result.Where(e => e.Price >= priceMin)];
            }
            if (priceMax != null && priceMax != 0)
            {
                result = [.. result.Where(e => e.Price <= priceMax)];
            }
            if (roomNum != null && roomNum != 0)
            {
                switch (roomNum)
                {
                    case 1:
                    case 2:
                        result = [.. result.Where(e => e.RoomCount == roomNum)];
                        break;
                    case 3:
                        result = [.. result.Where(e => e.RoomCount >= 3)];
                        break;
                }
            }
            return result.ToFull();
        }

        //Выбрать предложения о продаже по автору
        public static List<RealEstate>? GetEstatesByAuthor(int authid)
        {
            using var context = new EstateContext();
            return [.. context.Estates.Where(e => e.AuthorId == authid)];
        }

        //Выбрать предложения о продаже по автору
        public static async Task<List<RealEstate>> GetEstatesByAuthorAsync(int authid)
        {
            using var context = new EstateContext();
            return await context.Estates.Where(e => e.AuthorId == authid).ToListAsync();
        }
        //Добавить новое объявление
        public static async Task<bool> AddEstateAsync(decimal price, int rooms, int category, string name, string address, int size, int author)
        {
            try
            {
                using var context = new EstateContext();
                int? maxId = context.Estates.Max(e => e.Id);
                RealEstate realEstate = new()
                {
                    Id = maxId == null ? 1 : (int)maxId + 1,
                    AuthorId = author,
                    Price = price,
                    RoomCount = rooms,
                    CategoryId = category,
                    Description = name,
                    Address = address,
                    Size = size
                };
                context.Estates.Add(realEstate);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Добавить фото к объявлению
        public static async Task<bool> AddPhotoAsync(int estateid, string photourl)
        {
            try
            {
                using var context = new EstateContext();
                if (context.Estates.Any(e => e.Id == estateid) == true)
                {
                    context.EstatePhotos.Add(new()
                    {
                        EstateId = estateid,
                        PhotoUrl = photourl
                    });
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //Удалить фото по id карточки и URL
        public static async Task<bool> DeletePhotoAsync(int cardid, string photourl)
        {
            try
            {
                using var context = new EstateContext();
                if (context.EstatePhotos.Any(p => p.EstateId == cardid && p.PhotoUrl == photourl) == true)
                {
                    var photo = context.EstatePhotos.First(p => p.EstateId == cardid && p.PhotoUrl == photourl)!;
                    context.EstatePhotos.Remove(photo);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Удалить объявление и всю связанную информацию
        public static async Task<bool> DeleteEstateAsync(int estateid)
        {
            try
            {
                using var context = new EstateContext();
                if (context.Estates.Any(e => e.Id == estateid) == true)
                {
                    var estatePhotos = context.EstatePhotos.Where(ep => ep.EstateId == estateid).ToList();
                    if (estatePhotos != null && estatePhotos.Count != 0)
                    {
                        context.EstatePhotos.RemoveRange(estatePhotos);
                        context.SaveChanges();
                    }
                    var userFavorites = context.UserFavorites.Where(uf => uf.EstateId == estateid).ToList();
                    if (userFavorites != null && userFavorites.Count != 0)
                    {
                        context.UserFavorites.RemoveRange(userFavorites);
                        context.SaveChanges();
                    }
                    var estate = context.Estates.Where(e => e.Id == estateid).ToList()!;
                    context.Estates.RemoveRange(estate);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Обновить поля объявления о продаже
        public static async Task<bool> UpdateEstateAsync(int estateid, string name, string address, 
            decimal price, int rooms, int category, int size)
        {
            try
            {
                using var context = new EstateContext();
                if (context.Estates.Any(e => e.Id == estateid) == true)
                {
                    var estate = context.Estates.First(e => e.Id == estateid)!;
                    estate.Price = price;
                    estate.RoomCount = rooms;
                    estate.CategoryId = category;
                    estate.Description = name;
                    estate.Address = address;
                    estate.Size = size;
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Выбрать все категории недвижимости
        public static List<Category>? GetAllCategories()
        {
            using var context = new EstateContext();
            return [.. context.Categories];
        }
        //Найти категорию по идентификатору
        public static Category? GetCategoryById(int id)
        {
            using var context = new EstateContext();
            return context.Categories.First(c => c.Id == id);
        }
        //Найти фотографии для определенной недвижимости
        public static List<EstatePhoto>? GetPhotosByEstateId(int id)
        {
            using var context = new EstateContext();
            return [.. context.EstatePhotos.Where(e => e.EstateId == id)];
        }
        //Асинхронный вариант метода выше
        public static async Task<List<EstatePhoto>> GetPhotosByEstateAsync(int id)
        {
            using var context = new EstateContext();
            return await context.EstatePhotos.Where(e => e.EstateId == id).ToListAsync();
        }
        //Получить все избранные недвижимости по пользовательскому id
        public static List<UserFavorites>? GetFavorites(int userId)
        {
            using var context = new EstateContext();
            return [.. context.UserFavorites.Where(uf => uf.UserId == userId)];
        }

        //Переключить недвижимость в избранные и обратно
        public static async Task<bool?> ToggleFavoriteAsync(int userId, int estateid)
        {
            try
            {
                using var context = new EstateContext();
                var isInDatabase = context.UserFavorites.Any(uf => uf.UserId == userId && uf.EstateId == estateid);
                if (isInDatabase == true)
                {
                    var fav = context.UserFavorites.Single(uf => uf.UserId == userId && uf.EstateId == estateid)!;
                    context.UserFavorites.Remove(fav);
                }
                else
                {
                    var fav = new UserFavorites() { UserId = userId, EstateId = estateid };
                    context.UserFavorites.Add(fav);
                }
                await context.SaveChangesAsync();
                return isInDatabase;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }

    public class EstateContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<RealEstate> Estates { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<EstatePhoto> EstatePhotos { get; set; }
        public DbSet<UserFavorites> UserFavorites { get; set; }

        public EstateContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                "Server=localhost;Database=real_estate;Uid=root;Pwd=root;",
                new MySqlServerVersion(new Version(8, 0, 41))
            );
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<EstatePhoto>().HasKey(ep => new { ep.EstateId, ep.PhotoUrl });
            builder.Entity<UserFavorites>().HasKey(uf => new { uf.UserId, uf.EstateId });
        }
    }

    public static class EstateExtension
    {
        public static List<EstateFull>? ToFull(this List<RealEstate> estates)
        {
            return [.. estates.Select(e => EstateFull.EstateToFull(e))];
        }
    }
}