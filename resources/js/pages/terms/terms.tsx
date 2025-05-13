
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsOfService() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true,
    accounts: false,
    content: false,
    prohibited: false,
    intellectual: false,
    liability: false,
    termination: false,
    changes: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">QuickPost Terms of Service</h1>
        <p className="text-muted-foreground">Last Updated: May 1, 2025</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Terms of Service Agreement</CardTitle>
          <CardDescription>Please read these Terms of Service carefully before using QuickPost.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Introduction Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>1. Introduction</span>
                {expandedSections.introduction ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.introduction && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    Welcome to QuickPost, a social media management platform that helps users schedule, publish, and
                    analyze content across multiple social media platforms.
                  </p>
                  <p className="mb-3">
                    By accessing or using QuickPost, you agree to be bound by these Terms of Service and our Privacy
                    Policy. If you disagree with any part of these terms, you may not access the service.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use QuickPost. By accessing or
                    using the Service you agree to be bound by these Terms.
                  </p>
                </div>
              )}
            </div>

            {/* User Accounts Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("accounts")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>2. User Accounts</span>
                {expandedSections.accounts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.accounts && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    When you create an account with us, you must provide accurate, complete, and current information.
                    Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
                    your account.
                  </p>
                  <p className="mb-3">
                    You are responsible for safeguarding the password that you use to access QuickPost and for any
                    activities or actions under your password.
                  </p>
                  <p>
                    You agree not to disclose your password to any third party. You must notify us immediately upon
                    becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>
              )}
            </div>

            {/* Content Policies Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("content")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>3. Content Policies</span>
                {expandedSections.content ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.content && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    Our Service allows you to post, link, store, share and otherwise make available certain information,
                    text, graphics, videos, or other material. You are responsible for the content you post.
                  </p>
                  <p className="mb-3">
                    By posting content to QuickPost, you grant us the right to use, modify, publicly perform, publicly
                    display, reproduce, and distribute such content on and through the Service.
                  </p>
                  <p>
                    You agree that this license includes the right for us to make your content available to other users
                    of the Service, who may also use your content subject to these Terms.
                  </p>
                </div>
              )}
            </div>

            {/* Prohibited Activities Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("prohibited")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>4. Prohibited Activities</span>
                {expandedSections.prohibited ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.prohibited && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">You agree not to use QuickPost for any of the following prohibited activities:</p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>Violating any laws or regulations</li>
                    <li>Posting content that is unlawful, harmful, threatening, abusive, or harassing</li>
                    <li>Impersonating others or providing false information</li>
                    <li>Interfering with or disrupting the Service or servers</li>
                    <li>Collecting user information without permission</li>
                    <li>Using the platform to send spam or unsolicited messages</li>
                    <li>Attempting to bypass any security measures of the Service</li>
                  </ul>
                  <p>
                    We reserve the right to terminate your use of the Service for violating any of the prohibited
                    activities.
                  </p>
                </div>
              )}
            </div>

            {/* Intellectual Property Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("intellectual")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>5. Intellectual Property</span>
                {expandedSections.intellectual ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.intellectual && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    The Service and its original content (excluding content provided by users), features, and
                    functionality are and will remain the exclusive property of QuickPost and its licensors.
                  </p>
                  <p className="mb-3">
                    Our trademarks and trade dress may not be used in connection with any product or service without the
                    prior written consent of QuickPost.
                  </p>
                  <p>
                    You retain any and all of your rights to any content you submit, post, or display on or through
                    QuickPost.
                  </p>
                </div>
              )}
            </div>

            {/* Limitation of Liability Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("liability")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>6. Limitation of Liability</span>
                {expandedSections.liability ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.liability && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    In no event shall QuickPost, nor its directors, employees, partners, agents, suppliers, or
                    affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                  </p>
                  <p className="mb-3">
                    This includes, without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                    resulting from your access to or use of or inability to access or use the Service.
                  </p>
                  <p>
                    QuickPost does not warrant that the Service will be uninterrupted, timely, secure, or error-free.
                  </p>
                </div>
              )}
            </div>

            {/* Termination Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("termination")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>7. Termination</span>
                {expandedSections.termination ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.termination && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any
                    reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p className="mb-3">
                    Upon termination, your right to use the Service will immediately cease. If you wish to terminate
                    your account, you may simply discontinue using the Service.
                  </p>
                  <p>
                    All provisions of the Terms which by their nature should survive termination shall survive
                    termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity,
                    and limitations of liability.
                  </p>
                </div>
              )}
            </div>

            {/* Changes to Terms Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("changes")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>8. Changes to Terms</span>
                {expandedSections.changes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.changes && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
                    provide notice prior to any new terms taking effect.
                  </p>
                  <p className="mb-3">
                    By continuing to access or use our Service after those revisions become effective, you agree to be
                    bound by the revised terms.
                  </p>
                  <p>If you do not agree to the new terms, please stop using the Service.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have any questions about these Terms, please contact us at support@quickpost.com
          </p>
          <div className="flex justify-between w-full">
            <Button variant="outline">
              <a href="/">Return to Home</a>
            </Button>
            <Button>I Accept</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}