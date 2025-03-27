using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Возможные роли пользователей
    [Table("roles")]
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
    }
}