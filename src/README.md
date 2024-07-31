# Books API

## Project Setup and Installation

1. Clone the repository
```sh
git clone https://github.com/dunsinadesina/tobamsgroupbackendproject.git
```
2. Run `npm install` to install dependencies
3. Start the Server
```sh
npm start
```
4. Running Tests
```sh
npm test
```

## API Endpoints

### Create a Book
- **Endpoint:** `POST /books`
- **Request Body:**
*Status code(200)*
```json
{
    "title": "Book Title",
    "author": "Author's Name",
    "publishedDate": "2024-07-30",
    "ISBN": "123456789"
}
```
- **Response:**
```json
{
    "id": "60c72b2f9b1e8c6d88f8b1e8",
    "title": "Purple Hibiscus",
    "author": "Chimamanda Ngozi Adichie",
    "publishedDate": "2024-04-10T00:00:00.000Z",
    "coverImage": "uploads/1624375291000-great-gatsby-cover.jpg"
}
```

### Update a Book Cover Image
- **Endpoint:** `PATCH /books/cover-image/:id`
- **Request Body:**
*Add a field:*
1. Key: coverImage
2. Type: File
3. Value: (Select the image file)

- **Response:**
*Status code(200)*
```json
{
    "id": "60c72b2f9b1e8c6d88f8b1e8",
    "title": "Purple Hibiscus",
    "author": "Chimamanda Ngozi Adichie",
    "publishedDate": "2024-04-10T00:00:00.000Z",
    "coverImage": "uploads/1624375291000-great-gatsby-cover.jpg"
}
```
*Status code(400)*
```json
{
    "error":" Book not found"
}
```

### Update a Book
- **Endpoint:** `PUT /books/:id`
- **Request Body:**
*Status code(200)*
```json
{
    "id": "60c72b2f9b1e8c6d88f8b1e8",
    "title": "Purple Hibiscus",
    "author": "Chimamanda Ngozi Adichie",
    "publishedDate": "2024-04-10T00:00:00.000Z",
    "coverImage": "uploads/1624375291000-great-gatsby-cover.jpg"
}
```
*Status code(400)*
```json
{
    "error":" Book not found"
}
```

### Get All Books
- **Endpoint:** `GET /books`
- **Response:**
*Status code(200)*
```json
[
    {
        "_id": "60c72b2f9b1e8c6d88f8b1e8",
        "title": "Purple Hibiscus",
    "author": "Chimamanda Ngozi Adichie",
        "publishedDate": "1925-04-10T00:00:00.000Z",
        "coverImage": "uploads/1624375291000-great-gatsby-cover.jpg",
        "__v": 0
    },
    {
        "_id": "60c72b3f9b1e8c6d88f8b1e9",
        "title": "The Animal Farm",
        "author": "George Orwell",
        "publishedDate": "1949-06-08T00:00:00.000Z",
        "coverImage": "uploads/1624375301000-1984-cover.jpg",
        "__v": 0
    }
]
```

### Get Single Book
- **Endpoint:** `GET /books/:id`
- **Response:**
*Status code(200)*
```json
{
    "id": "60c72b2f9b1e8c6d88f8b1e8",
    "title": "Purple Hibiscus",
    "author": "Chimamanda Ngozi Adichie",
    "publishedDate": "2024-04-10T00:00:00.000Z",
    "coverImage": "uploads/1624375291000-great-gatsby-cover.jpg"
}
```
*Status code(400)*
```json
{
    "error":" Book not found"
}
```

### Delete a Book
- **Endpoint:** `DELETE /books/:id`
- **Response:**
*Status code(200)*
```json
{
    "message": "Book successfully deleted"
}
```
*Status code(400)*
```json
{
    "error":" Book not found"
}
```