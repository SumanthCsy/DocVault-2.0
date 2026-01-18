'use client'

import Link from 'next/link'
import { ArrowLeft, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using DocVault (&quot;the Application&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on DocVault for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on DocVault</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              <li>Use automated tools or scripts to access the Application</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on DocVault are provided on an &apos;as is&apos; basis. DocVault makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitations of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall DocVault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DocVault, even if DocVault or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Document Accuracy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Document Verification and Accuracy</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Guarantee of Accuracy</h3>
                <p>
                  While DocVault employs advanced AI technology, we do not guarantee 100% accuracy in document verification. The results provided are based on automated analysis and should be verified by qualified professionals for critical decisions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">User Responsibility</h3>
                <p>
                  Users are solely responsible for interpreting and acting upon the results provided by DocVault. We recommend professional verification for important documents and transactions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Limitation of Use</h3>
                <p>
                  DocVault is provided for informational purposes only and should not be used as the sole basis for legal, financial, or official decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Acceptable Use Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use DocVault for any unlawful purposes or in any way that infringes upon the rights of others or restricts their use and enjoyment of the Application. Specifically, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Harass, abuse, or harm any person</li>
              <li>Submit false, fraudulent, or misleading documents</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to gain unauthorized access to the Application</li>
              <li>Use the Application for illegal document verification schemes</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of DocVault or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Termination of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault may terminate or suspend your access to its services at any time, without notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
            </p>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Third Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault may contain links to third-party websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which DocVault operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold mb-4">12. User Accounts and Local Storage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                DocVault does not require user accounts. All data is stored locally on your device. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Maintaining the security of your device</li>
                <li>Backing up your scan history</li>
                <li>Clearing your data when necessary</li>
              </ul>
            </div>
          </section>

          {/* Liability Waiver */}
          <section>
            <h2 className="text-2xl font-bold mb-4">13. Liability Waiver</h2>
            <p className="text-muted-foreground leading-relaxed">
              You acknowledge that DocVault is provided for informational purposes only. We are not liable for any decisions made based on the results provided by our Application. We do not provide legal, financial, or professional advice.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="font-semibold mb-2">CSY TECH SOLUTIONS</p>
              <p className="text-muted-foreground">
                <a href="https://csytech.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  csytech.vercel.app
                </a>
              </p>
            </div>
          </section>

          {/* Agreement */}
          <section className="bg-primary/10 border border-primary/30 rounded-lg p-6">
            <p className="text-sm">
              By using DocVault, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions of this Terms of Service agreement.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 justify-between">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/privacy">
            <Button>View Privacy Policy</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
