'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Camera, Leaf, User, X } from 'lucide-react'

interface DocumentValidationModalProps {
  isOpen: boolean
  onClose: () => void
  validationType: 'selfie' | 'nature' | 'noText' | 'tool'
  fileName?: string
}

export function DocumentValidationModal({ 
  isOpen, 
  onClose, 
  validationType,
  fileName 
}: DocumentValidationModalProps) {
  const getModalContent = () => {
    switch (validationType) {
      case 'selfie':
        return {
          title: "📷 Selfie Detected",
          message: "This appears to be a selfie or portrait photo.",
          description: "Please upload official documents like Aadhaar, PAN cards, certificates, or passports. Selfies and personal photos are not accepted for document verification.",
          icon: <Camera className="h-12 w-12 text-orange-500" />,
          color: "from-orange-500 to-red-500"
        }
      case 'nature':
        return {
          title: "🌳 Nature Photo Detected",
          message: "This appears to be a landscape or nature photo.",
          description: "We detected scenic elements like trees, sky, or outdoor scenes. Please upload valid identification documents or certificates for verification.",
          icon: <Leaf className="h-12 w-12 text-green-500" />,
          color: "from-green-500 to-emerald-500"
        }
      case 'noText':
        return {
          title: "📝 No Text Content Found",
          message: "No readable text detected in this image.",
          description: "Valid documents typically contain text, numbers, or official markings. Please ensure you're uploading clear images of actual documents with visible text content.",
          icon: <X className="h-12 w-12 text-red-500" />,
          color: "from-red-500 to-rose-500"
        }
      case 'tool':
        return {
          title: "🔧 Tool/Screenshot Detected",
          message: "This appears to be a tool interface or screenshot.",
          description: "We detected UI elements, toolbars, or software interfaces. Please upload actual physical documents or official digital documents.",
          icon: <User className="h-12 w-12 text-blue-500" />,
          color: "from-blue-500 to-indigo-500"
        }
      default:
        return {
          title: "⚠️ Invalid Document",
          message: "Unsupported document type detected.",
          description: "Please upload valid identification documents, certificates, or official papers.",
          icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />,
          color: "from-yellow-500 to-orange-500"
        }
    }
  }

  const content = getModalContent()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <div className={`bg-gradient-to-br ${content.color} p-1 animate-in zoom-in-90 duration-300`}>
          <div className="bg-background rounded-lg">
            <DialogHeader className="px-6 pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-secondary/50">
                  {content.icon}
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold text-foreground">
                {content.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="px-6 pb-6">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-primary mb-2">
                  {content.message}
                </p>
                <p className="text-muted-foreground">
                  {content.description}
                </p>
                
                {fileName && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      File: <span className="font-medium text-foreground">{fileName}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Try Different Document
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Accepted documents: Aadhaar, PAN, Passports, Certificates, Invoices, Contracts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}