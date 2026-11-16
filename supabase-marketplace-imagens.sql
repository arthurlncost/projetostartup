-- Eletricitrus: suporte a fotos nos anúncios do marketplace
-- Execute no SQL Editor do projeto Supabase utilizado pelo Eletricitrus.

-- 1) Guarda as URLs públicas das imagens vinculadas a cada anúncio.
alter table public.anuncios
add column if not exists imagens text[] not null default '{}'::text[];

-- 2) Bucket público para exibir as fotos no marketplace.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'anuncios-imagens',
  'anuncios-imagens',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 3) Qualquer visitante pode visualizar as imagens públicas.
-- Upload, alteração e exclusão só podem ocorrer dentro da pasta do próprio usuário.
drop policy if exists "Marketplace: leitura pública das imagens" on storage.objects;
create policy "Marketplace: leitura pública das imagens"
on storage.objects for select
to public
using (bucket_id = 'anuncios-imagens');

drop policy if exists "Marketplace: vendedor envia suas imagens" on storage.objects;
create policy "Marketplace: vendedor envia suas imagens"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'anuncios-imagens'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Marketplace: vendedor altera suas imagens" on storage.objects;
create policy "Marketplace: vendedor altera suas imagens"
on storage.objects for update
to authenticated
using (
  bucket_id = 'anuncios-imagens'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'anuncios-imagens'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Marketplace: vendedor exclui suas imagens" on storage.objects;
create policy "Marketplace: vendedor exclui suas imagens"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'anuncios-imagens'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
