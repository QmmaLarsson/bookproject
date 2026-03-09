export default interface BookInterface {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate?: string;
        imageLinks?: {
            thumbnail?: string;
        };
    };
}