namespace YummBakes.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser? User { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveryDate { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? SpecialRequests { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
