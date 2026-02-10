import {
  Building2,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Target,
} from "lucide-react";

export function AboutPage() {
  const achievements = [
    {
      icon: Building2,
      number: "50+",
      label: "Properties Sold",
      color: "text-[#9d8c2d]",
    },
    {
      icon: Users,
      number: "100+",
      label: "Happy Clients",
      color: "text-blue-600",
    },
    {
      icon: Award,
      number: "3+",
      label: "Years Experience",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Client Satisfaction",
      color: "text-purple-600",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide exceptional real estate services that exceed client expectations, delivering quality properties and professional guidance throughout the buying and selling process.",
    },
    {
      icon: CheckCircle2,
      title: "Our Vision",
      description:
        "To be the most trusted and preferred real estate partner in Nigeria, known for integrity, innovation, and outstanding customer service.",
    },
  ];

  const whyChooseUs = [
    "Expert knowledge of local real estate market",
    "Personalized service tailored to your needs",
    "Wide range of premium properties",
    "Transparent and honest transactions",
    "Professional guidance from start to finish",
    "Competitive pricing and flexible payment options",
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative py-20 pb-32 text-white bg-[url('/bg-hero.jpg')] bg-cover bg-center">
        {/* Content with overlay only behind text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Overlay only behind text content */}
          <div className="relative inline-block">
            <div className="absolute inset-0 -inset-x-12 -inset-y-8 bg-gradient-to-r from-black/70 to-black/50 rounded-lg"></div>
            <div className="relative z-10 px-8 py-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Iconic Urban Homes
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Your Trusted Partner in Finding the Perfect Property
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section - overlapping the hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <achievement.icon
                className={`h-12 w-12 mx-auto mb-4 ${achievement.color}`}
              />
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded with a passion for helping people build their dream
                properties, Iconic Urban Homes is growing to become one of the
                most trusted names in Nigerian real estate.
              </p>
              <p>
                With years of experience in the industry, we've successfully
                helped clients invest in properties across Nigeria. Our
                commitment to excellence and customer satisfaction has earned us
                a reputation for reliability and professionalism.
              </p>
              <p>
                We understand that buying property is one of the most important
                decisions you'll make. That's why we're dedicated to providing
                expert guidance, transparent transactions, and personalized
                service every step of the way.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/about-image.jpg"
              alt="Iconic Urban Homes Office"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              onError={(e) => {
                e.currentTarget.src = "/bg-hero.jpg";
              }}
            />
            <div className="absolute -bottom-6 -right-6 bg-primary-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">Proven</div>
              <div className="text-sm">Track Record</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md">
                <value.icon className="h-12 w-12 text-[#9d8c2d] mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose Iconic Urban Homes?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((reason, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <CheckCircle2 className="h-6 w-6 text-[#9d8c2d] flex-shrink-0 mt-1" />
              <span className="text-gray-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative pb-16 text-white bg-[url('/bg-hero.jpg')] bg-cover bg-center py-16">
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

        {/* Content with proper z-index */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 opacity-95 drop-shadow-md">
            Let our experienced team help you every step of the way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="btn bg-white text-[#9d8c2d] hover:bg-gray-100 shadow-lg"
            >
              Browse Properties
            </a>
            <a
              href="/contact"
              className="btn bg-transparent border-2 border-white hover:bg-white/20 backdrop-blur-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
