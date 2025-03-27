namespace Real_Estate_Agency.Networking
{
    public class CookieGenerator
    {
        private readonly static Random random = new();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(
                [.. Enumerable
                    .Repeat(chars, length)
                    .Select(s => s[random.Next(s.Length)])]
            );
        }
    }
}
