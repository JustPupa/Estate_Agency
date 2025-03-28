using Real_Estate_Agency.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddTransient<EstateContext>();
builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy => 
    {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
var app = builder.Build();
app.MapDefaultControllerRoute();
app.UseCors();
app.Run();