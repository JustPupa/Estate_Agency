using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Real_Estate_Agency.Models
{
    //Пользователь приложения. Поле с мобильным телефоном нужно
    //только риэлтору для связи с потенциальными клиентами
    [Table("users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("role_id")]
        public int Role_Id { get; set; }
        [Column("login")]
        public string Login { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("phone")]
        public string? Phone { get; set; }
    }
}