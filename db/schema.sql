create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null,
  created_at timestamp with time zone default current_timestamp
);

create table sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  token text not null,
  created_at timestamp with time zone default current_timestamp
);
