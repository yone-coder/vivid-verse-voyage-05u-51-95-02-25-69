-- Fix RLS issues on existing tables
ALTER TABLE public.game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Add basic RLS policy for transactions
CREATE POLICY "Service role can manage transactions" 
ON public.transactions 
FOR ALL 
USING (auth.role() = 'service_role');

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.clean_expired_verification_codes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    DELETE FROM verification_codes
    WHERE expires_at < NOW();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_product_views(product_id uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    UPDATE products 
    SET views = views + 1,
        last_activity = NOW()
    WHERE id = product_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_product_saves(product_id uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    UPDATE products 
    SET saves = saves + 1,
        last_activity = NOW()
    WHERE id = product_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    DELETE FROM otp_codes 
    WHERE expires_at < NOW() - INTERVAL '1 hour';
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;