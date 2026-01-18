'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2, Download, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScanRecord {
  authentic: boolean
  confidence: number
  ocrText: string
  tampering: boolean
  duplicate: boolean
  documentType: string
  timestamp: string
  fileName: string
}

export default function ScanHistory() {
  const [history, setHistory] = useState<ScanRecord[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]')
    setHistory(storedHistory)
  }, [])

  const deleteScan = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index)
    setHistory(newHistory)
    localStorage.setItem('scanHistory', JSON.stringify(newHistory))
  }

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to delete all scan history?')) {
      setHistory([])
      localStorage.setItem('scanHistory', JSON.stringify([]))
    }
  }

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `docvault-history-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Scan History</h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Scan History</h2>
          <p className="text-muted-foreground">
            All scans are stored locally on your device
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Scan History Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start scanning documents to build your history
            </p>
            <Link href="/scanner">
              <Button>Start Scanning</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Scans</p>
                <p className="text-3xl font-bold text-primary">{history.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Verified</p>
                <p className="text-3xl font-bold text-green-600">
                  {history.filter(h => h.authentic).length}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Flagged</p>
                <p className="text-3xl font-bold text-red-600">
                  {history.filter(h => !h.authentic).length}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg. Confidence</p>
                <p className="text-3xl font-bold text-primary">
                  {history.length > 0
                    ? Math.round(history.reduce((acc, h) => acc + h.confidence, 0) / history.length)
                    : 0}%
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={exportHistory} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export History
              </Button>
              <Button
                variant="outline"
                onClick={clearAllHistory}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>

            {/* Scan List */}
            <div className="space-y-4">
              {history.map((scan, index) => (
                <div
                  key={index}
                  className={`rounded-lg border-2 p-6 transition-colors ${
                    scan.authentic
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-red-500/30 bg-red-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {scan.authentic ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        )}
                        <h3 className="font-semibold text-lg">{scan.fileName}</h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 mb-4">
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">Type:</span>{' '}
                            <span className="font-medium">{scan.documentType}</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Status:</span>{' '}
                            <span className={`font-medium ${scan.authentic ? 'text-green-600' : 'text-red-600'}`}>
                              {scan.authentic ? 'Verified' : 'Flagged'}
                            </span>
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">Confidence:</span>{' '}
                            <span className="font-medium">{scan.confidence}%</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Scanned:</span>{' '}
                            <span className="font-medium">
                              {new Date(scan.timestamp).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3 mb-4">
                        <div className={`rounded p-3 text-sm ${scan.tampering ? 'bg-red-100 dark:bg-red-950' : 'bg-green-100 dark:bg-green-950'}`}>
                          <span className={scan.tampering ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}>
                            {scan.tampering ? '⚠️ Tampering Detected' : '✅ No Tampering'}
                          </span>
                        </div>
                        <div className={`rounded p-3 text-sm ${scan.duplicate ? 'bg-yellow-100 dark:bg-yellow-950' : 'bg-green-100 dark:bg-green-950'}`}>
                          <span className={scan.duplicate ? 'text-yellow-700 dark:text-yellow-300' : 'text-green-700 dark:text-green-300'}>
                            {scan.duplicate ? '🔄 Previously Scanned' : '✅ First Scan'}
                          </span>
                        </div>
                        <div className="rounded bg-primary/10 p-3 text-sm">
                          <span className="text-primary dark:text-primary">
                            📄 {scan.ocrText.split('\n').length} lines extracted
                          </span>
                        </div>
                      </div>

                      {/* OCR Preview */}
                      <details className="cursor-pointer">
                        <summary className="font-medium text-sm text-primary hover:opacity-80">
                          View Extracted Text
                        </summary>
                        <div className="mt-3 bg-muted/50 rounded p-3 text-sm font-mono text-muted-foreground max-h-40 overflow-y-auto">
                          {scan.ocrText}
                        </div>
                      </details>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteScan(index)}
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex gap-4 justify-between mt-8 flex-wrap">
              <Link href="/scanner">
                <Button>Scan New Document</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-3">About Local Storage</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your scan history is stored entirely on your device using browser local storage. You can export, delete, or clear all data at any time. To clear storage completely, use your browser settings or click the &quot;Clear All&quot; button above.
          </p>
        </div>
      </div>
    </div>
  )
}
