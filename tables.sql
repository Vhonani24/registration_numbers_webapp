create table towns(
	id serial not null primary key,
	name text not null,
	start text not null
	
);
create table regNumber(
	id serial not null primary key,
	reg text not null,
	town_id int not null,
	foreign key (town_id) references towns(id)
);
insert into towns(name,start) values('Cape Town','CA');
insert into towns(name,start) values('Bellville','CY');
insert into towns(name,start) values('Paarl','CJ');
