import { useState } from "react";

type FormData = {
  title: string;
  description: string;
  category: string;
  price: number;
  images: File[];
  location: string;
  condition: string;
  sellerId: string;
};

const categoryGroups = [
  {
    label: "Vehicles & Modes of Transport",
    options: [
      { label: "Cars", value: "cars" },
      { label: "Motorcycles", value: "motorcycles" },
      { label: "Bicycles & Scooters", value: "bicyclesAndScooters" },
    ],
  },
  {
    label: "Electronics & Entertainment",
    options: [
      { label: "Misc Electronics", value: "electronics" },
      { label: "Video Games", value: "videoGames" },
      { label: "Computer, Laptops & Tablets", value: "computers" },
      { label: "Cell Phones", value: "phones" },
    ],
  },
  {
    label: "Home & Living",
    options: [
      { label: "Baby & Kids", value: "babyKids" },
      { label: "Free Stuff", value: "freeStuff" },
      { label: "Home & Garden", value: "homeGarden" },
      { label: "Tools", value: "tools" },
    ],
  },
  {
    label: "Hobbies & Leisure",
    options: [
      { label: "Hobbies", value: "hobbies" },
      { label: "Musical Instruments", value: "musicalInstruments" },
      { label: "Sporting Goods", value: "sportingGoods" },
      { label: "Toys & Games", value: "toysGames" },
    ],
  },
  {
    label: "Fashion & Essentials",
    options: [
      { label: "Apparel", value: "apparel" },
      { label: "Office Supplies", value: "officeSupplies" },
      { label: "Pet Supplies", value: "petSupplies" },
    ],
  },
  {
    label: "Miscellaneous",
    options: [{ label: "General", value: "general" }],
  },
];

const NewItemForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    price: 0,
    images: [],
    location: "",
    condition: "",
    sellerId: "12345", //We have to retrieve sellerId from somewhere - localstorage? useContext? Props?
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files).slice(0, 5),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", String(formData.price));
    data.append("location", formData.location);
    data.append("condition", formData.condition);
    data.append("sellerId", formData.sellerId);

    formData.images.forEach((image, index) => {
      data.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:3000/api/listings", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log("Submitted listing:", result);

      setFormData({
        title: "",
        description: "",
        category: "",
        price: 0,
        images: [],
        location: "",
        condition: "",
        sellerId: "12345",
      });
    } catch (error) {
      console.error("Failed to submit listing:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categoryGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="price"
          inputMode="numeric"
          min="0"
          step="1"
          value={formData.price}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "." || e.key === "," || e.key === "e") {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div>
        <label htmlFor="images">Image Upload:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="condition">Condition:</label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="new">New</option>
          <option value="likeNew">Used - Like New</option>
          <option value="good">Used - Good</option>
          <option value="fair">Used - Fair</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewItemForm;
