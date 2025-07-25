"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stethoscope, MapPin, Star, Phone, Clock, Calendar, Navigation } from "lucide-react"
import Link from "next/link"

export default function DoctorsPage() {
  const [pincode, setPincode] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [doctors, setDoctors] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [useLocation, setUseLocation] = useState(false)

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      setUseLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding to get pincode
          setPincode("700001") // Mock pincode for Kolkata
          setUseLocation(false)
          handleSearch()
        },
        (error) => {
          console.error("Location access denied:", error)
          setUseLocation(false)
          alert("Location access denied. Please enter pincode manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const handleSearch = async () => {
    if (!pincode.trim() && !useLocation) return

    setIsSearching(true)

    // Simulate doctor search with location-specific results
    setTimeout(() => {
      const getDoctorsByPincode = (pincode: string) => {
        const pincodePrefix = pincode.substring(0, 3)

        // Different doctors for different regions
        const doctorsByRegion: { [key: string]: any[] } = {
          // West Bengal (700xxx)
          "700": [
            {
              name: "Dr. Subrata Banerjee",
              specialty: "Internal Medicine",
              rating: 4.8,
              reviews: 156,
              experience: "15 years",
              location: "Apollo Gleneagles Hospital",
              address: "58, Canal Circular Road, Kadapara, Kolkata, West Bengal 700054",
              phone: "+91-33-2320-3040",
              distance: "1.2 km",
              availability: "Next available: Tomorrow 2:00 PM",
              languages: ["English", "Hindi", "Bengali"],
              education: "MBBS from Medical College Kolkata, MD Internal Medicine",
              certifications: ["Board Certified Internal Medicine", "ACLS Certified"],
              consultationFee: "₹600",
              pincode: "700054",
            },
            {
              name: "Dr. Priya Chatterjee",
              specialty: "Cardiology",
              rating: 4.9,
              reviews: 203,
              experience: "18 years",
              location: "Fortis Hospital Kolkata",
              address: "730, Anandapur, E M Bypass Rd, Anandapur, Kolkata, West Bengal 700107",
              phone: "+91-33-6628-4444",
              distance: "2.1 km",
              availability: "Next available: Today 4:30 PM",
              languages: ["English", "Hindi", "Bengali"],
              education: "MBBS from IPGMER Kolkata, DM Cardiology",
              certifications: ["Board Certified Cardiology", "Interventional Cardiology"],
              consultationFee: "₹1000",
              pincode: "700107",
            },
          ],
          // Mumbai (400xxx)
          "400": [
            {
              name: "Dr. Rajesh Mehta",
              specialty: "Family Medicine",
              rating: 4.7,
              reviews: 89,
              experience: "12 years",
              location: "Lilavati Hospital",
              address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
              phone: "+91-22-2675-1000",
              distance: "0.8 km",
              availability: "Next available: Tomorrow 10:15 AM",
              languages: ["English", "Hindi", "Marathi"],
              education: "MBBS from Grant Medical College Mumbai",
              certifications: ["Board Certified Family Medicine", "Pediatric Care"],
              consultationFee: "₹800",
              pincode: "400050",
            },
          ],
          // Delhi (110xxx)
          "110": [
            {
              name: "Dr. Arjun Singh",
              specialty: "Internal Medicine",
              rating: 4.8,
              reviews: 134,
              experience: "20 years",
              location: "AIIMS Delhi",
              address: "Ansari Nagar, New Delhi, Delhi 110029",
              phone: "+91-11-2658-8500",
              distance: "1.5 km",
              availability: "Next available: Friday 11:00 AM",
              languages: ["English", "Hindi"],
              education: "MBBS, MD from AIIMS Delhi",
              certifications: ["Board Certified Internal Medicine", "Critical Care"],
              consultationFee: "₹500",
              pincode: "110029",
            },
          ],
          // Bangalore (560xxx)
          "560": [
            {
              name: "Dr. Lakshmi Narasimhan",
              specialty: "Dermatology",
              rating: 4.6,
              reviews: 98,
              experience: "14 years",
              location: "Manipal Hospital",
              address: "98, Rustom Bagh, Airport Road, Bangalore, Karnataka 560017",
              phone: "+91-80-2502-4444",
              distance: "1.8 km",
              availability: "Next available: Monday 3:00 PM",
              languages: ["English", "Hindi", "Kannada"],
              education: "MBBS, MD Dermatology from Bangalore Medical College",
              certifications: ["Board Certified Dermatology", "Cosmetic Dermatology"],
              consultationFee: "₹750",
              pincode: "560017",
            },
          ],
        }

        return (
          doctorsByRegion[pincodePrefix] || [
            {
              name: "Dr. Generic Doctor",
              specialty: "General Medicine",
              rating: 4.5,
              reviews: 50,
              experience: "10 years",
              location: "Local Clinic",
              address: `Near ${pincode} area`,
              phone: "+91-XXX-XXX-XXXX",
              distance: "2.0 km",
              availability: "Next available: Call for appointment",
              languages: ["English", "Hindi"],
              education: "MBBS from Local Medical College",
              certifications: ["General Practice"],
              consultationFee: "₹400",
              pincode: pincode,
            },
          ]
        )
      }

      const nearbyDoctors = getDoctorsByPincode(pincode)
      setDoctors(nearbyDoctors)
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/symptoms" className="text-gray-600 hover:text-blue-600">
              Symptoms
            </Link>
            <Link href="/medicines" className="text-gray-600 hover:text-blue-600">
              Medicines
            </Link>
            <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:102", "_self")}>
              🚑 Emergency
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Healthcare Specialists in India</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find qualified doctors and specialists in your area based on pincode, specialty, and insurance preferences
              across India.
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search for Doctors</CardTitle>
              <CardDescription>Filter by pincode, specialty, and other preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Pincode</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter 6-digit pincode (e.g., 700001)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLocationAccess}
                      disabled={useLocation}
                      className="flex-shrink-0 bg-transparent"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {useLocation ? "Getting location..." : "Or click location icon to auto-detect"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Specialty</label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family-medicine">Family Medicine</SelectItem>
                      <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="gynecology">Gynecology</SelectItem>
                      <SelectItem value="ent">ENT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSearch} disabled={isSearching || (!pincode && !useLocation)} className="w-full">
                {isSearching ? "Searching..." : "Find Doctors"}
              </Button>
            </CardContent>
          </Card>

          {/* Doctor Results */}
          {doctors.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Available Doctors ({doctors.length} found)</h3>

              {doctors.map((doctor, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-blue-900">{doctor.name}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {doctor.specialty} • {doctor.experience} experience
                        </CardDescription>

                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                          </div>
                          <Badge variant="secondary" className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {doctor.distance}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">Consultation: {doctor.consultationFee}</Badge>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {doctor.availability}
                        </Badge>
                        <div className="flex flex-col space-y-2 lg:items-end">
                          <Button size="sm" className="w-full lg:w-auto">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Appointment
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full lg:w-auto bg-transparent"
                            onClick={() => window.open(`tel:${doctor.phone}`, "_self")}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Location & Contact */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Location</h5>
                        <p className="text-sm text-gray-700">{doctor.location}</p>
                        <p className="text-sm text-gray-500">{doctor.address}</p>
                        <p className="text-sm text-blue-600 mt-1">{doctor.phone}</p>
                        <p className="text-xs text-gray-500">Pincode: {doctor.pincode}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Languages</h5>
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((lang: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Education & Certifications */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Education & Certifications</h5>
                      <p className="text-sm text-gray-700 mb-2">{doctor.education}</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.certifications.map((cert: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Specialty Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Popular Specialties in India</CardTitle>
              <CardDescription>Quick access to commonly searched medical specialties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Family Medicine",
                  "Internal Medicine",
                  "Cardiology",
                  "Dermatology",
                  "Orthopedics",
                  "Pediatrics",
                  "Gynecology",
                  "ENT",
                ].map((spec, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start bg-transparent"
                    onClick={() => {
                      setSpecialty(spec.toLowerCase().replace(" ", "-"))
                      if (pincode) handleSearch()
                    }}
                  >
                    <div>
                      <div className="font-medium">{spec}</div>
                      <div className="text-xs text-gray-500 mt-1">Find specialists</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Section */}
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-sm font-bold">!</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-2">Medical Emergency?</h4>
                  <p className="text-red-800 text-sm mb-3">
                    For immediate medical assistance, contact emergency services or visit the nearest hospital.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.open("tel:102", "_self")}
                    >
                      🚑 Call 102 (Ambulance)
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.open("tel:108", "_self")}
                    >
                      🚑 Call 108 (Emergency)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
