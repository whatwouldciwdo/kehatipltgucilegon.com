-- Akun CMS lokal tidak memiliki baris auth.users/profiles.
-- Service-role server menulis artikel, sehingga penulis Supabase bersifat opsional.
alter table public.articles alter column author_id drop not null;