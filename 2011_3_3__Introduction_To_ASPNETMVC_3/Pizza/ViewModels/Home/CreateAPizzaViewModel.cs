using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Pizza.ViewModels.Home
{
    public class CreateAPizzaViewModel
    {
        [Required]
        [StringLength(5)]
        public string Name { get; set; }

        [DisplayName("Number of Toppings")]
        [Required]
        [Range(1, 10)]
        public int? NumberOfToppings { get; set; }
    }
}