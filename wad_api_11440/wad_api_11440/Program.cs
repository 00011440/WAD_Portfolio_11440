using DAL11440.Context;
using DAL11440.Repository;
using Entities11440.DTOs;
using Microsoft.EntityFrameworkCore;
using Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MainDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IGenericRepository<ToDoTask, TaskDTO>, TaskRepository>();
builder.Services.AddScoped<IGenericRepository<Person, PersonDTO>, PersonRepository>();

builder.Services.AddCors(o =>
    o.AddPolicy("AllowEverything",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }));

builder.Services.AddOptions();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowEverything");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();