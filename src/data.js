import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      _id: 1,
      name: "Sai Ranadheer Gupta Nunna",
      email: "sairanadheer@example.com",
      password: bcrypt.hashSync("abcd", 8),
      isAdmin: true
    },
    {
      _id: 2,
      name: "Decathlon User01",
      email: "decathlon_user@example.com",
      password: bcrypt.hashSync("abcd", 8),
      isAdmin: false
    }
  ],
  products: [
    {
      _id: "1",
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      stockCount: 10,
      brand: "Nike",
      rating: 4.5,
      reviewsCount: 10,
      description: "High Quality Product"
    },
    {
      _id: "2",
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 100,
      stockCount: 20,
      brand: "Adidas",
      rating: 4.0,
      reviewsCount: 10,
      description: "High Quality Product"
    },
    {
      _id: "3",
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image: "/images/p3.jpg",
      price: 220,
      stockCount: 0,
      brand: "Lacoste",
      rating: 4.8,
      reviewsCount: 17,
      description: "High Quality Product"
    },
    {
      _id: "4",
      name: "Nike Slim Pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 78,
      stockCount: 15,
      brand: "Nike",
      rating: 4.5,
      reviewsCount: 14,
      description: "High Quality Product"
    },
    {
      _id: "5",
      name: "Puma Slim Pant",
      category: "Pants",
      image: "/images/p5.jpg",
      price: 65,
      stockCount: 5,
      brand: "Puma",
      rating: 4.5,
      reviewsCount: 10,
      description: "High Quality Product"
    },
    {
      _id: "6",
      name: "Adidas Fit Pant",
      category: "Pants",
      image: "/images/p6.jpg",
      price: 139,
      stockCount: 12,
      brand: "Adidas",
      rating: 4.5,
      reviewsCount: 15,
      description: "High Quality Product"
    }
  ]
};
export default data;
