// Demonstration records transcribed from the supplied complaints mockup.
export const complaintSamples = [
  { id:1048,userId:412,userName:'Lerato Moloi',studentNumber:'STU-2024-0412',email:'lerato.moloi@student.digifikile.co.za',phone:'+27 82 901 3491',network:'Vodacom Mobile',role:'Registered Learner',institute:'Johannesburg Campus',verified:true,category:'Certification',priority:'High',status:'InReview',subject:'Unable to download accredited SETA completion certificate',metadata:'SETA ACCREDITATION TRACK: MICT-SETA / QUALIFICATION CODE: 49077',description:"I successfully passed all 6 modules of the Full Stack Web Development course on 14 October 2024 with an 84% average. When I click 'Download Certificate', the modal says 'Pending SETA cryptographic hash verification'. I need this urgently for my employment application with Nedbank.",createdAt:'2024-10-18T07:15:00Z',version:0,
  draft:'Dear Lerato, We have verified your completed course records with the MICT SETA moderation queue. The cryptographic hash registration has now been confirmed (#MICT-CERT-88419). You can now refresh your learner portal and download your accredited certificate.',
  history:[
    {id:3,eventType:'Audit verified SAQA batch verification queue',createdAt:'2024-10-18T08:10:00Z',details:'Cryptographic signature completed for batch #SAQA-9921. Learner public certificate identifier generated and locked in registry.',actor:'Automated Engine [SETA-DAEMON-02]'},
    {id:2,eventType:"Status updated to 'Under Review'",createdAt:'2024-10-18T07:40:00Z',details:'Ticket assigned to Kagiso Maluleke (System Administrator). Priority escalated to High based on active employment verification deadline.',actor:'kagiso.maluleke (Admin Session ID: #ADM-4412)'},
    {id:1,eventType:'Complaint submitted by Lerato Moloi',createdAt:'2024-10-18T07:15:00Z',details:'Ticket initiated from Learner Portal v2.4 via Help & Grievance Module. Initial system state assigned as New.',actor:'IP: 197.89.21.144 (Mobile Client - Chrome/Android)'}
  ]},
  {id:1045,userId:45,userName:'Dr. K. Khumalo',role:'Lecturer',email:'',phone:null,category:'Assessment',priority:'High',status:'New',subject:'Facilitator grading batch timeout error during assessment',description:'The grading batch times out during assessment processing.',createdAt:'2024-10-18T05:45:00Z',version:0,history:[]},
  {id:1042,userId:42,userName:'Sipho Ndlovu',role:'Provider',email:'',phone:null,category:'Accreditation',priority:'Medium',status:'InProgress',subject:'Training Provider accreditation verification',description:'Assistance requested with training provider accreditation verification.',createdAt:'2024-10-17T14:30:00Z',version:0,history:[]},
  {id:1039,userId:39,userName:'Zanele Sithole',role:'Learner',email:'',phone:null,category:'Authentication',priority:'Low',status:'Resolved',subject:'MFA SMS token delay on Vodacom network',description:'The MFA SMS token was delayed on the Vodacom network.',createdAt:'2024-10-16T09:05:00Z',version:0,history:[]}
]

const KEY = 'digifikile-complaints-demo-v1'
const read = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved) && saved.length === complaintSamples.length && saved.every(c => complaintSamples.some(s => s.id === c.id) && Array.isArray(c.history))) return saved
  } catch { /* Use the sample snapshot if browser storage is unavailable or invalid. */ }
  return structuredClone(complaintSamples)
}
const save = (id, status, version, response) => {
  const items = read()
  const item = items.find(c => c.id === id)
  if (!item) throw new Error('Complaint not found.')
  if (item.version !== version) throw new Error('This sample complaint changed. Refresh and try again.')
  const now = new Date().toISOString()
  const actor = localStorage.getItem('digifikile-user-name') || 'Kagiso Maluleke'
  if (item.status !== status) item.history.unshift({id:crypto.randomUUID(),eventType:status === 'Resolved' ? 'Complaint resolved' : 'Status changed',details:item.status + ' → ' + status,actor,createdAt:now})
  item.status = status
  item.version++
  if (response) {
    item.history.unshift({id:crypto.randomUUID(),eventType:'Response added',details:response,actor,createdAt:now})
    item.response = response
    item.draft = ''
  }
  localStorage.setItem(KEY, JSON.stringify(items))
  return item
}
export const complaintDemoService = {
  async list() { return read() },
  async detail(id) { const item = read().find(c => c.id === id); if (!item) throw new Error('Complaint not found.'); return item },
  async updateStatus(id,status,version) { save(id,status,version); return true },
  async respond(id,response,status,version) { if (!response.trim()) throw new Error('Enter a response.'); return save(id,status,version,response.trim()) },
}
