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
- Classes
- Seats

### Relationships

- A user has many students
- A user has many classes
- A student has many classes
- A class has many students
- A seat associates a student with a class

## Responses

### Success

When an operation returns data, the top-level response key should be a logical name for the data. For example, a `GET` request to `/students` should return a JSON blob with a key `"students"`.

Otherwise, endpoints responde with `"success": true`.

### Fail

The response should include the error message.
