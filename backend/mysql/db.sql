drop database if exists todolist;

create database todolist;

use todolist;

create table todos (
    id int primary key auto_increment,
    title varchar(255) not null,
    completed tinyint default 0,
    priority enum("low", "medium", "high") default "medium",
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp
);

insert into todos (title) values ("Tarea 1");

select * from todos;