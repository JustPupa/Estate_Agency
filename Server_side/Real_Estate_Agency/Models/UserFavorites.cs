using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Таблица со связью вида "Многие-ко-многим" с информацией
    //по избранным объявлениям для каждого пользователя
    [Table("user_favorites")]
    public class UserFavorites
    {
        [Column("user_id", Order = 1)]
        public int UserId { get; set; }
        [Column("estate_id", Order = 2)]
        public int EstateId { get; set; }
    }
}