using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Запись объявления о продаже недвижимости
    [Table("real_estates")]
    public class RealEstate
    {
        [Key]
        public int Id { get; set; }
        [Column("room_count")]
        public int RoomCount { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("author_id")]
        public int AuthorId { get; set; }
        [Column("category_id")]
        public int CategoryId { get; set; }  
        [Column("description")]
        public string? Description { get; set; }
        [Column("address")]
        public string Address { get; set; }
        [Column("size")]
        public int Size { get; set; }
    }
}
