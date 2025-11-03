using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YummBakes.API.Data;
using YummBakes.API.DTOs;
using YummBakes.API.Models;

namespace YummBakes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenuController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuResponseDto>>> GetAllMenus()
        {
            var menus = await _context.Menus
                .Include(m => m.Category)
                .Select(m => new MenuResponseDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Price = m.Price,
                    ImageUrl = m.ImageUrl,
                    CategoryId = m.CategoryId,
                    CategoryName = m.Category!.Name,
                    IsAvailable = m.IsAvailable,
                    CreatedAt = m.CreatedAt,
                    UpdatedAt = m.UpdatedAt
                })
                .ToListAsync();

            return Ok(menus);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MenuResponseDto>> GetMenuById(int id)
        {
            var menu = await _context.Menus
                .Include(m => m.Category)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (menu == null)
                return NotFound();

            var response = new MenuResponseDto
            {
                Id = menu.Id,
                Name = menu.Name,
                Description = menu.Description,
                Price = menu.Price,
                ImageUrl = menu.ImageUrl,
                CategoryId = menu.CategoryId,
                CategoryName = menu.Category?.Name,
                IsAvailable = menu.IsAvailable,
                CreatedAt = menu.CreatedAt,
                UpdatedAt = menu.UpdatedAt
            };

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<MenuResponseDto>> CreateMenu([FromBody] CreateMenuDto createMenuDto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            var menu = new Menu
            {
                Name = createMenuDto.Name,
                Description = createMenuDto.Description,
                Price = createMenuDto.Price,
                ImageUrl = createMenuDto.ImageUrl,
                CategoryId = createMenuDto.CategoryId,
                CreatedById = userId ?? string.Empty
            };

            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();

            var response = new MenuResponseDto
            {
                Id = menu.Id,
                Name = menu.Name,
                Description = menu.Description,
                Price = menu.Price,
                ImageUrl = menu.ImageUrl,
                CategoryId = menu.CategoryId,
                IsAvailable = menu.IsAvailable,
                CreatedAt = menu.CreatedAt,
                UpdatedAt = menu.UpdatedAt
            };

            return CreatedAtAction(nameof(GetMenuById), new { id = menu.Id }, response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMenu(int id, [FromBody] UpdateMenuDto updateMenuDto)
        {
            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
                return NotFound();

            menu.Name = updateMenuDto.Name;
            menu.Description = updateMenuDto.Description;
            menu.Price = updateMenuDto.Price;
            menu.ImageUrl = updateMenuDto.ImageUrl;
            menu.CategoryId = updateMenuDto.CategoryId;
            menu.IsAvailable = updateMenuDto.IsAvailable;
            menu.UpdatedAt = DateTime.UtcNow;

            _context.Menus.Update(menu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            var menu = await _context.Menus.FindAsync(id);
            if (menu == null)
                return NotFound();

            _context.Menus.Remove(menu);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
