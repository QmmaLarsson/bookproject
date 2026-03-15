export default interface ReviewInterface {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookThumbnail?: string;
  user: {
    _id: string;
    username: string;
    email?: string;
  } | string;
  reviewText: string;
  rating: number;
  likedBy?: string[];
  createdAt: string;
  updatedAt: string;
}