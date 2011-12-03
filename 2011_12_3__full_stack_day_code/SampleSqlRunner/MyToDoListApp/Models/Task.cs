using System;
using System.ComponentModel.DataAnnotations;

namespace MyToDoListApp.Models
{
    public class Task
    {
        public int TaskId { get; set; }

        [Required]
        [StringLength(200)]
        public string Description { get; set; }
    }
}