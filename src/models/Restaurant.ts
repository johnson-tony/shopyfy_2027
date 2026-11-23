import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  slug: string;
  image?: string;
  banner_image?: string;
  cuisine: string;
  rating: number;
  ratings_count: number;
  delivery_time: string;
  cost_for_two: number;
  address: string;
  city: string;
  is_pure_veg: boolean;
  is_featured: boolean;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    image: { type: String },
    banner_image: { type: String },
    cuisine: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    ratings_count: { type: Number, default: 100 },
    delivery_time: { type: String, default: '30-40 mins' },
    cost_for_two: { type: Number, default: 400 },
    address: { type: String, required: true },
    city: { type: String, default: 'Chennai' },
    is_pure_veg: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
export default Restaurant;
