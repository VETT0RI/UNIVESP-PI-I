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

export type CollaboratorData = {
  name: string
  department_id?: number
  status: StatusType
  collaborator_photo: string
  social_name: string
  sex: SexType
  nationality: string
  birthplace: string
  state: string
  marital_status: MaritalStatusType
  t_shirt_size: TShirtSizeType
  personal_email: string
  phone_number: string
  date_of_birth: Date
  ethnicity: EthnicityType
  cpf_number: string
  rg_number: string
  rg_issuing_body: string
  rg_state: RgStateType
  rg_issue_date: Date
  address: string
  residence_number: number
  complement: string
  neighborhood: string
  city: string
  cep: string
  mother_name: string
  father_name: string
  pis_number: string
  pis_registration_date?: Date
  has_itau_account?: boolean
  itau_account?: string
  itau_agency?: string
  has_cnpj?: boolean
  cnpj_corporate_name?: string
  cnpj_bank_details?: string
  has_disability: boolean
  start_date: Date
  voter_registration_number?: bigint
  voter_registration_zone?: string
  voter_registration_section?: string
  reservist_number?: string
  reservist_category?: string
  education: EducationType
  training_course?: string
  course_completion_date?: Date
  corporate_email?: string
  type_of_contract: ContractType
  position?: PositionType
  level?: LevelType
  leads_team: boolean
  has_dependents: boolean
  will_use_vt: boolean
  will_use_parking: boolean
  number_of_dependents?: number
}
