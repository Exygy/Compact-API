-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "cron_jobs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "name" TEXT,
    "last_run_date" TIMESTAMPTZ(6),

    CONSTRAINT "cron_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "script_runs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "script_name" TEXT NOT NULL,
    "triggering_user" TEXT NOT NULL,
    "did_script_run" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "script_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cron_jobs_name_key" ON "cron_jobs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "script_runs_script_name_key" ON "script_runs"("script_name");
