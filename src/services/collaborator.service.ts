import { PrismaClient, Prisma, Collaborator } from '@prisma/client'
import mime from 'mime'
import { uploadBufferGetUrl } from '../utils/gcs.js'
import {
  CollaboratorData,
  DependentInputDto,
  DocumentInputDto,
  EmergencyContactInputDto,
  TransportationVoucherInputDto,
  VehicleInputDto,
} from '../types/CollaboratorData.js'

const prisma = new PrismaClient()

async function maybeUpload(
  maybeFile: Express.Multer.File | string | null | undefined,
  folder: string
): Promise<string | null> {
  if (!maybeFile) return null

  let buffer: Buffer
  let filename: string

  if (typeof maybeFile !== 'string') {
    buffer = maybeFile.buffer
    filename = maybeFile.originalname
  } else {
    if (maybeFile.startsWith('http://') || maybeFile.startsWith('https://')) {
      return maybeFile
    }

    let base64data: string
    let ext = 'bin'

    if (maybeFile.startsWith('data:')) {
      const match = maybeFile.match(/^data:(.+);base64,(.+)$/)
      if (!match) throw new Error('Formato Base64 inválido')
      const [, mimetype, data] = match
      ext = mime.extension(mimetype) || ext
      base64data = data
    } else {
      base64data = maybeFile
    }

    buffer = Buffer.from(base64data, 'base64')
    filename = `${Date.now()}.${ext}`
  }

  return await uploadBufferGetUrl(buffer, filename, folder)
}

export async function createCollaborator(
  input: CollaboratorData & { photoFile?: Express.Multer.File }
): Promise<Collaborator> {
  const photoUrl = await maybeUpload(
    input.photoFile ?? input.photo,
    'collaborators/photos'
  )

  const numDependents =
    typeof input.number_of_dependents === 'string'
      ? parseInt(input.number_of_dependents, 10)
      : input.number_of_dependents ?? null

  const dependentsCreate = input.dependents?.length
    ? {
        create: await Promise.all(
          input.dependents.map(async (d: DependentInputDto) => ({
            name: d.name,
            degree_of_kinship: d.degree_of_kinship,
            birth_date: new Date(d.birth_date),
            birth_certificate: await maybeUpload(
              d.birth_certificate,
              'dependents/birth_certificate'
            ),
            cpf: await maybeUpload(d.cpf, 'dependents/cpf'),
            proof_of_education: await maybeUpload(
              d.proof_of_education,
              'dependents/proof_of_education'
            ),
          }))
        ),
      }
    : undefined

  const documentsCreate = input.documents?.length
    ? {
        create: await Promise.all(
          input.documents.map(async (doc: DocumentInputDto) => ({
            marriage_certificate: await maybeUpload(
              doc.marriage_certificate,
              'documents/marriage_certificate'
            ),
            medical_report: await maybeUpload(
              doc.medical_report,
              'documents/medical_report'
            ),
            voter_registration: await maybeUpload(
              doc.voter_registration,
              'documents/voter_registration'
            ),
            rg: await maybeUpload(doc.rg, 'documents/rg'),
            cpf: await maybeUpload(doc.cpf, 'documents/cpf'),
            proof_of_residence: await maybeUpload(
              doc.proof_of_residence,
              'documents/proof_of_residence'
            ),
            digital_work_card: await maybeUpload(
              doc.digital_work_card,
              'documents/digital_work_card'
            ),
            reservist_certificate: await maybeUpload(
              doc.reservist_certificate,
              'documents/reservist_certificate'
            ),
            proof_of_stable_union: await maybeUpload(
              doc.proof_of_stable_union,
              'documents/proof_of_stable_union'
            ),
            cnpj: await maybeUpload(doc.cnpj, 'documents/cnpj'),
            proof_of_education: await maybeUpload(
              doc.proof_of_education,
              'documents/proof_of_education'
            ),
          }))
        ),
      }
    : undefined

  const emergencyContactsCreate = input.emergency_contacts?.length
    ? {
        create: input.emergency_contacts.map(
          (ec: EmergencyContactInputDto) => ({
            name: ec.name,
            degree_of_kinship: ec.degree_of_kinship,
            phone_number: ec.phone_number,
          })
        ),
      }
    : undefined

  const transportationVouchersCreate = input.transportation_voucher?.length
    ? {
        create: input.transportation_voucher.map(
          (tv: TransportationVoucherInputDto) => ({
            witch_card: tv.witch_card,
            daily_round_trip_price: new Prisma.Decimal(
              tv.daily_round_trip_price.toString()
            ),
            details_of_lines_used: tv.details_of_lines_used,
          })
        ),
      }
    : undefined

  const vehiclesCreate = input.vehicles?.length
    ? {
        create: input.vehicles.map((v: VehicleInputDto) => ({
          plate: v.plate,
          year: v.year,
          brand: v.brand,
          model: v.model,
          color: v.color,
        })),
      }
    : undefined

  const data: Prisma.CollaboratorCreateInput = {
    name: input.name,
    status: input.status,
    photo: photoUrl,
    social_name: input.social_name,
    sex: input.sex,
    nationality: input.nationality,
    birthplace: input.birthplace,
    state: input.state,
    marital_status: input.marital_status,
    t_shirt_size: input.t_shirt_size,
    personal_email: input.personal_email,
    phone_number: input.phone_number,
    ethnicity: input.ethnicity,
    cpf_number: input.cpf_number,
    rg_number: input.rg_number,
    rg_issuing_body: input.rg_issuing_body,
    rg_state: input.rg_state,
    address: input.address,
    residence_number: input.residence_number,
    complement: input.complement,
    neighborhood: input.neighborhood,
    city: input.city,
    cep: input.cep,
    mother_name: input.mother_name,
    father_name: input.father_name,
    pis_number: input.pis_number,
    has_disability: input.has_disability,
    date_of_birth: new Date(input.date_of_birth),
    rg_issue_date: new Date(input.rg_issue_date),
    start_date: new Date(input.start_date),
    pis_registration_date: input.pis_registration_date
      ? new Date(input.pis_registration_date)
      : null,
    shutdown_date: input.shutdown_date ? new Date(input.shutdown_date) : null,
    shutdown_type: input.shutdown_type,
    shutdown_reason: input.shutdown_reason,
    voter_registration_number: input.voter_registration_number
      ? BigInt(input.voter_registration_number)
      : null,
    voter_registration_zone: input.voter_registration_zone,
    voter_registration_section: input.voter_registration_section,
    reservist_number: input.reservist_number,
    reservist_category: input.reservist_category,
    education: input.education,
    training_course: input.training_course,
    course_completion_date: input.course_completion_date
      ? new Date(input.course_completion_date)
      : null,
    corporate_email: input.corporate_email,
    type_of_contract: input.type_of_contract,
    position: input.position,
    level: input.level,
    leads_team: input.leads_team,
    leader: input.leader,
    salary: input.salary,
    variable: input.variable,
    bonus: input.bonus,
    has_dependents: input.has_dependents,
    will_use_vt: input.will_use_vt,
    will_use_parking: input.will_use_parking,
    number_of_dependents: numDependents,
    dependents: dependentsCreate,
    documents: documentsCreate,
    emergency_contacts: emergencyContactsCreate,
    transportation_voucher: transportationVouchersCreate,
    vehicles: vehiclesCreate,
  }

  return prisma.collaborator.create({
    data,
    include: {
      dependents: true,
      documents: true,
      emergency_contacts: true,
      transportation_voucher: true,
      vehicles: true,
    },
  })
}

export async function listCollaborators(): Promise<Collaborator[]> {
  return prisma.collaborator.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      department: true,
      dependents: true,
      documents: true,
      emergency_contacts: true,
      transportation_voucher: true,
      vehicles: true,
    },
  })
}

export async function getCollaboratorById(
  id: number
): Promise<Collaborator | null> {
  return prisma.collaborator.findUnique({
    where: { id },
    include: {
      department: true,
      dependents: true,
      documents: true,
      emergency_contacts: true,
      transportation_voucher: true,
      vehicles: true,
    },
  })
}

export async function updateCollaborator(
  id: number,
  input: Partial<CollaboratorData> & { photoFile?: Express.Multer.File }
): Promise<Collaborator> {
  const {
    name,
    status,
    photo,
    social_name,
    sex,
    nationality,
    birthplace,
    state,
    marital_status,
    t_shirt_size,
    personal_email,
    phone_number,
    ethnicity,
    cpf_number,
    rg_number,
    rg_issuing_body,
    rg_state,
    address,
    residence_number,
    complement,
    neighborhood,
    city,
    cep,
    mother_name,
    father_name,
    pis_number,
    has_disability,
    education,
    training_course,
    corporate_email,
    type_of_contract,
    position,
    level,
    leads_team,
    leader,
    salary,
    variable,
    bonus,
    has_dependents,
    will_use_vt,
    will_use_parking,
    number_of_dependents,
    reservist_number,
    reservist_category,
    voter_registration_number,
    voter_registration_zone,
    voter_registration_section,
    date_of_birth,
    rg_issue_date,
    start_date,
    pis_registration_date,
    course_completion_date,
    shutdown_date,
    shutdown_type,
    shutdown_reason,
    department_id,
    dependents,
    documents,
    emergency_contacts,
    transportation_voucher,
    vehicles,
  } = input

  const data: Prisma.CollaboratorUpdateInput = {}

  if (name !== undefined) data.name = name
  if (status !== undefined) data.status = status
  if (photo !== undefined) data.photo = photo
  if (social_name !== undefined) data.social_name = social_name
  if (sex !== undefined) data.sex = sex
  if (nationality !== undefined) data.nationality = nationality
  if (birthplace !== undefined) data.birthplace = birthplace
  if (state !== undefined) data.state = state
  if (marital_status !== undefined) data.marital_status = marital_status
  if (t_shirt_size !== undefined) data.t_shirt_size = t_shirt_size
  if (personal_email !== undefined) data.personal_email = personal_email
  if (phone_number !== undefined) data.phone_number = phone_number
  if (ethnicity !== undefined) data.ethnicity = ethnicity
  if (cpf_number !== undefined) data.cpf_number = cpf_number
  if (rg_number !== undefined) data.rg_number = rg_number
  if (rg_issuing_body !== undefined) data.rg_issuing_body = rg_issuing_body
  if (rg_state !== undefined) data.rg_state = rg_state
  if (address !== undefined) data.address = address
  if (residence_number !== undefined) data.residence_number = residence_number
  if (complement !== undefined) data.complement = complement
  if (neighborhood !== undefined) data.neighborhood = neighborhood
  if (city !== undefined) data.city = city
  if (cep !== undefined) data.cep = cep
  if (mother_name !== undefined) data.mother_name = mother_name
  if (father_name !== undefined) data.father_name = father_name
  if (pis_number !== undefined) data.pis_number = pis_number
  if (has_disability !== undefined) data.has_disability = has_disability
  if (education !== undefined) data.education = education
  if (training_course !== undefined) data.training_course = training_course
  if (corporate_email !== undefined) data.corporate_email = corporate_email
  if (type_of_contract !== undefined) data.type_of_contract = type_of_contract
  if (position !== undefined) data.position = position
  if (level !== undefined) data.level = level
  if (leads_team !== undefined) data.leads_team = leads_team
  if (leader !== undefined) data.leader = leader
  if (salary !== undefined) data.salary = salary
  if (variable !== undefined) data.variable = variable
  if (bonus !== undefined) data.bonus = bonus
  if (has_dependents !== undefined) data.has_dependents = has_dependents
  if (will_use_vt !== undefined) data.will_use_vt = will_use_vt
  if (will_use_parking !== undefined) data.will_use_parking = will_use_parking
  if (number_of_dependents !== undefined)
    data.number_of_dependents = number_of_dependents
  if (reservist_number !== undefined) data.reservist_number = reservist_number
  if (reservist_category !== undefined)
    data.reservist_category = reservist_category

  if (date_of_birth !== undefined) data.date_of_birth = new Date(date_of_birth)
  if (rg_issue_date !== undefined) data.rg_issue_date = new Date(rg_issue_date)
  if (start_date !== undefined) data.start_date = new Date(start_date)

  if (pis_registration_date !== undefined) {
    data.pis_registration_date = pis_registration_date
      ? new Date(pis_registration_date)
      : null
  }
  if (course_completion_date !== undefined) {
    data.course_completion_date = course_completion_date
      ? new Date(course_completion_date)
      : null
  }
  if (shutdown_date !== undefined) {
    data.shutdown_date = shutdown_date ? new Date(shutdown_date) : null
  }
  if (shutdown_type !== undefined) data.shutdown_type = shutdown_type
  if (shutdown_reason !== undefined) data.shutdown_reason = shutdown_reason

  if (voter_registration_number !== undefined) {
    data.voter_registration_number = voter_registration_number
      ? BigInt(voter_registration_number)
      : null
  }
  if (voter_registration_zone !== undefined)
    data.voter_registration_zone = voter_registration_zone
  if (voter_registration_section !== undefined)
    data.voter_registration_section = voter_registration_section

  if (department_id !== undefined) {
    data.department =
      department_id === null
        ? { disconnect: true }
        : { connect: { id: department_id } }
  }

  return prisma.collaborator.update({
    where: { id },
    data,
    include: {
      department: true,
      dependents: true,
      documents: true,
      emergency_contacts: true,
      transportation_voucher: true,
      vehicles: true,
    },
  })
}

export async function deleteCollaborator(id: number): Promise<Collaborator> {
  return prisma.collaborator.delete({
    where: { id },
  })
}
