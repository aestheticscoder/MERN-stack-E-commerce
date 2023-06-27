const mongoose = require("mongoose");

const prouctSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        // We'll use cloudnary to host our images cuz we get PublicId and URL of that particular Image
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"]
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock Cannot Exceed 4 Characters"],  // 1 item ke 10,000 stock kaun h rakhta hai
    default: 1
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }

    }
  ]
}, {timestamps: true}
);

module.exports = mongoose.model("Product", prouctSchema);