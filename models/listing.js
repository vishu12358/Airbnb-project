const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: [
    {
      filename: String,
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farm",
      "Arctic",
      "Domes",
      "Boats",
    ],
  },
  amenities: [String],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Delete reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
