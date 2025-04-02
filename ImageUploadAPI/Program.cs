using ImageUploadAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configure MongoDB
var mongoSettings = builder.Configuration.GetSection("MongoDB");
string? connectionUri = mongoSettings["ConnectionURI"];
string? databaseName = mongoSettings["DatabaseName"];

if (string.IsNullOrEmpty(connectionUri) || string.IsNullOrEmpty(databaseName))
{
    Console.WriteLine("❌ MongoDB configuration is missing! Check appsettings.json.");
    return;
}

var mongoClient = new MongoClient(connectionUri);
var database = mongoClient.GetDatabase(databaseName);

// 🔹 Register Services
builder.Services.AddSingleton<IMongoDatabase>(database);
builder.Services.AddScoped<FileService>();

// ✅ Add CORS (Frontend → Backend Communication)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// 🔹 Add Controllers, Swagger & Authorization
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

var app = builder.Build();

// 🔹 Enable CORS Middleware (Must be Before Authorization)
app.UseCors("AllowAll");

// 🔹 Enable Swagger UI (Only in Dev)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔹 Apply Middleware
//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// 🔹 Run the App
app.Run();
