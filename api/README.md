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
