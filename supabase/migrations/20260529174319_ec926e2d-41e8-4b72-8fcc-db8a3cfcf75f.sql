
-- Roles
create type public.app_role as enum ('host', 'member');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create policy "Host can view all roles"
  on public.user_roles for select to authenticated
  using (public.has_role(auth.uid(), 'host'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Profiles are viewable by authenticated users"
  on public.profiles for select to authenticated using (true);

create policy "Users update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create profile + assign role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));

  if lower(new.email) = 'alanizjaden4@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'host')
    on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'member')
    on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('general','crypto','stocks-options','futures','commodities')),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text,
  attachment_url text,
  attachment_type text,
  attachment_name text,
  created_at timestamptz not null default now()
);

create index messages_channel_created_at_idx on public.messages (channel, created_at desc);

grant select, insert, delete on public.messages to authenticated;
grant all on public.messages to service_role;

alter table public.messages enable row level security;
alter table public.messages replica identity full;

create policy "Authenticated can read messages"
  on public.messages for select to authenticated using (true);

create policy "Users can post messages as themselves"
  on public.messages for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own messages"
  on public.messages for delete to authenticated
  using (auth.uid() = user_id);

create policy "Host can delete any message"
  on public.messages for delete to authenticated
  using (public.has_role(auth.uid(), 'host'));

alter publication supabase_realtime add table public.messages;

-- Storage bucket for chat attachments
insert into storage.buckets (id, name, public)
values ('chat-attachments', 'chat-attachments', true)
on conflict (id) do nothing;

create policy "Anyone can view chat attachments"
  on storage.objects for select to public
  using (bucket_id = 'chat-attachments');

create policy "Authenticated can upload chat attachments"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'chat-attachments' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own chat attachments"
  on storage.objects for delete to authenticated
  using (bucket_id = 'chat-attachments' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Host can delete any chat attachment"
  on storage.objects for delete to authenticated
  using (bucket_id = 'chat-attachments' and public.has_role(auth.uid(), 'host'));
