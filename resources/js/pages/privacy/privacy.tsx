import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true,
    collection: false,
    usage: false,
    storage: false,
    sharing: false,
    cookies: false,
    rights: false,
    children: false,
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
        <h1 className="text-3xl font-bold mb-2">QuickPost Privacy Policy</h1>
        <p className="text-muted-foreground">Last Updated: May 1, 2025</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>
            This Privacy Policy describes how your personal information is collected, used, and shared when you use
            QuickPost.
          </CardDescription>
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
                    At QuickPost, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our social media management platform.
                  </p>
                  <p className="mb-3">
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy
                    policy, please do not access QuickPost.
                  </p>
                  <p>
                    We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will
                    alert you about any changes by updating the "Last Updated" date of this Privacy Policy.
                  </p>
                </div>
              )}
            </div>

            {/* Information Collection Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("collection")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>2. Information Collection</span>
                {expandedSections.collection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.collection && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">We may collect information about you in various ways, including:</p>
                  <h4 className="font-medium mb-2">Personal Data</h4>
                  <p className="mb-3">
                    When you register for QuickPost, we collect personally identifiable information, such as your:
                  </p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Company information (if applicable)</li>
                    <li>Social media account credentials (with your permission)</li>
                    <li>Payment information</li>
                  </ul>
                  <h4 className="font-medium mb-2">Usage Data</h4>
                  <p className="mb-3">
                    We automatically collect certain information when you visit, use, or navigate QuickPost. This
                    information may include:
                  </p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time and date of your visit</li>
                    <li>Time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Use of Information Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("usage")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>3. Use of Information</span>
                {expandedSections.usage ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.usage && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">We may use the information we collect about you for various purposes:</p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>To provide and maintain QuickPost services</li>
                    <li>To process your transactions and manage your account</li>
                    <li>To send you service-related notifications and updates</li>
                    <li>To respond to your comments, questions, and requests</li>
                    <li>To improve our platform and user experience</li>
                    <li>To monitor usage patterns and analyze trends</li>
                    <li>To detect, prevent, and address technical issues</li>
                    <li>To personalize your experience and deliver tailored content</li>
                    <li>To provide customer support</li>
                  </ul>
                  <p>
                    We may also use your information to communicate with you about products, services, offers, and
                    promotions, where you have consented to receive such communications.
                  </p>
                </div>
              )}
            </div>

            {/* Data Storage and Security Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("storage")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>4. Data Storage and Security</span>
                {expandedSections.storage ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.storage && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    We use commercially reasonable security measures to protect your personal information from
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p className="mb-3">
                    Your data is stored on secure servers and within databases protected by firewalls, encryption, and
                    other security measures. However, no method of transmission over the Internet or electronic storage
                    is 100% secure, and we cannot guarantee absolute security.
                  </p>
                  <p className="mb-3">
                    We retain your personal information only for as long as is necessary for the purposes set out in
                    this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <p>
                    If you request that we delete your account, we will delete your personal information from our active
                    databases. However, some information may be retained in our files to prevent fraud, troubleshoot
                    problems, assist with investigations, and enforce our Terms of Service.
                  </p>
                </div>
              )}
            </div>

            {/* Information Sharing Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("sharing")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>5. Information Sharing</span>
                {expandedSections.sharing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.sharing && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">We may share your information in the following situations:</p>
                  <h4 className="font-medium mb-2">Business Partners and Third-Party Service Providers</h4>
                  <p className="mb-3">
                    We may share your information with third parties that perform services for us or on our behalf,
                    including payment processing, data analysis, email delivery, hosting services, customer service, and
                    marketing assistance.
                  </p>
                  <h4 className="font-medium mb-2">Legal Requirements</h4>
                  <p className="mb-3">
                    We may disclose your information where required to do so by law or in response to valid requests by
                    public authorities (e.g., a court or a government agency).
                  </p>
                  <h4 className="font-medium mb-2">Business Transfers</h4>
                  <p className="mb-3">
                    We may share or transfer your information in connection with, or during negotiations of, any merger,
                    sale of company assets, financing, or acquisition of all or a portion of our business to another
                    company.
                  </p>
                  <h4 className="font-medium mb-2">With Your Consent</h4>
                  <p>We may disclose your personal information for any other purpose with your consent.</p>
                </div>
              )}
            </div>

            {/* Cookies and Tracking Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("cookies")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>6. Cookies and Tracking</span>
                {expandedSections.cookies ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.cookies && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    We use cookies and similar tracking technologies to track activity on QuickPost and hold certain
                    information.
                  </p>
                  <p className="mb-3">
                    Cookies are files with a small amount of data which may include an anonymous unique identifier.
                    Cookies are sent to your browser from a website and stored on your device.
                  </p>
                  <p className="mb-3">We use cookies for the following purposes:</p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>To keep you logged in</li>
                    <li>To remember your preferences</li>
                    <li>To understand how you use our platform</li>
                    <li>To improve our services</li>
                    <li>To personalize your experience</li>
                  </ul>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    However, if you do not accept cookies, you may not be able to use some portions of QuickPost.
                  </p>
                </div>
              )}
            </div>

            {/* User Rights Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("rights")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>7. Your Rights</span>
                {expandedSections.rights ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.rights && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>The right to access the personal information we have about you</li>
                    <li>The right to request correction of inaccurate personal information</li>
                    <li>The right to request deletion of your personal information</li>
                    <li>The right to object to processing of your personal information</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent at any time</li>
                  </ul>
                  <p className="mb-3">
                    If you wish to exercise any of these rights, please contact us using the contact information
                    provided below.
                  </p>
                  <p>
                    Please note that we may ask you to verify your identity before responding to such requests, and we
                    may not be able to comply with your request in all circumstances.
                  </p>
                </div>
              )}
            </div>

            {/* Children's Privacy Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("children")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>8. Children's Privacy</span>
                {expandedSections.children ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.children && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    QuickPost is not intended for children under 16 years of age. We do not knowingly collect personal
                    information from children under 16.
                  </p>
                  <p className="mb-3">
                    If you are a parent or guardian and you are aware that your child has provided us with personal
                    information, please contact us. If we become aware that we have collected personal information from
                    children without verification of parental consent, we take steps to remove that information from our
                    servers.
                  </p>
                </div>
              )}
            </div>

            {/* Changes to Privacy Policy Section */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleSection("changes")}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                <span>9. Changes to Privacy Policy</span>
                {expandedSections.changes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.changes && (
                <div className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <p className="mb-3">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p className="mb-3">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                    Policy are effective when they are posted on this page.
                  </p>
                  <p>
                    Your continued use of QuickPost after we post any modifications to the Privacy Policy will
                    constitute your acknowledgment of the modifications and your consent to abide and be bound by the
                    modified Privacy Policy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at privacy@quickpost.com
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