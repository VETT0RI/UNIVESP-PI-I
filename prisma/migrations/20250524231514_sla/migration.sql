-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('CLT', 'PJ', 'Estagio', 'Temporario', 'Autonomo');

-- CreateEnum
CREATE TYPE "EducationType" AS ENUM ('Ensino médio completo', 'Ensino superior incompleto', 'Ensino superior completo', 'Pós graduação/mestreado/MBA incompleto', 'Pós graduação/mestreado/MBS completo');

-- CreateEnum
CREATE TYPE "EthnicityType" AS ENUM ('Branca', 'Preta', 'Parda', 'Amarela', 'Indigena');

-- CreateEnum
CREATE TYPE "LevelType" AS ENUM ('Júnior', 'Pleno', 'Sênior', 'Especialista');

-- CreateEnum
CREATE TYPE "MaritalStatusType" AS ENUM ('Solteiro', 'Casado', 'Divorciado', 'Viúvo');

-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('Desenvolvedor', 'Analista', 'Gerente', 'Diretor', 'Estagiario', 'Assistente');

-- CreateEnum
CREATE TYPE "RgStateType" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "SexType" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('Ativo', 'Inativo', 'Pendente');

-- CreateEnum
CREATE TYPE "TShirtSizeType" AS ENUM ('PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG');

-- CreateTable
CREATE TABLE "collaborators" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "department_id" INTEGER,
    "status" "StatusType" NOT NULL,
    "photo" VARCHAR(2048),
    "social_name" VARCHAR(255) NOT NULL,
    "sex" "SexType" NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "birthplace" VARCHAR(100) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "marital_status" "MaritalStatusType" NOT NULL,
    "t_shirt_size" "TShirtSizeType" NOT NULL,
    "personal_email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "ethnicity" "EthnicityType" NOT NULL,
    "cpf_number" VARCHAR(14) NOT NULL,
    "rg_number" VARCHAR(20) NOT NULL,
    "rg_issuing_body" VARCHAR(50) NOT NULL,
    "rg_state" "RgStateType" NOT NULL,
    "rg_issue_date" DATE NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "residence_number" INTEGER NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "neighborhood" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "mother_name" VARCHAR(255) NOT NULL,
    "father_name" VARCHAR(255) NOT NULL,
    "pis_number" VARCHAR(14) NOT NULL,
    "pis_registration_date" DATE,
    "has_itau_account" BOOLEAN,
    "itau_account" VARCHAR(20),
    "itau_agency" VARCHAR(10),
    "has_cnpj" BOOLEAN,
    "cnpj_corporate_name" VARCHAR(255),
    "cnpj_bank_details" VARCHAR(255),
    "has_disability" BOOLEAN NOT NULL,
    "start_date" DATE NOT NULL,
    "shutdown_date" DATE,
    "shutdown_type" TEXT,
    "shutdown_reason" TEXT,
    "voter_registration_number" BIGINT,
    "voter_registration_zone" VARCHAR(10),
    "voter_registration_section" VARCHAR(10),
    "reservist_number" VARCHAR(30),
    "reservist_category" VARCHAR(30),
    "education" "EducationType" NOT NULL,
    "training_course" VARCHAR(255),
    "course_completion_date" DATE,
    "corporate_email" VARCHAR(255),
    "type_of_contract" "ContractType" NOT NULL,
    "position" "PositionType",
    "level" "LevelType",
    "leads_team" BOOLEAN,
    "leader" TEXT,
    "salary" TEXT,
    "variable" TEXT,
    "bonus" TEXT,
    "has_dependents" BOOLEAN NOT NULL,
    "will_use_vt" BOOLEAN,
    "will_use_parking" BOOLEAN,
    "number_of_dependents" INTEGER,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "board" VARCHAR(50) NOT NULL,
    "cost_center" VARCHAR(50) NOT NULL,
    "group_email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(100) NOT NULL,

    CONSTRAINT "departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependents" (
    "id" SERIAL NOT NULL,
    "collaborator_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "degree_of_kinship" VARCHAR(50) NOT NULL,
    "birth_date" DATE NOT NULL,
    "birth_certificate" VARCHAR(2048),
    "cpf" VARCHAR(2048),
    "proof_of_education" VARCHAR(2048),

    CONSTRAINT "dependents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "collaborator_id" INTEGER NOT NULL,
    "marriage_certificate" VARCHAR(2048),
    "medical_report" VARCHAR(2048),
    "voter_registration" VARCHAR(2048),
    "rg" VARCHAR(2048),
    "cpf" VARCHAR(2048),
    "proof_of_residence" VARCHAR(2048),
    "digital_work_card" VARCHAR(2048),
    "reservist_certificate" VARCHAR(2048),
    "proof_of_stable_union" VARCHAR(2048),
    "cnpj" VARCHAR(2048),
    "proof_of_education" VARCHAR(2048),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "id" SERIAL NOT NULL,
    "collaborator_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "degree_of_kinship" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportation_voucher" (
    "id" SERIAL NOT NULL,
    "collaborator_id" INTEGER NOT NULL,
    "witch_card" VARCHAR(50) NOT NULL,
    "daily_round_trip_price" DECIMAL(10,2) NOT NULL,
    "details_of_lines_used" TEXT NOT NULL,

    CONSTRAINT "transportation_voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "plate" VARCHAR(10) NOT NULL,
    "collaborator_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "color" VARCHAR(30) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("plate")
);

-- CreateTable
CREATE TABLE "staffs" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_key" ON "staffs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_id_key" ON "staffs"("id");

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dependents" ADD CONSTRAINT "dependents_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportation_voucher" ADD CONSTRAINT "transportation_voucher_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
