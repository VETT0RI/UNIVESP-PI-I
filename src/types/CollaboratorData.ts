import {
  StatusType,
  SexType,
  MaritalStatusType,
  TShirtSizeType,
  EthnicityType,
  RgStateType,
  EducationType,
  ContractType,
  PositionType,
  LevelType,
} from '@prisma/client'

export interface DependentInputDto {
  collaborator_id: string
  name: string
  degree_of_kinship: string
  birth_date: string
  birth_certificate?: string | null
  cpf?: string | null
  proof_of_education?: string | null
}

export interface DocumentInputDto {
  marriage_certificate?: string | null
  medical_report?: string | null
  voter_registration?: string | null
  rg?: string | null
  cpf?: string | null
  proof_of_residence?: string | null
  digital_work_card?: string | null
  reservist_certificate?: string | null
  birth_certificate?: string | null
  proof_of_stable_union?: string | null
  cnpj?: string | null
  proof_of_education?: string | null
}

export interface EmergencyContactInputDto {
  name: string
  degree_of_kinship: string
  phone_number: string
}

export interface TransportationVoucherInputDto {
  witch_card: string
  daily_round_trip_price: string | number
  details_of_lines_used: string
}

export interface VehicleInputDto {
  plate: string
  year: number
  brand: string
  model: string
  color: string
}

export type CollaboratorData = {
  name: string
  department_id?: number | null
  status: StatusType
  photo: string
  social_name: string
  sex: SexType
  nationality: string
  birthplace: string
  state: string
  marital_status: MaritalStatusType
  t_shirt_size: TShirtSizeType
  personal_email: string
  phone_number: string
  date_of_birth: string
  ethnicity: EthnicityType
  cpf_number: string
  rg_number: string
  rg_issuing_body: string
  rg_state: RgStateType
  rg_issue_date: string
  address: string
  residence_number: number
  complement: string
  neighborhood: string
  city: string
  cep: string
  mother_name: string
  father_name: string
  pis_number: string
  pis_registration_date?: string | null
  has_itau_account?: boolean | null
  itau_account?: string | null
  itau_agency?: string | null
  has_cnpj?: boolean | null
  cnpj_corporate_name?: string | null
  cnpj_bank_details?: string | null
  has_disability: boolean
  start_date: string
  shutdown_date?: string | null
  shutdown_type?: string | null
  shutdown_reason?: string | null
  voter_registration_number?: string | null
  voter_registration_zone?: string | null
  voter_registration_section?: string | null
  reservist_number?: string | null
  reservist_category?: string | null
  education: EducationType
  training_course?: string | null
  course_completion_date?: string | null
  corporate_email?: string | null
  type_of_contract: ContractType
  position?: PositionType | null
  level?: LevelType | null
  leads_team?: boolean | null
  leader?: string | null
  salary?: string | null
  variable?: string | null
  bonus?: string | null
  has_dependents: boolean
  will_use_vt?: boolean | null
  will_use_parking?: boolean | null
  number_of_dependents?: number | null
  dependents?: DependentInputDto[]
  documents?: DocumentInputDto[]
  emergency_contacts?: EmergencyContactInputDto[]
  transportation_voucher?: TransportationVoucherInputDto[]
  vehicles?: VehicleInputDto[]
}

export type CreateCollaboratorDto = CollaboratorData
export type UpdateCollaboratorDto = Partial<CollaboratorData>
