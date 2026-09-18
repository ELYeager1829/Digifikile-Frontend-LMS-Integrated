const MOCK_CERTIFICATES = [
  {
    certificateNumber: 'DFL-2024-00124',
    learnerName: 'Amara Ndlovu',
    learnerDetails: 'Learner ID: LRN-1042',
    certificateName: 'Certificate in Digital Literacy',
    issueDate: '2024-02-15',
    expiryDate: '2027-02-15',
    issuingAuthority: 'DigiFikile Learning Institute',
    status: 'Valid',
  },
  {
    certificateNumber: 'DFL-2021-00087',
    learnerName: 'Thabo Mokoena',
    learnerDetails: 'Learner ID: LRN-0871',
    certificateName: 'Advanced Web Development',
    issueDate: '2021-01-10',
    expiryDate: '2024-01-10',
    issuingAuthority: 'DigiFikile Learning Institute',
    status: 'Expired',
  },
  {
    certificateNumber: 'DFL-2023-00019',
    learnerName: 'Lerato Khumalo',
    learnerDetails: 'Learner ID: LRN-0924',
    certificateName: 'Project Management Fundamentals',
    issueDate: '2023-06-21',
    expiryDate: '2026-06-21',
    issuingAuthority: 'DigiFikile Learning Institute',
    status: 'Revoked',
  },
]

export function verifyCertificate(certificateNumber) {
  const normalizedNumber = certificateNumber.trim().toUpperCase()
  return MOCK_CERTIFICATES.find((certificate) => certificate.certificateNumber === normalizedNumber) ?? null
}