import AppLayout from '../components/layout/AppLayout'
import { CertificateVerification } from '../features/certificates'

export default function CertificateVerificationPage() {
  return (
    <AppLayout section="Certificate Verification">
      <CertificateVerification />
    </AppLayout>
  )
}