CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0,
    date time
);

insert into notes (author, url, title, likes) values ('Monkey D.Luffy', 'https://luffy.jp', 'The Future Pirate King', 24);
insert into notes (author, url, title, likes) values ('Sanji', 'https://sanji.jp', 'Best Cheff Ever!', 15);