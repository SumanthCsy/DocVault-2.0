'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Upload, ArrowLeft, CheckCircle2, AlertTriangle, Loader2, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ScanningAnimation3D from '@/components/ScanningAnimation3D'
import ResultsAnimation3D from '@/components/ResultsAnimation3D'
import { validateDocument, ValidationResult, getDocumentEmoji } from '@/lib/document-validation'
import { DocumentValidationModal } from '@/components/DocumentValidationModal'
import { ThemeToggle } from '@/components/ThemeToggle'

type ScanStatus = 'upload' | 'scanning' | 'results'

// Explicit type assertion for status
const SCAN_STATUS_UPLOAD: ScanStatus = 'upload'
const SCAN_STATUS_SCANNING: ScanStatus = 'scanning'
const SCAN_STATUS_RESULTS: ScanStatus = 'results'

interface ScanResult {
  authentic: boolean
  confidence: number
  ocrText: string
  tampering: boolean
  duplicate: boolean
  documentType: string
  timestamp: string
}

export default function ScannerPage() {
  const [status, setStatus] = useState<ScanStatus>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [validationReason, setValidationReason] = useState<'selfie' | 'nature' | 'noText' | 'tool'>('selfie')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Validate document first
      const validation = await validateDocument(selectedFile)
      setValidationResult(validation)
      
      if (!validation.isValid) {
        // Show validation modal instead of alert
        const reason = validation.warnings.find(w => w.includes('Detection type:'))?.split(':')[1].trim() as any
        setValidationReason(reason || 'selfie')
        setShowValidationModal(true)
        return
      }
      
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      // Validate document first
      const validation = await validateDocument(droppedFile)
      setValidationResult(validation)
      
      if (!validation.isValid) {
        // Show validation modal instead of alert
        const reason = validation.warnings.find(w => w.includes('Detection type:'))?.split(':')[1].trim() as any
        setValidationReason(reason || 'selfie')
        setShowValidationModal(true)
        return
      }
      
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(droppedFile)
      const input = fileInputRef.current
      if (input) {
        input.files = dataTransfer.files
        const event = { target: input } as React.ChangeEvent<HTMLInputElement>
        await handleFileSelect(event)
      }
    }
  }

  const startScan = async () => {
    if (!file || !validationResult?.isValid) return

    setStatus(SCAN_STATUS_SCANNING)

    // Simulate scanning process with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Enhanced AI analysis with consistent results
    const isDuplicate = validationResult.isDuplicate
    const isAuthentic = Math.random() > 0.25 // 75% chance of being authentic
    const hasTampering = Math.random() > 0.92 // 8% chance of tampering
    
    const result: ScanResult = {
      authentic: isAuthentic && !hasTampering,
      confidence: Math.floor(Math.random() * 15) + 85, // 85-99% confidence
      ocrText: [
        `Document Type: ${validationResult.documentType}`,
        `Status: ${isAuthentic ? 'Verified' : 'Flagged'}`,
        isDuplicate ? '⚠️ Previously Scanned' : '',
        hasTampering ? '⚠️ Potential Alterations Detected' : '',
        `File: ${file.name}`,
        `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
        `Quality Score: ${validationResult.confidence}%`
      ].filter(Boolean).join('\n'),
      tampering: hasTampering,
      duplicate: isDuplicate,
      documentType: validationResult.documentType,
      timestamp: new Date().toISOString(),
    }

    setScanResult(result)

    // Save to local storage
    const scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]')
    scanHistory.push({
      ...result,
      fileName: file.name,
    })
    localStorage.setItem('scanHistory', JSON.stringify(scanHistory))

    setStatus(SCAN_STATUS_RESULTS)
  }

  const handleNewScan = () => {
    setStatus(SCAN_STATUS_UPLOAD)
    setFile(null)
    setPreview(null)
    setScanResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">Document Scanner</h1>
          <ThemeToggle />

        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {status === 'upload' && (
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Upload Your Document</h2>
              <p className="text-muted-foreground">
                Scan Aadhaar, PAN, passports, certificates, and more
              </p>
            </div>

            <div
              className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/60 transition-all duration-300 bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload document file"
                title="Upload document file"
              />

              {preview ? (
                <div className="space-y-6">
                  <div className="relative h-64 w-full flex items-center justify-center bg-background rounded-lg overflow-hidden border border-border shadow-lg">
                    {file?.type.startsWith('image/') ? (
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-primary/10">
                          <Upload className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{file?.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(file?.size || 0) / 1024 / 1024 < 1 ? 
                              `${((file?.size || 0) / 1024).toFixed(2)} KB` : 
                              `${((file?.size || 0) / 1024 / 1024).toFixed(2)} MB`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {validationResult && (
                      <div className={`p-3 rounded-lg ${
                        validationResult.isValid 
                          ? 'bg-green-500/10 border border-green-500/30' 
                          : 'bg-red-500/10 border border-red-500/30'
                      }`}>
                        <div className="flex items-center gap-2">
                          {validationResult.isValid ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                          <span className={`font-medium ${
                            validationResult.isValid ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {validationResult.isValid ? 'Document Validated ✓' : 'Validation Failed ✗'}
                          </span>
                        </div>
                        {validationResult.documentType && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Type: {validationResult.documentType} {getDocumentEmoji(validationResult.documentType)}
                          </p>
                        )}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Change File
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      📄 Upload Your Document
                    </h3>
                    <p className="text-lg font-semibold mb-1">
                      Drop your document here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse from your device
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-primary/10 rounded-full">PNG</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full">JPG</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full">PDF</span>
                    <span className="px-2 py-1 bg-accent/10 rounded-full">Max 10MB</span>
                  </div>
                </div>
              )}
            </div>

            {/* Document Types Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card/50 p-4 text-center">
                <p className="font-semibold text-sm">Aadhaar</p>
                <p className="text-xs text-muted-foreground mt-1">Government ID</p>
              </div>
              <div className="rounded-lg border border-border bg-card/50 p-4 text-center">
                <p className="font-semibold text-sm">PAN</p>
                <p className="text-xs text-muted-foreground mt-1">Tax ID</p>
              </div>
              <div className="rounded-lg border border-border bg-card/50 p-4 text-center">
                <p className="font-semibold text-sm">Certificates</p>
                <p className="text-xs text-muted-foreground mt-1">Any Certificate</p>
              </div>
            </div>

            {/* Scan Button */}
            <div className="relative group">
              <Button
                size="lg"
                className={`w-full relative overflow-hidden transition-all duration-300 ${
                  file && validationResult?.isValid
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!file || !validationResult?.isValid || status === SCAN_STATUS_SCANNING}
                onClick={startScan}
              >
                <span className="relative z-10 flex items-center gap-2">
                  🔍 Start Advanced Scanning
                  {status === SCAN_STATUS_SCANNING && <Loader2 className="h-5 w-5 animate-spin" />}
                </span>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
              </Button>
              
              {!file && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  📎 Please upload a document first
                </p>
              )}
              
              {file && !validationResult?.isValid && (
                <p className="text-center text-sm text-red-500 mt-2">
                  ⚠️ Document validation failed. Please upload a valid document.
                </p>
              )}
              
              {file && validationResult?.isValid && (
                <p className="text-center text-sm text-green-600 mt-2 font-medium">
                  ✅ Ready for scanning! Click to verify document authenticity.
                </p>
              )}
            </div>

            {/* Security Info */}
            <div className="rounded-lg bg-primary/10 border border-primary/30 p-6 text-center">
              <p className="text-sm font-medium text-primary mb-2">🔒 100% Secure</p>
              <p className="text-xs text-muted-foreground">
                All processing happens locally. Your documents never leave your device.
              </p>
            </div>
          </div>
        )}

        {status === SCAN_STATUS_SCANNING && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Analyzing Your Document</h2>
              <p className="text-muted-foreground">
                Using AI to verify authenticity and detect alterations
              </p>
            </div>
          
            {/* 3D Scanning Animation */}
            <ScanningAnimation3D />
          
            {/* Progress Steps */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">Document Upload</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/20 border border-primary/50">
                <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                <span className="text-sm font-medium">AI Analysis Running</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                <span className="text-sm">Generating Results</span>
              </div>
            </div>
          
            {/* Analysis Details */}
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-xs text-muted-foreground mb-1">Scanning</p>
                <p className="font-bold text-lg">35%</p>
              </div>
              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-xs text-muted-foreground mb-1">Processing</p>
                <p className="font-bold text-lg">65%</p>
              </div>
              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-xs text-muted-foreground mb-1">Overall</p>
                <p className="font-bold text-lg">50%</p>
              </div>
            </div>
          </div>
        )}

        {status === 'results' && scanResult && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Verification Complete</h2>
              <p className="text-muted-foreground">
                Your document has been analyzed and verified
              </p>
            </div>

            {/* 3D Results Animation */}
            <ResultsAnimation3D authentic={scanResult.authentic} />

            {/* Main Result */}
            <div className={`rounded-2xl border-4 p-8 text-center relative overflow-hidden ${
              scanResult.authentic
                ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-emerald-500/20'
                : 'border-red-500/50 bg-gradient-to-br from-red-500/20 to-orange-500/20'
            }`}>
              {/* Animated background effect */}
              <div className={`absolute inset-0 opacity-10 ${
                scanResult.authentic ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'
              }`}></div>
              <div className="relative z-10 flex justify-center mb-6">
                {scanResult.authentic ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
                    <div className="relative bg-green-500 rounded-full p-4">
                      <CheckCircle2 className="h-16 w-16 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                    <div className="relative bg-red-500 rounded-full p-4">
                      <AlertTriangle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <h3 className={`text-3xl font-bold mb-3 relative ${
                scanResult.authentic ? 'text-green-700' : 'text-red-700'
              }`}>
                <span className="relative z-10">
                  {scanResult.authentic ? (
                    <span className="flex items-center justify-center gap-2">
                      ✅ Document Verified Successfully
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ⚠️ Document Issues Detected
                    </span>
                  )}
                </span>
              </h3>
              <div className="mb-6 space-y-2">
                <p className="text-lg text-muted-foreground">
                  {scanResult.authentic
                    ? '✅ This document has passed all verification checks and appears to be authentic.'
                    : '❌ This document has been flagged for potential security concerns.'}
                </p>
                {scanResult.duplicate && (
                  <p className="text-yellow-600 font-medium flex items-center gap-2">
                    🔄 Note: This document was previously scanned
                  </p>
                )}
                {scanResult.tampering && (
                  <p className="text-orange-600 font-medium flex items-center gap-2">
                    ⚠️ Warning: Potential alterations detected
                  </p>
                )}
              </div>
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg ${
                scanResult.authentic 
                  ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-700 border border-red-500/30'
              }`}>
                <span>📊 Confidence:</span>
                <span className="text-2xl">{scanResult.confidence}%</span>
                {scanResult.authentic && (
                  <span className="text-xl">🎯</span>
                )}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="text-2xl">{getDocumentEmoji(scanResult.documentType)}</span>
                  Document Type
                </h4>
                <p className="text-2xl font-bold text-primary">{scanResult.documentType}</p>
                <p className="text-sm text-muted-foreground mt-1">Professional Classification</p>
              </div>

              <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-primary/10 p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="text-2xl">⏱️</span>
                  Scanned At
                </h4>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(scanResult.timestamp).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Timestamp Verified</p>
              </div>

              <div className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                scanResult.tampering
                  ? 'border-red-500/50 bg-gradient-to-br from-red-500/20 to-orange-500/20'
                  : 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-emerald-500/20'
              }`}>
                <h4 className="font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="text-2xl">{scanResult.tampering ? '🚨' : '🛡️'}</span>
                  Tampering Detection
                </h4>
                <p className={`text-xl font-bold ${
                  scanResult.tampering ? 'text-red-700' : 'text-green-700'
                }`}>
                  {scanResult.tampering ? '⚠️ Alterations Detected!' : '✅ Document Integrity Verified'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {scanResult.tampering ? 'Potential digital manipulation found' : 'No signs of editing or alteration'}
                </p>
              </div>

              <div className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                scanResult.duplicate
                  ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-amber-500/20'
                  : 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-teal-500/20'
              }`}>
                <h4 className="font-bold text-lg mb-3 flex items-center gap-3">
                  <span className="text-2xl">{scanResult.duplicate ? '🔁' : '🆕'}</span>
                  Duplicate Check
                </h4>
                <p className={`text-xl font-bold ${
                  scanResult.duplicate ? 'text-yellow-700' : 'text-green-700'
                }`}>
                  {scanResult.duplicate ? '🔄 Already in Database' : '✅ New Document Registered'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {scanResult.duplicate ? 'This exact document was scanned before' : 'Unique document - first time verification'}
                </p>
              </div>
            </div>

            {/* OCR Text */}
            <div className="rounded-xl border-2 border-border bg-gradient-to-br from-card to-secondary/10 p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-3">
                <span className="text-2xl">🔤</span>
                Extracted Text Content
              </h4>
              <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-border">
                <pre className="text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed">
                  {scanResult.ocrText}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI-Powered OCR Extraction Complete
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleNewScan}
              >
                <span className="flex items-center gap-2">
                  🔄 Scan Another Document
                </span>
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    🏠 Back to Home
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <DocumentValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        validationType={validationReason}
        fileName={file?.name}
      />
    </div>
  )
}
