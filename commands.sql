CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0,
    date time
);

insert into blogs (author, url, title, likes, year) values ('Monkey D.Luffy', 'https://luffy.jp', 'The Future Pirate King', 24, 1990);
insert into blogs (author, url, title, likes) values ('Sanji', 'https://sanji.jp', 'Best Cheff Ever!', 15);

insert into users (username, name, created_at, updated_at) values ('mugiwara', 'mugiwara', current_timestamp, current_timestamp );
insert into users (username, name, created_at, updated_at) values ('zoro', 'zoro', current_timestamp, current_timestamp );
insert into users (username, name, created_at, updated_at) values ('sanji', 'sanji', current_timestamp, current_timestamp );

insert into reading_list (user_id, blog_id) values (1, 1); 