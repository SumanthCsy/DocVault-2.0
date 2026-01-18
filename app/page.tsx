'use client'

import Link from 'next/link'
import { Shield, Zap, Lock, FileCheck, BarChart3, AlertCircle, CheckCircle2, ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DocVault</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden gap-8 md:flex">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#ai-tech" className="text-sm font-medium hover:text-primary transition-colors">
                AI Technology
              </a>
              <a href="#why" className="text-sm font-medium hover:text-primary transition-colors">
                Why Choose Us
              </a>
              <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors">
                History
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link href="/scanner" className="hidden md:inline-flex">
              <Button className="gap-2">
                <span className="flex items-center gap-1">
                  🔍 Scan
                </span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-border pb-4 md:hidden">
              <a href="#features" className="block px-4 py-2 text-sm font-medium hover:text-primary">
                Features
              </a>
              <a href="#ai-tech" className="block px-4 py-2 text-sm font-medium hover:text-primary">
                AI Technology
              </a>
              <a href="#why" className="block px-4 py-2 text-sm font-medium hover:text-primary">
                Why Choose Us
              </a>
              <Link href="/history" className="block px-4 py-2 text-sm font-medium hover:text-primary">
                History
              </Link>
              <div className="px-4 py-2">
                <Link href="/scanner" className="w-full">
                  <Button className="w-full">Start Scanning</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-50" />
        <div className="absolute inset-0 -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl opacity-50" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-secondary/50 px-4 py-2 text-sm font-medium text-primary">
            ✨ AI-Powered Document Verification
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Secure Your Documents with{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            DocVault uses advanced AI to detect fake or altered documents instantly. Upload your Aadhaar, PAN, or certificates and get real-time verification with military-grade encryption.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row justify-center items-center">
            <Link href="/scanner" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="gap-3 relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🔍 Start Advanced Scanning
                  <ArrowRight className="h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-4 text-center sm:grid-cols-3 text-sm">
            <div>
              <p className="font-bold text-xl sm:text-2xl text-primary">99.9%</p>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
            <div>
              <p className="font-bold text-xl sm:text-2xl text-primary">256-Bit</p>
              <p className="text-muted-foreground">AES Encryption</p>
            </div>
            <div>
              <p className="font-bold text-xl sm:text-2xl text-primary">0ms</p>
              <p className="text-muted-foreground">Cloud Needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">What Makes DocVault Special</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive document verification with industry-leading security
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">Upload Any Document</h3>
              <p className="text-muted-foreground">
                Scan Aadhaar, PAN, passports, certificates, and more with instant processing
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">Fraud Detection</h3>
              <p className="text-muted-foreground">
                AI detects fake, altered, or tampered documents with military-grade precision
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                Military-grade AES-256 encryption protects all your sensitive data
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">Instant Results</h3>
              <p className="text-muted-foreground">
                Get verification results in seconds with real-time 3D scanning visualization
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">Local Storage</h3>
              <p className="text-muted-foreground">
                No cloud required - all processing happens locally on your device
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-lg">Detailed Reports</h3>
              <p className="text-muted-foreground">
                Get comprehensive verification reports with visual indicators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section id="ai-tech" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Advanced AI Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge machine learning for document verification
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* OCR */}
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center hover:bg-card transition-colors">
              <div className="mb-4 flex justify-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">OCR Text Extraction</h3>
              <p className="text-muted-foreground">
                Extracts text with 99.9% accuracy using advanced optical character recognition
              </p>
            </div>

            {/* Tampering */}
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center hover:bg-card transition-colors">
              <div className="mb-4 flex justify-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Tampering Detection</h3>
              <p className="text-muted-foreground">
                Detects pixel-level alterations, edits, and digital manipulation in images
              </p>
            </div>

            {/* Duplicate */}
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center hover:bg-card transition-colors">
              <div className="mb-4 flex justify-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Duplicate Detection</h3>
              <p className="text-muted-foreground">
                Identifies if documents have been scanned before with fingerprinting technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why" className="px-4 py-20 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Why Choose DocVault?</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Privacy First</h4>
                    <p className="text-muted-foreground">
                      All processing happens locally. No data is sent to servers or third parties.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Bank-Level Security</h4>
                    <p className="text-muted-foreground">
                      256-bit AES encryption ensures your documents are protected.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Lightning Fast</h4>
                    <p className="text-muted-foreground">
                      Get results in seconds with instant verification feedback.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fully Responsive</h4>
                    <p className="text-muted-foreground">
                      Works seamlessly on mobile, tablet, and desktop devices.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/scanner">
                <Button size="lg" className="mt-8">
                  Get Started Today
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-card/50 p-8">
                <div className="space-y-6">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm font-medium text-primary">Security Status</p>
                    <p className="text-2xl font-bold mt-2">Protected</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm font-medium text-primary">Encryption</p>
                    <p className="text-2xl font-bold mt-2">AES-256</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm font-medium text-primary">Data Location</p>
                    <p className="text-2xl font-bold mt-2">Local Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Secure Your Documents?</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start verifying documents with AI-powered fraud detection in seconds.
          </p>
          <Link href="/scanner">
            <Button size="lg" className="gap-2">
              Scan Your First Document <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold">DocVault</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered document verification for the modern world.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#ai-tech" className="hover:text-primary transition-colors">Technology</a></li>
                <li><a href="/scanner" className="hover:text-primary transition-colors">Scanner</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://csytech.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@CSY TECH SOLUTIONS</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              Designed and developed by <a href="https://csytech.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">@CSY TECH SOLUTIONS</a>
            </p>
            <p className="mt-2">© 2024 DocVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
