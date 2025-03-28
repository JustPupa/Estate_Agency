using Microsoft.EntityFrameworkCore;
using Real_Estate_Agency.Models;

namespace Real_Estate_Agency.Repositories
{
    public class Repository
    {
        private static readonly EstateContext? context;
        static Repository()
        {
            context = new EstateContext();
        }
        //Выбрать всех пользователей
        public static List<User>? GetAllUsers()
        {
            return context?.Users.ToList();
        }
        //Найти пользователя по идентификатору
        public static User? GetUserById(int id)
        {
            return context?.Users.First(u => u.Id == id);
        }
        //Найти пользователя по логину и паролю
        public async static Task<User?> GetByCredentialsAsync(string login, string password)
        {
            return await context?.Users?.FirstOrDefaultAsync(u => u.Login == login && u.Password == password); ;
        }
        //Создать нового пользователя-клиента
        public static bool CreateClient(string login, string name, string password)
        {
            try
            {
                if (GetByCredentialsAsync(login, password) != null)
                {
                    return false;
                }
                //Идентификатор для пользователя будет высчитываться как максимальный + 1
                int id = (int)context?.Users.Max(u => u.Id)! + 1;
                User user = new()
                {
                    Id = id,
                    Name = name,
                    Role_Id = 1,
                    Login = login,
                    Password = password,
                    Phone = null
                };
                context?.Users.Add(user);
                context?.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        //Выбрать все предложения о продаже
        public static List<RealEstate>? GetAllEstates()
        {
            return context?.Estates.ToList();
        }
        //Выбрать недвижимость по фильтру
        public static List<RealEstate>? GetEstateByFilter(int? categoryId, decimal? priceMin, decimal? priceMax, int? roomNum)
        {
            var result = context?.Estates.AsQueryable();
            if (categoryId != null && categoryId != 0)
            {
                result = result?.Where(e => e.CategoryId == categoryId);
            }
            if (priceMin != null)
            {
                result = result?.Where(e => e.Price >= priceMin);
            }
            if (priceMax != null)
            {
                result = result?.Where(e => e.Price <= priceMax);
            }
            if (roomNum != null)
            {
                switch (roomNum)
                {
                    case 1: result = result?.Where(e => e.RoomCount == 1); break;
                    case 2: result = result?.Where(e => e.RoomCount == 2); break;
                    case 3: result = result?.Where(e => e.RoomCount >= 3); break;
                }
            }
            return result?.ToList();
        }
        //Выбрать предложения о продаже по автору
        public static List<RealEstate>? GetEstatesByAuthor(int authid)
        {
            return context?.Estates.Where(e => e.AuthorId == authid).ToList();
        }
        //Добавить новое объявление
        public static int AddEstate(decimal price, int rooms, int category, string name, string address, int size, int author)
        {
            int? maxId = context?.Estates.Max(e => e.Id);
            RealEstate realEstate = new()
            {
                Id = maxId == null ? 1 : (int)maxId + 1,
                AuthorId = author,
                Price = price,
                RoomCount = rooms,
                CategoryId = category,
                Name = name,
                Address = address,
                Size = size
            };
            try
            {
                context?.Estates.Add(realEstate);
                context?.SaveChanges();
                return realEstate.Id;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        //Добавить фото к объявлению
        public static bool AddPhoto(int estateid, string photourl)
        {
            try
            {
                if (context?.Estates.Any(e => e.Id == estateid) == true)
                {
                    context?.EstatePhotos.Add(new()
                    {
                        EstateId = estateid,
                        PhotoUrl = photourl
                    });
                    context?.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Удалить фото по id карточки и URL
        public static bool DeletePhoto(int cardid, string photourl)
        {
            try
            {
                if (context?.EstatePhotos.Any(p => p.EstateId == cardid && p.PhotoUrl == photourl) == true)
                {
                    var photo = context?.EstatePhotos
                        .First(p => p.EstateId == cardid && p.PhotoUrl == photourl)!;
                    context?.EstatePhotos.Remove(photo);
                    context?.SaveChanges();
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
        public static bool DeleteEstate(int estateid)
        {
            try
            {
                if (context?.Estates.Any(e => e.Id == estateid) == true)
                {
                    var estatePhotos = context?.EstatePhotos.Where(ep => ep.EstateId == estateid).ToList();
                    if (estatePhotos != null && estatePhotos.Any())
                    {
                        context?.EstatePhotos.RemoveRange(estatePhotos);
                        context?.SaveChanges();
                    }
                    var userFavorites = context?.UserFavorites.Where(uf => uf.EstateId == estateid).ToList();
                    if (userFavorites != null && userFavorites.Any())
                    {
                        context?.UserFavorites.RemoveRange(userFavorites);
                        context?.SaveChanges();
                    }
                    var estate = context?.Estates.Where(e => e.Id == estateid).ToList()!;
                    context?.Estates.RemoveRange(estate);
                    context?.SaveChanges();
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
        public static bool UpdateEstate(int estateid, string name, decimal price,
        int rooms, int category, string address, int size)
        {
            try
            {
                if (context?.Estates.Any(e => e.Id == estateid) == true)
                {
                    var estate = context?.Estates.First(e => e.Id == estateid)!;
                    estate.Price = price;
                    estate.RoomCount = rooms;
                    estate.CategoryId = category;
                    estate.Name = name;
                    estate.Address = address;
                    estate.Size = size;
                    context?.SaveChanges();
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
            return context?.Categories.ToList();
        }
        //Найти категорию по идентификатору
        public static Category? GetCategoryById(int id)
        {
            return context?.Categories.First(c => c.Id == id);
        }
        //Найти фотографии для определенной недвижимости
        public static List<EstatePhoto>? GetPhotosByEstateId(int id)
        {
            return context?.EstatePhotos?.Where(e => e.EstateId == id).ToList();
        }
        //Получить все избранные недвижимости по пользовательскому id
        public static List<UserFavorites>? GetFavorites(int userId)
        {
            return context?.UserFavorites?.Where(uf => uf.UserId == userId).ToList();
        }
        //Проверить наличие записи среди избранного
        public static bool? CheckFavorites(int userId, int estateid)
        {
            return context?.UserFavorites?.Any(uf => uf.UserId == userId && uf.EstateId == estateid);
        }
        //Удалить из избранного
        public static void RemoveFavorite(int userId, int estateid)
        {
            if (CheckFavorites(userId, estateid) == true)
            {
                var fav = context?.UserFavorites?.Single(uf => uf.UserId == userId && uf.EstateId == estateid)!;
                context?.UserFavorites?.Remove(fav);
                context?.SaveChanges();
            }
        }
        //Добавить из избранного
        public static void AddFavorite(int userId, int estateid)
        {
            if (CheckFavorites(userId, estateid) != true)
            {
                var fav = new UserFavorites() { UserId = userId, EstateId = estateid };
                context?.UserFavorites?.Add(fav);
                context?.SaveChanges();
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
}