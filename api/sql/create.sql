CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name TEXT,
    nonce TEXT,
    password TEXT
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE seats (
    class_id INTEGER REFERENCES classes(id),
    student_id INTEGER REFERENCES students(id)
);
