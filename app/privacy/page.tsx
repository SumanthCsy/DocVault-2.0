'use client'

import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our document verification application.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Data Collection and Processing</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Local Processing Only</h3>
                <p>
                  DocVault processes all documents locally on your device. We do not transmit, store, or upload any documents to external servers or cloud services. All analysis, including OCR, tampering detection, and duplicate checking, occurs entirely within your browser.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Document Storage</h3>
                <p>
                  Your documents are never saved to our servers. We do not create backups or retain copies of the documents you scan. All data is stored temporarily in your device's local storage during the scanning session only.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Scan History</h3>
                <p>
                  If you choose to store scan history, it is saved only on your device using browser local storage. This data never leaves your device unless you explicitly export it.
                </p>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Data</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>We use your data exclusively for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Document verification and analysis within your browser</li>
                <li>Generating verification reports</li>
                <li>Improving the accuracy of our AI models (with your consent only)</li>
                <li>Ensuring the security and integrity of the application</li>
              </ul>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Security Measures</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">End-to-End Encryption</h3>
                <p>
                  Any data stored locally is encrypted using AES-256 encryption. This ensures that even if your device is compromised, the data remains protected.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">HTTPS Protection</h3>
                <p>
                  All communication with DocVault servers (if any) is conducted over secure HTTPS connections to prevent interception.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">No Third-Party Access</h3>
                <p>
                  We do not share your documents with any third parties, including government agencies, without explicit legal requirement and your knowledge.
                </p>
              </div>
            </div>
          </section>

          {/* Local Storage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              DocVault uses browser local storage to save your:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Scan history and metadata</li>
              <li>User preferences and settings</li>
              <li>Temporary processing data (cleared after each session)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can clear this data at any time through your browser settings or by using our built-in data deletion feature.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault does not use cookies for tracking or advertising purposes. We may use essential cookies only to maintain your session and provide core functionality. No personal data is collected through cookies.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault does not integrate with third-party analytics, advertising, or tracking services. Your usage data is not shared with external providers.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Privacy Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Right to access your stored data</li>
              <li>Right to delete your scan history</li>
              <li>Right to export your data</li>
              <li>Right to clear all local storage at any time</li>
              <li>Right to opt-out of any data collection</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since DocVault does not store documents on servers, there are no retention periods. Your data is stored only in local storage for as long as you wish. You can delete all data at any time.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              DocVault is not intended for children under 13. We do not knowingly collect information from children. If we become aware that a child has provided us with personal information, we will delete such information immediately.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
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
              By using DocVault, you agree to the terms of this Privacy Policy. If you do not agree with our privacy practices, please discontinue using our application.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 justify-between">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/terms">
            <Button>View Terms of Service</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
