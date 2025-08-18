"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Search,
  MapPin,
  Star,
  Clock,
  Phone,
  ExternalLink,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
  Home,
  Users,
  Pill,
  LayoutDashboard,
  ChevronDown,
  Building2,
} from "lucide-react"
import Link from "next/link"

interface Doctor {
  id: string
  name: string
  specialty: string
  qualification: string
  experience: string
  rating: number
  reviews: number
  location: string
  hospital: string
  consultationFee: string
  availability: string
  languages: string[]
  image: string
}

interface Hospital {
  id: string
  name: string
  type: string
  location: string
  rating: number
  specialties: string[]
  contact: string
  image: string
}

interface Specialty {
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const doctorsRef = useRef<HTMLDivElement>(null)

  const specialties: Specialty[] = [
    {
      name: "Cardiology",
      icon: <Heart className="h-6 w-6" />,
      description: "Heart and cardiovascular system specialists",
      color: "bg-red-100 text-red-800",
    },
    {
      name: "Neurology",
      icon: <Brain className="h-6 w-6" />,
      description: "Brain and nervous system specialists",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Ophthalmology",
      icon: <Eye className="h-6 w-6" />,
      description: "Eye and vision care specialists",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Orthopedics",
      icon: <Bone className="h-6 w-6" />,
      description: "Bone, joint, and muscle specialists",
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "Pediatrics",
      icon: <Baby className="h-6 w-6" />,
      description: "Children's health specialists",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "General Medicine",
      icon: <Activity className="h-6 w-6" />,
      description: "Primary care and general health",
      color: "bg-gray-100 text-gray-800",
    },
  ]

  const sampleDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      qualification: "MD, DM Cardiology",
      experience: "15 years",
      rating: 4.8,
      reviews: 245,
      location: "Salt Lake, Kolkata",
      hospital: "Apollo Gleneagles Hospital",
      consultationFee: "₹800-1200",
      availability: "Mon-Sat 10AM-6PM",
      languages: ["English", "Hindi", "Bengali"],
      image: "/placeholder-user.jpg",
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      specialty: "Neurology",
      qualification: "MD, DM Neurology",
      experience: "12 years",
      rating: 4.9,
      reviews: 189,
      location: "Park Street, Kolkata",
      hospital: "AMRI Hospital",
      consultationFee: "₹900-1500",
      availability: "Tue-Sun 9AM-5PM",
      languages: ["English", "Hindi", "Bengali"],
      image: "/placeholder-user.jpg",
    },
    {
      id: "3",
      name: "Dr. Amit Banerjee",
      specialty: "Ophthalmology",
      qualification: "MS Ophthalmology",
      experience: "18 years",
      rating: 4.7,
      reviews: 312,
      location: "Ballygunge, Kolkata",
      hospital: "Sankara Nethralaya",
      consultationFee: "₹600-1000",
      availability: "Mon-Fri 11AM-7PM",
      languages: ["English", "Bengali", "Hindi"],
      image: "/placeholder-user.jpg",
    },
    {
      id: "4",
      name: "Dr. Sunita Das",
      specialty: "Pediatrics",
      qualification: "MD Pediatrics",
      experience: "10 years",
      rating: 4.6,
      reviews: 156,
      location: "New Town, Kolkata",
      hospital: "Fortis Hospital",
      consultationFee: "₹500-800",
      availability: "Mon-Sat 2PM-8PM",
      languages: ["English", "Bengali"],
      image: "/placeholder-user.jpg",
    },
    {
      id: "5",
      name: "Dr. Vikram Singh",
      specialty: "Orthopedics",
      qualification: "MS Orthopedics",
      experience: "20 years",
      rating: 4.8,
      reviews: 278,
      location: "Howrah, Kolkata",
      hospital: "Belle Vue Clinic",
      consultationFee: "₹700-1100",
      availability: "Mon-Sat 10AM-4PM",
      languages: ["English", "Hindi", "Bengali"],
      image: "/placeholder-user.jpg",
    },
    {
      id: "6",
      name: "Dr. Anita Roy",
      specialty: "General Medicine",
      qualification: "MBBS, MD",
      experience: "8 years",
      rating: 4.5,
      reviews: 134,
      location: "Jadavpur, Kolkata",
      hospital: "Ruby General Hospital",
      consultationFee: "₹400-600",
      availability: "Daily 9AM-9PM",
      languages: ["English", "Bengali", "Hindi"],
      image: "/placeholder-user.jpg",
    },
  ]

  const popularHospitals: Hospital[] = [
    {
      id: "1",
      name: "Apollo Gleneagles Hospital",
      type: "Multi-specialty",
      location: "Salt Lake, Kolkata",
      rating: 4.8,
      specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
      contact: "+91-33-2320-3040",
      image: "/placeholder.jpg",
    },
    {
      id: "2",
      name: "AMRI Hospital",
      type: "Multi-specialty",
      location: "Dhakuria, Kolkata",
      rating: 4.7,
      specialties: ["Neurology", "Cardiology", "Gastroenterology"],
      contact: "+91-33-6606-3800",
      image: "/placeholder.jpg",
    },
    {
      id: "3",
      name: "Fortis Hospital",
      type: "Multi-specialty",
      location: "Anandapur, Kolkata",
      rating: 4.6,
      specialties: ["Pediatrics", "Orthopedics", "Cardiology"],
      contact: "+91-33-6628-4444",
      image: "/placeholder.jpg",
    },
    {
      id: "4",
      name: "Belle Vue Clinic",
      type: "Multi-specialty",
      location: "Alipore, Kolkata",
      rating: 4.5,
      specialties: ["Orthopedics", "General Medicine", "Surgery"],
      contact: "+91-33-2456-7890",
      image: "/placeholder.jpg",
    },
  ]

  const handleSpecialtyClick = (specialtyName: string) => {
    setSelectedSpecialty(specialtyName)
    const specialtyDoctors = sampleDoctors.filter((doctor) => doctor.specialty === specialtyName)
    setFilteredDoctors(specialtyDoctors)

    // Auto-scroll to doctors section
    setTimeout(() => {
      doctorsRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setTimeout(() => {
      const results = sampleDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredDoctors(results)
      setSelectedSpecialty(null)
      setIsSearching(false)

      // Auto-scroll to results
      setTimeout(() => {
        doctorsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 1000)
  }

  const openGoogleSearch = (query: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " Kolkata")}`
    window.open(searchUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header with Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Doctor Assistance</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Users className="h-3 w-3 mr-1" />
                25+ Verified Doctors
              </Badge>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/symptoms">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Symptoms</span>
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <Users className="h-4 w-4" />
              <span>Doctors</span>
            </Button>
            <Link href="/medicines">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <Pill className="h-4 w-4" />
                <span>Medicines</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Qualified Doctors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified healthcare professionals in Kolkata. Search by specialty, location, or doctor name to
            find the right medical expert for your needs.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Doctors
            </CardTitle>
            <CardDescription>Find doctors by name, specialty, hospital, or location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Search for doctors, specialties, or hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Search className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specialties Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Specialty</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Card
                key={specialty.name}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSpecialtyClick(specialty.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${specialty.color}`}>{specialty.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{specialty.name}</h4>
                      <p className="text-sm text-gray-600">{specialty.description}</p>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Doctors Results Section */}
        <div ref={doctorsRef}>
          {(filteredDoctors.length > 0 || selectedSpecialty) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedSpecialty ? `${selectedSpecialty} Specialists` : "Search Results"}
                </h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={doctor.image || "/placeholder-user.jpg"}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">{doctor.name}</h4>
                              <p className="text-sm text-gray-600">{doctor.qualification}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{doctor.rating}</span>
                                <span className="text-xs text-gray-500">({doctor.reviews})</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Stethoscope className="h-4 w-4" />
                              <span>{doctor.specialty}</span>
                              <span>•</span>
                              <span>{doctor.experience} experience</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Building2 className="h-4 w-4" />
                              <span>{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{doctor.availability}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Consultation Fee</p>
                              <p className="text-lg font-bold text-green-600">{doctor.consultationFee}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => openGoogleSearch(`${doctor.name} ${doctor.hospital}`)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View Profile
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openGoogleSearch(`book appointment ${doctor.name} ${doctor.hospital}`)}
                                className="bg-transparent"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                Book
                              </Button>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {doctor.languages.map((language) => (
                              <Badge key={language} variant="secondary" className="text-xs">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popular Hospitals Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Hospitals in Kolkata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openGoogleSearch(`${hospital.name} ${hospital.location}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={hospital.image || "/placeholder.jpg"}
                      alt={hospital.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{hospital.name}</h4>
                          <p className="text-sm text-gray-600">{hospital.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{hospital.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{hospital.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{hospital.contact}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {hospital.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          openGoogleSearch(`${hospital.name} ${hospital.location} contact`)
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Hospital Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Section */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Medical Services
            </CardTitle>
            <CardDescription className="text-red-700">
              For medical emergencies, contact these services immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                <p className="font-semibold text-red-800">Ambulance</p>
                <p className="text-2xl font-bold text-red-600">102</p>
                <Button
                  size="sm"
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  onClick={() => window.open("tel:102", "_self")}
                >
                  Call Now
                </Button>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                <p className="font-semibold text-red-800">Emergency Services</p>
                <p className="text-2xl font-bold text-red-600">108</p>
                <Button
                  size="sm"
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  onClick={() => window.open("tel:108", "_self")}
                >
                  Call Now
                </Button>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                <p className="font-semibold text-red-800">Police Emergency</p>
                <p className="text-2xl font-bold text-red-600">100</p>
                <Button
                  size="sm"
                  className="mt-2 bg-red-600 hover:bg-red-700"
                  onClick={() => window.open("tel:100", "_self")}
                >
                  Call Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
