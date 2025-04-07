using Real_Estate_Agency.Models;
using Real_Estate_Agency.Repositories;

namespace Real_Estate_Agency.Dto
{
    //Полное представление объявления о продаже недвижимости
    //Включая и зависимые сущности
    public class EstateFull
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int RoomCount { get; set; }
        public Category? Category { get; set; }
        public User? Author { get; set; }
        public string? Address { get; set; }
        public int Size { get; set; }
        public List<EstatePhoto>? Photos { get; set; }

        //Метод для конвертации обычного объявления
        //в полное с дополнительными полями
        public static EstateFull EstateToFull(RealEstate estate)
        {
            return new EstateFull()
            {
                Id = estate.Id,
                Description = estate.Description,
                Price = estate.Price,
                RoomCount = estate.RoomCount,
                Category = Repository.GetCategoryById(estate.CategoryId),
                Author = Repository.GetUserById(estate.AuthorId),
                Address = estate.Address,
                Size = estate.Size,
                Photos = Repository.GetPhotosByEstateId(estate.Id)
            };
        }
    }
}
