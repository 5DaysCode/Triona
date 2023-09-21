using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserManagementConnection")));
    
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builderPolicy =>
        {
            builderPolicy.WithOrigins("http://localhost:4200")
                         .AllowAnyHeader()
                         .AllowAnyMethod()
                         .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Using CORS
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();


app.MapControllers();

app.Run();
