-- 1) SONGS TABLE
create table if not exists public.songs (
  id bigint generated always as identity primary key,
  title text not null,
  artist text not null,
  pdf_url text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 2) RLS
alter table public.songs enable row level security;

drop policy if exists "songs_select_authenticated" on public.songs;
create policy "songs_select_authenticated"
on public.songs for select
to authenticated
using (true);

drop policy if exists "songs_insert_own" on public.songs;
create policy "songs_insert_own"
on public.songs for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "songs_delete_own" on public.songs;
create policy "songs_delete_own"
on public.songs for delete
to authenticated
using (auth.uid() = created_by);

-- 3) STORAGE POLICY (bucket must exist first: song-pdfs)
drop policy if exists "storage_upload_song_pdfs" on storage.objects;
create policy "storage_upload_song_pdfs"
on storage.objects for insert
to authenticated
with check (bucket_id = 'song-pdfs');

drop policy if exists "storage_read_song_pdfs" on storage.objects;
create policy "storage_read_song_pdfs"
on storage.objects for select
to public
using (bucket_id = 'song-pdfs');
