
-- in supabase/seed.sql

INSERT INTO public.products(id,active,name,description,image,metadata) VALUES ('prod_QcStg3Ga0nGehy','true','Get the good deals','5 minutes live notification and a direct contact to the seller',NULL,'{}');
INSERT INTO public.products(id,active,name,description,image,metadata) VALUES ('prod_QcW2cGGxlPj4JT','false','Hobby','Hobby product description',NULL,'{"index":"0"}');
INSERT INTO public.products(id,active,name,description,image,metadata) VALUES ('prod_QcW2ndvxWoJBqS','false','Freelancer','Freelancer product description',NULL,'{"index":"1"}');
INSERT INTO public.products(id,active,name,description,image,metadata) VALUES ('prod_QcSuRLGmjdyfWH','true','Get the pro deals','Get 5 min live notification and deal with details estimations and direct contact to the seller',NULL,'{}');

INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlDy3GAd6vMIrAiuencKQTO','prod_QcStg3Ga0nGehy','true',NULL,50000,'eur','recurring','month',1,0,NULL);
INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlDyqGAd6vMIrAiVi83BhsH','prod_QcSuRLGmjdyfWH','true',NULL,150000,'eur','recurring','month',1,0,NULL);
INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlH0RGAd6vMIrAiUdeCN114','prod_QcW2cGGxlPj4JT','true',NULL,1000,'usd','recurring','month',1,0,NULL);
INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlH0RGAd6vMIrAixB5rP7Bd','prod_QcW2cGGxlPj4JT','true',NULL,10000,'usd','recurring','year',1,0,NULL);
INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlH0SGAd6vMIrAismy0EBEC','prod_QcW2ndvxWoJBqS','true',NULL,20000,'usd','recurring','year',1,0,NULL);
INSERT INTO public.prices(id,product_id,active,description,unit_amount,currency,type,interval,interval_count,trial_period_days,metadata) VALUES ('price_1PlH0SGAd6vMIrAiVzXVDhGk','prod_QcW2ndvxWoJBqS','true',NULL,2000,'usd','recurring','month',1,0,NULL);
