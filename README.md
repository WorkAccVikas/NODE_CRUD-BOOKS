# NODE_CRUD-BOOKS

# We have Books Schema

- **title** : String (It is required and unique. We also add validator it must be between 2 words to 5 words)
- **author** : String (It is required)
- **summary** : String (It is required and maximum 20 characters store)

### URL : https://node-crud-books-backend-vikas.onrender.com/api/v1/books

# Add Book :

- **METHOD** : POST
- **BODY** : **All fields are mandatory**.
  - "title": "Title 1"
  - "author": "Author 1"
  - "summary": "Summary 1"

## Edge Cases :

1. If any one of the field is missing or empty then Show <b>status 400 (Bad Request)</b> and custom error message.
2. If you don't follow rule for title and summary then it will show <b>status 400 (Bad Request)</b> and Validation error message.

# GET ALL Books :

- **METHOD** : GET

# GET Single Book Details :

- **METHOD** : GET
- **PATH PARAMS** : Provide \_id

## Edge Cases :

1. If you provide invalid \_id then it will show <b> status 400 (Bad Request)</b> with custom error message.
2. If you provide valid \_id but doesn't exist in collections then it will show <b>status 404 (Not Found)</b> with custom error message.

# Update Book :

- **METHOD** : PUT
- **PATH PARAMS** : Provide \_id **(mandatory)**
- **BODY** : At least one field should present.
  - "title": "Title 1"
  - "author": "Author 1"
  - "summary": "Summary 1"

## Edge Cases :

1. If you provide invalid \_id then it will show <b> status 400 (Bad Request)</b> with custom error message.
2. If you provide valid \_id but doesn't exist in collections then it will show <b>status 404 (Not Found)</b> with custom error message.
3. If you don't follow rule for title and summary then it will show <b>status 400 (Bad Request)</b> and Validation error message.
4. If you provide data that already be present in collection then it will show <b> status 409 (Conflict)</b>

# Delete Book :

- **METHOD** : DELETE
- **PATH PARAMS** : Provide \_id **(mandatory)**

## Edge Cases :

1. If you provide invalid \_id then it will show <b> status 400 (Bad Request)</b> with custom error message.
2. If you provide valid \_id but doesn't exist in collections then it will show <b>status 404 (Not Found)</b> with custom error message.
