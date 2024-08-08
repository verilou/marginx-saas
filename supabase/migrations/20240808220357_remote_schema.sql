drop policy "Can only view own subs data." on "public"."subscriptions";

drop policy "Can update own user data." on "public"."users";

drop policy "Can view own user data." on "public"."users";

alter type "public"."subscription_status" rename to "subscription_status__old_version_to_be_dropped";

create type "public"."subscription_status" as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');

alter table "public"."subscriptions" alter column status type "public"."subscription_status" using status::text::"public"."subscription_status";

drop type "public"."subscription_status__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  begin
    insert into public.users (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
  end;
$function$
;

create policy "Can only view own subs data."
on "public"."subscriptions"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Can update own user data."
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Can view own user data."
on "public"."users"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = id));



