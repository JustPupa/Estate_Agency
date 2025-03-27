using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Категория недвижимости
    [Table("categories")]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
    }
}
