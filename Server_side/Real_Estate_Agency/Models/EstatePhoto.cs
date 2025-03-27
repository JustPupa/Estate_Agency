using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Запись таблицы со связью "Один-ко-многим" с URL-адресами фотографий недвижимости
    [Table("estate_photo")]
    public class EstatePhoto
    {
        [Column("estate_id", Order = 1)]
        public int EstateId { get; set; }
        [Column("photo_url", Order = 2)]
        public string PhotoUrl { get; set; }
    }
}