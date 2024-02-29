alter table "public"."prompts" drop constraint "prompts_pkey";

drop index if exists "public"."prompts_pkey";

create table "public"."experiment_dataset" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."experiment_dataset" enable row level security;

create table "public"."experiment_dataset_values" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "dataset_id" uuid not null,
    "request_id" uuid not null
);


alter table "public"."experiment_dataset_values" enable row level security;

create table "public"."experiments" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "origin_prompt" uuid not null,
    "test_prompt" uuid not null,
    "dataset" uuid not null,
    "status" text not null default 'queued'::text
);


alter table "public"."experiments" enable row level security;

alter table "public"."prompts" add column "is_experiment" boolean not null default false;

alter table "public"."prompts" add column "uuid" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX experiment_dataset_values_pkey ON public.experiment_dataset_values USING btree (id);

CREATE UNIQUE INDEX experiments_pkey ON public.experiments USING btree (id);

CREATE UNIQUE INDEX prompt_dataset_pkey ON public.experiment_dataset USING btree (id);

CREATE UNIQUE INDEX prompts_uuid_key ON public.prompts USING btree (uuid);

CREATE UNIQUE INDEX prompts_pkey ON public.prompts USING btree (organization_id, id, version, uuid);

alter table "public"."experiment_dataset" add constraint "prompt_dataset_pkey" PRIMARY KEY using index "prompt_dataset_pkey";

alter table "public"."experiment_dataset_values" add constraint "experiment_dataset_values_pkey" PRIMARY KEY using index "experiment_dataset_values_pkey";

alter table "public"."experiments" add constraint "experiments_pkey" PRIMARY KEY using index "experiments_pkey";

alter table "public"."prompts" add constraint "prompts_pkey" PRIMARY KEY using index "prompts_pkey";

alter table "public"."experiment_dataset_values" add constraint "experiment_dataset_values_dataset_id_fkey" FOREIGN KEY (dataset_id) REFERENCES experiment_dataset(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."experiment_dataset_values" validate constraint "experiment_dataset_values_dataset_id_fkey";

alter table "public"."experiment_dataset_values" add constraint "experiment_dataset_values_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."experiment_dataset_values" validate constraint "experiment_dataset_values_request_id_fkey";

alter table "public"."experiments" add constraint "experiments_dataset_fkey" FOREIGN KEY (dataset) REFERENCES experiment_dataset(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."experiments" validate constraint "experiments_dataset_fkey";

alter table "public"."experiments" add constraint "experiments_origin_prompt_fkey" FOREIGN KEY (origin_prompt) REFERENCES prompts(uuid) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."experiments" validate constraint "experiments_origin_prompt_fkey";

alter table "public"."experiments" add constraint "experiments_test_prompt_fkey" FOREIGN KEY (test_prompt) REFERENCES prompts(uuid) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."experiments" validate constraint "experiments_test_prompt_fkey";

alter table "public"."prompts" add constraint "prompts_uuid_key" UNIQUE using index "prompts_uuid_key";


alter table "public"."prompts" drop constraint "prompts_pkey";

drop index if exists "public"."prompts_pkey";

alter table "public"."experiment_dataset" add column "organization_id" uuid not null;

CREATE UNIQUE INDEX prompts_pkey ON public.prompts USING btree (id, organization_id, version, uuid);

alter table "public"."prompts" add constraint "prompts_pkey" PRIMARY KEY using index "prompts_pkey";

alter table "public"."experiment_dataset" add constraint "experiment_dataset_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."experiment_dataset" validate constraint "experiment_dataset_organization_id_fkey";

alter table "public"."experiments" add column "organization_id" uuid not null;

alter table "public"."experiments" add constraint "experiments_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."experiments" validate constraint "experiments_organization_id_fkey";


alter table "public"."experiments" add column "provider_key" uuid not null;

alter table "public"."experiments" add constraint "experiments_provider_key_fkey" FOREIGN KEY (provider_key) REFERENCES provider_keys(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."experiments" validate constraint "experiments_provider_key_fkey";


