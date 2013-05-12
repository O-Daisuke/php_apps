create databases apps;
grant all on apps.* to dbuser@localhost identified by 'p@ssw0rd';

create table users (
  id int not null auto_increment primary key,
  name varchar(255),
  email varchar(255),
  password char(32),
  created datetime,
  modified datetime
);

insert into users(name,email,password,created,modified) values
('Daisuke','do5843@gmail.com','p@ssw0rd',now(),now());

create table tasks (
    id int not null auto_increment primary key,
    seq int not null,
    type enum('notyet', 'done', 'deleted') default 'notyet',
    title text,
    created datetime,
    modified datetime,
    KEY type(type),
    KEY seq(seq)
);

insert into tasks (seq, type, title, created, modified) values 
(1, 'notyet', '牛乳買う', now(), now()),
(2, 'notyet', '提案書作る', now(), now()),
(3, 'done', '映画見る', now(), now());

create table rsstitle (
  id int not null auto_increment primary key,
  name varchar(255) not null,
  url varchar(255) not null,
  readnum int not null,
  created datetime,
  modified datetime
);

insert into rsstitle
(name,url,readnum,created,modified)
values
("lifehacker","http://feeds.lifehacker.jp/rss/lifehacker/index.xml",10,now(),now())

create table rssdate(
  id int not null auto_increment primary key,
  name varchar(255) not null,
  rssurl varchar(255) not null,
  title varchar(255) not null,
  created datetime,
  modified datetime
);


