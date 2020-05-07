# API

## Database

### Setup

Run the following script:

```sh
sh drop-create.sh
```

### Tables

- Users
- Students
- Sections
- Seats

### Relationships

- A user has many students
- A user has many sections
- A student has many sections
- A section has many students
- A seat associates a student with a section

## Responses

### Success

When an operation returns data, the top-level response key should be a logical name for the data. For example, a `GET` request to `/students` should return a JSON blob with a key `"students"`.

Otherwise, endpoints respond with `"success": true`.

### Fail

The response should include an error status, `"success": false`, and a key with the error.
