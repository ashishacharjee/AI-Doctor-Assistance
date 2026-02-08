"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Clipboard, Check } from "lucide-react"

function useCopyable(initial: string) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(initial)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // no-op
    }
  }
  return { copied, copy }
}

export default function PresentationPage() {
  // PPT OUTLINE (Slide-by-slide)
  const pptOutline = useMemo(
    () =>
      [
        "Slide 1 — AI Doctor Assistance: Smarter, faster primary care",
        "",
        "• Tagline: Your AI-powered health companion for symptom guidance, medicine insights, doctor discovery, and scanning tools.",
        "• One-liner: A Next.js platform that helps patients understand symptoms, scan prescriptions/QR/barcodes, find doctors/hospitals, and organize care—on web and mobile.",
        "",
        "Slide 2 — The Problem",
        "• Patients struggle to interpret symptoms and medicine labels.",
        "• Scattered healthcare information: doctors, hospitals, and medical content live in different places.",
        "• Lack of immediate guidance leads to anxiety, delays, and poor decisions.",
        "",
        "Slide 3 — Our Solution",
        "• Unified healthcare assistant with: AI symptom guidance, live camera scanning (text OCR, barcodes, QR), medicine search with “used for” insights, and curated doctor/hospital discovery.",
        "• Clear UX separation: lightweight Homepage for quick access; Dashboard for power tools and deep features.",
        "",
        "Slide 4 — Who It Helps",
        "• Patients needing quick clarity on symptoms and medications.",
        "• Caregivers managing multiple family members.",
        "• Users in low-resource settings benefiting from mobile-first scanning and multilingual support (planned).",
        "",
        "Slide 5 — Key Features (Current)",
        "• AI Doctor Chat: Symptom Q&A and health guidance (powered with standardized AI SDK patterns for text generation/streaming).",
        "• Live Camera Scanner: Real-time scan with OCR, QR, barcode support; back camera (non-mirrored) for accurate results.",
        "• Medicine Explorer: Search meds with clear “Used for” indications, dosage, side effects, and precautions.",
        "• Doctors & Hospitals: Specialty-based navigation with auto-scroll, Google Maps/links for quick lookup.",
        "• Health Risk Calculator: Structured intake to assess basic risks and prompt next steps.",
        "",
        "Slide 6 — Recent Enhancements",
        "• Camera mirroring fixed: Defaults to environment (rear) camera for accurate scanning; orientation handled.",
        "• Medicine “Used for” added: Clear, prominent indications with badges and detailed modal.",
        "• Homepage simplified: Advanced sections moved to Dashboard—now faster onboarding and clearer IA.",
        "• Doctors page UX: Auto-scroll to specialty list; reordered specialists above popular hospitals; Google links.",
        "",
        "Slide 7 — User Journeys",
        "1) Scan & Understand: Open scanner → capture label → extract text/barcode → show medicine and “Used for” → provide guidance.",
        "2) Symptom to Action: Describe symptoms → AI guidance → recommended specialties → tap to view doctors/hospitals.",
        "3) Plan Care: Use Dashboard → track tools, scan results, and next steps.",
        "",
        "Slide 8 — Architecture (High-level)",
        "• Frontend: Next.js App Router (React Server Components), Tailwind CSS, shadcn/ui for accessible primitives.",
        "• AI: Vercel AI SDK patterns (generateText/streamText) for chat endpoints and reasoning flows.",
        "• Scanning: Web camera APIs for image capture; client-side processing for OCR/QR/barcode; upgrade path to production OCR libraries.",
        "• Data: Lightweight in-app datasets with scripts for schema/seed; server routes for analysis and future integrations.",
        "",
        "Slide 9 — Tech Stack",
        "• Next.js 15 (App Router), React, TypeScript",
        "• Tailwind CSS, shadcn/ui",
        "• Vercel AI SDK patterns for AI endpoints",
        "• Lucide icons; modern browser APIs",
        "",
        "Slide 10 — Security, Privacy, Compliance (Pragmatic)",
        "• Privacy-first approach: minimal collection by default; no PHI stored unless a user feature requires it.",
        "• Progressive hardening: HTTPS, CSP, SSRF-safe fetch, input validation. Future: audit logs, data retention policies.",
        "• Compliance roadmap: HIPAA-like controls (if/when handling PHI) with encryption-at-rest, access controls, and BAA-ready hosting.",
        "",
        "Slide 11 — Accessibility & Performance",
        "• shadcn/ui + semantic HTML for accessible components; ARIA labels, keyboard nav, focus states.",
        "• Performance: Code-splitting, Server Components where applicable, image optimization, minimal JS for fast TTI.",
        "",
        "Slide 12 — KPIs & Metrics",
        "• Time-to-clarity (from symptom input/scan to recommended action).",
        "• First session success rate (user finds doctor/medicine info without bouncing).",
        "• Scanner accuracy and successful parse rate.",
        "• AI chat helpfulness (thumbs up/down, follow-up rate).",
        "",
        "Slide 13 — Demo Script (5 minutes)",
        "1) Homepage: Simple hero → tap “Scan” or “Ask AI”.",
        "2) Live Scanner: Show rear camera feed; scan barcode/label; OCR output appears; medicine auto-detected.",
        "3) Medicine Details: “Used for” badges, dosage, side effects; open details modal.",
        "4) Doctors: Pick a specialty → auto-scroll to list → open Google link for directions.",
        "5) Dashboard: All advanced tools—AI chat, interactive tools, comprehensive health modules.",
        "",
        "Slide 14 — Business Value",
        "• Reduce uncertainty with immediate guidance → higher patient confidence.",
        "• Increase conversion to appointments and telemedicine.",
        "• Scalable content engine via AI + structured medical references.",
        "",
        "Slide 15 — Risks & Mitigations",
        "• OCR variance on low-end devices → mitigation: offline/edge OCR and quality checks.",
        "• AI hallucinations → mitigation: strong system prompts, retrieval grounding, and safety rails; human-in-the-loop for critical flows.",
        "• Regulatory scope creep → mitigation: phased rollouts; non-diagnostic labeling; partner with clinicians.",
        "",
        "Slide 16 — Roadmap (Selected)",
        "• Authentication & Profiles, Appointment booking, Telemedicine visits, Health records.",
        "• OCR upgrades: offline capability, multi-language OCR (including Hindi), image quality checks.",
        "• Pharmacy locator, medicine reminders, interaction checker, pill identifier.",
        "• Insurance integration and claim flows; govt. hospital integration.",
        "• Multilingual support (Hindi and beyond), doctor reviews system.",
        "",
        "Slide 17 — Call to Action",
        "• Pilot with partner clinics and pharmacies.",
        "• Gather accuracy and usability metrics.",
        "• Scale to additional geographies and languages.",
      ].join("\n"),
    [],
  )

  // INTERVIEW SCRIPT (tailored from the provided structure)
  const interviewScript = useMemo(
    () =>
      [
        "1) Problem / Objective",
        "The goal was to give patients instant, reliable guidance for symptoms and medicines, while unifying scattered healthcare tasks into one place (scan, search, find doctors, plan care). Many users struggle with interpreting labels, choosing the right specialist, and navigating multiple websites—leading to delays and anxiety.",
        "",
        "2) My Role",
        "I led end-to-end product development: UX architecture (homepage vs. dashboard), live camera scanning (OCR/QR/barcode), medicine intelligence (“Used for” clarity), AI chat integration, and doctors/hospitals discovery improvements (auto-scroll, Google links). I also drove performance, accessibility, and a clean design system using shadcn/ui and Tailwind.",
        "",
        "3) Data",
        "I worked with a structured medicine dataset (name, form, strength, indications, dosage, side effects, precautions) and curated lists of doctors/hospitals by specialty. For AI chat, prompts and structured outputs convert free-text symptoms into suggested next steps. The system includes SQL scripts and server routes to support future integrations and seeding.",
        "",
        "4) Tools & Techniques",
        "• Next.js App Router (React Server Components) for modern routing and performance.",
        "• Tailwind CSS + shadcn/ui for accessible, consistent UI components.",
        "• Vercel AI SDK patterns (generateText/streamText) for chat/AI endpoints, enabling fast iteration and streaming UX.",
        "• Web camera APIs for capture; client-side parsing for OCR/QR/barcode with a roadmap to production OCR.",
        "• TypeScript throughout; modular components; state isolation for Scanner and Medicine flows.",
        "",
        "5) Process",
        "• Clarified IA: simplified homepage; moved advanced sections (Talk to AI, Comprehensive Solutions, Interactive Tools) to Dashboard.",
        "• Implemented scanning: fixed mirrored camera by forcing environment camera; tuned orientation and capture pipeline.",
        "• Enhanced medicine results: added “Used for” badges and detailed modal (dosage, side effects, precautions).",
        "• Improved doctors page: auto-scroll to list on specialty selection; helpful Google links; specialist-first layout.",
        "• Added risk calculator; structured server routes; performance and accessibility passes.",
        "",
        "6) Key Insights",
        "• Users value immediate clarity: “Used for” surfaced early reduces confusion.",
        "• Rear-camera default prevents mirrored text issues and increases successful OCR/scan rates.",
        "• Clear IA (homepage for quick access, dashboard for power features) lowers cognitive load.",
        "",
        "7) Business Impact",
        "• Increased likelihood of conversion to doctor discovery and telemedicine booking by offering guided journeys.",
        "• Faster time-to-clarity from scan/symptom to recommended action boosts satisfaction and retention.",
        "• Foundation for monetization: appointments, telemedicine, pharmacy affiliate flows, and premium reminders.",
        "",
        "8) Challenges & Learnings",
        "• Camera parity across devices: fixed mirror/orientation and provided graceful fallbacks.",
        "• Avoiding AI overreach: clear non-diagnostic language, user education, and a roadmap to retrieval grounding.",
        "• Information architecture matters: moving dense content to Dashboard significantly improved perceived simplicity.",
        "",
        "Bonus: Tailor to the Role",
        "For a product/engineering role, I emphasize user impact (time-to-clarity), stack choices (Next.js + AI SDK patterns), and robust UX in constrained environments (mobile camera, low light). For data roles, I highlight structured medicine schemas, evaluation of scanner accuracy, and safe prompts for AI.",
        "",
        "60-Second Pitch",
        "AI Doctor Assistance helps you understand symptoms and medicines instantly. It scans labels and barcodes, clarifies “used for,” guides you to the right specialist, and streamlines care via a clean Dashboard. Built with Next.js, Tailwind, and standardized AI SDK patterns, it’s fast, accessible, and ready to scale.",
      ].join("\n"),
    [],
  )

  // ONE-PAGER (optional handout)
  const onePager = useMemo(
    () =>
      [
        "AI Doctor Assistance — One Pager",
        "",
        "What it is",
        "• A web platform that helps users quickly interpret symptoms and medicines, scan labels/QR/barcodes, and find relevant doctors and hospitals.",
        "",
        "Why it matters",
        "• Reduces anxiety and time-to-clarity by turning raw inputs (text, camera scans) into understandable guidance and next steps.",
        "",
        "What’s included",
        "• AI Doctor Chat, Live Camera Scanner (OCR/QR/barcode), Medicine “Used for” insights, Doctors/Hospitals discovery with Google links, Health Risk Calculator, and a powerful Dashboard.",
        "",
        "Recent wins",
        "• Fixed camera mirroring (rear camera by default).",
        "• Added “Used for” to medicine results and detailed information modal.",
        "• Simplified homepage, moved advanced sections to Dashboard.",
        "• Doctors page UX polish: auto-scroll, specialist-first ordering.",
        "",
        "Tech & Architecture",
        "• Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui.",
        "• AI endpoints follow standardized AI SDK patterns for text generation and streaming.",
        "• Modern browser camera APIs; upgrade path to production-grade OCR.",
        "",
        "KPIs",
        "• Time-to-clarity, scan parse success rate, AI helpfulness, conversion to doctor discovery/appointments.",
        "",
        "Roadmap (selected)",
        "• Auth, appointment booking, telemedicine, health records, multilingual (incl. Hindi), offline/multi-language OCR, pharmacy locator, medicine reminders, interaction checker, pill identifier, insurance and government hospital integrations, doctor reviews, analytics dashboards.",
      ].join("\n"),
    [],
  )

  const { copied: copiedPPT, copy: copyPPT } = useCopyable(pptOutline)
  const { copied: copiedInterview, copy: copyInterview } = useCopyable(interviewScript)
  const { copied: copiedOnePager, copy: copyOnePager } = useCopyable(onePager)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Presentation & Interview Pack</h1>
        <p className="text-muted-foreground mt-2">
          Copy-ready content for your PPT, interview, and one-pager about the AI Doctor Assistance platform.
        </p>
      </header>

      <Tabs defaultValue="ppt">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ppt">PPT Outline</TabsTrigger>
          <TabsTrigger value="interview">Interview Script</TabsTrigger>
          <TabsTrigger value="onepager">One-Pager</TabsTrigger>
        </TabsList>

        <TabsContent value="ppt" className="mt-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>PPT Outline (Slide-by-slide)</CardTitle>
              <Button variant="outline" size="sm" onClick={copyPPT}>
                {copiedPPT ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                {copiedPPT ? "Copied" : "Copy all"}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea value={pptOutline} readOnly className="min-h-[520px] font-mono text-sm" />
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                Note: AI chat endpoints use standardized AI SDK patterns for generation and streaming to enable
                real-time UX.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="mt-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Interview Script (Tailored)</CardTitle>
              <Button variant="outline" size="sm" onClick={copyInterview}>
                {copiedInterview ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                {copiedInterview ? "Copied" : "Copy all"}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea value={interviewScript} readOnly className="min-h-[520px] font-mono text-sm" />
              <Separator className="my-4" />
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Keep it to 3–5 minutes. Use the Demo Script slide for structure.</li>
                <li>Quantify outcomes if you have usage data (scanner accuracy, time-to-clarity).</li>
                <li>End with risk framing, mitigations, and a crisp ask.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onepager" className="mt-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>One-Pager (Handout)</CardTitle>
              <Button variant="outline" size="sm" onClick={copyOnePager}>
                {copiedOnePager ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                {copiedOnePager ? "Copied" : "Copy all"}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea value={onePager} readOnly className="min-h-[360px] font-mono text-sm" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="mt-10 text-xs text-muted-foreground">
        <p>
          Architecture note: We follow standardized AI SDK patterns like generateText and streamText for AI endpoints to
          provide consistent APIs and streaming behavior for chat. This enables fast iteration and multi-model support
          as needed.
        </p>
      </section>
    </main>
  )
}
