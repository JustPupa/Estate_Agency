namespace Real_Estate_Agency.Models
{
    //Класс для составления отчета об ошибке во время исключительных ситуаций
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
