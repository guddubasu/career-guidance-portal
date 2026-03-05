const domainData = {
  1: {
    title: "BFSI",
    themeColor: "linear-gradient(to right, #1e3a8a, #2563eb)",
    careers: [
      {
        id: "bank-po",
        name: "Bank PO",
        description:
          "Bank Probationary Officers manage customer accounts, loans, and daily banking operations."
      },
      {
        id: "financial-analyst",
        name: "Financial Analyst",
        description:
          "Financial Analysts evaluate investment opportunities and analyze financial data."
      },
      {
        id: "insurance-officer",
        name: "Insurance Officer",
        description:
          "Insurance Officers handle policy approvals, claims, and customer support."
      },
      {
        id: "investment-banker",
        name: "Investment Banker",
        description:
          "Investment Bankers help companies raise capital and manage mergers and acquisitions."
      }
    ]
  },

  2: {
    title: "Defence",
    themeColor: "linear-gradient(to right, #6b8e23, #9acd32)",
    careers: [
      {
        id: "agniveer",
        name: "Agniveer",
        description:
          "Agniveer is recruited under the Agnipath Scheme for 4 years in Indian Armed Forces."
      },
      {
        id: "nda",
        name: "NDA",
        description:
          "NDA trains cadets for Army, Navy and Air Force leadership positions."
      },
      {
        id: "cds",
        name: "CDS",
        description:
          "CDS exam recruits officers into Indian Army, Navy and Air Force."
      },
      {
        id: "crpf-officer",
        name: "CRPF Officer",
        description:
          "CRPF Officers maintain internal security and law enforcement."
      }
    ]
  },

  3: {
    title: "Healthcare",
    themeColor: "linear-gradient(to right, #b91c1c, #ef4444)",
    careers: [
      {
        id: "mbbs",
        name: "MBBS",
        description:
          "MBBS graduates become doctors and provide medical treatment."
      },
      {
        id: "bds",
        name: "BDS",
        description:
          "BDS graduates become dental surgeons."
      },
      {
        id: "nursing",
        name: "Nursing",
        description:
          "Nurses assist doctors and care for patients."
      },
      {
        id: "pharmacist",
        name: "Pharmacist",
        description:
          "Pharmacists dispense medicines and guide patients on usage."
      }
    ]
  },

  4: {
    title: "Law",
    themeColor: "linear-gradient(to right, #7c2d12, #ea580c)",
    careers: [
      {
        id: "advocate",
        name: "Advocate",
        description:
          "Advocates represent clients in courts and legal matters."
      },
      {
        id: "judge",
        name: "Judge",
        description:
          "Judges preside over court cases and deliver judgments."
      },
      {
        id: "corporate-lawyer",
        name: "Corporate Lawyer",
        description:
          "Corporate Lawyers handle business legal issues."
      }
    ]
  },

  5: {
    title: "Education",
    themeColor: "linear-gradient(to right, #065f46, #10b981)",
    careers: [
      {
        id: "school-teacher",
        name: "School Teacher",
        description:
          "School Teachers educate students in various subjects."
      },
      {
        id: "professor",
        name: "Professor",
        description:
          "Professors teach and conduct research in universities."
      },
      {
        id: "principal",
        name: "Principal",
        description:
          "Principals manage school administration."
      }
    ]
  },

  6: {
    title: "Agriculture",
    themeColor: "linear-gradient(to right, #166534, #22c55e)",
    careers: [
      {
        id: "agricultural-officer",
        name: "Agricultural Officer",
        description:
          "Agricultural Officers support farmers and agricultural policies."
      },
      {
        id: "horticulturist",
        name: "Horticulturist",
        description:
          "Horticulturists grow fruits, vegetables and ornamental plants."
      },
      {
        id: "agri-entrepreneur",
        name: "Agri Entrepreneur",
        description:
          "Agri Entrepreneurs start agricultural businesses."
      }
    ]
  },

  7: {
    title: "Hospitality",
    themeColor: "linear-gradient(to right, #78350f, #f59e0b)",
    careers: [
      {
        id: "hotel-manager",
        name: "Hotel Manager",
        description:
          "Hotel Managers oversee hotel operations."
      },
      {
        id: "chef",
        name: "Chef",
        description:
          "Chefs prepare and design food menus."
      },
      {
        id: "tour-manager",
        name: "Tour Manager",
        description:
          "Tour Managers organize travel and tourism activities."
      }
    ]
  },

  8: {
    title: "Engineering",
    themeColor: "linear-gradient(to right, #1f2937, #3b82f6)",
    careers: [
      {
        id: "software-engineer",
        name: "Software Engineer",
        description:
          "Software Engineers design and develop applications."
      },
      {
        id: "civil-engineer",
        name: "Civil Engineer",
        description:
          "Civil Engineers design infrastructure projects."
      },
      {
        id: "mechanical-engineer",
        name: "Mechanical Engineer",
        description:
          "Mechanical Engineers design mechanical systems."
      }
    ]
  },

  9: {
    title: "IT & Computer",
    themeColor: "linear-gradient(to right, #0f172a, #2563eb)",
    careers: [
      {
        id: "web-developer",
        name: "Web Developer",
        description:
          "Web Developers build and maintain websites."
      },
      {
        id: "data-scientist",
        name: "Data Scientist",
        description:
          "Data Scientists analyze data for insights."
      },
      {
        id: "cyber-security-analyst",
        name: "Cyber Security Analyst",
        description:
          "Cyber Security Analysts protect systems from threats."
      }
    ]
  },

  10: {
    title: "Management",
    themeColor: "linear-gradient(to right, #4c1d95, #8b5cf6)",
    careers: [
      {
        id: "mba",
        name: "MBA",
        description:
          "MBA graduates manage business operations."
      },
      {
        id: "hr-manager",
        name: "HR Manager",
        description:
          "HR Managers manage employee recruitment and welfare."
      },
      {
        id: "business-analyst",
        name: "Business Analyst",
        description:
          "Business Analysts evaluate company performance."
      }
    ]
  },

  11: {
    title: "Railways",
    themeColor: "linear-gradient(to right, #374151, #6b7280)",
    careers: [
      {
        id: "station-master",
        name: "Station Master",
        description:
          "Station Masters manage railway stations."
      },
      {
        id: "railway-engineer",
        name: "Railway Engineer",
        description:
          "Railway Engineers maintain railway infrastructure."
      }
    ]
  },

  12: {
    title: "Police",
    themeColor: "linear-gradient(to right, #111827, #1f2937)",
    careers: [
      {
        id: "ips",
        name: "IPS",
        description:
          "IPS officers lead police departments."
      },
      {
        id: "sub-inspector",
        name: "Sub Inspector",
        description:
          "Sub Inspectors supervise police activities."
      }
    ]
  },

  13: {
    title: "Civil Services",
    themeColor: "linear-gradient(to right, #1e40af, #3b82f6)",
    careers: [
      {
        id: "ias",
        name: "IAS",
        description:
          "IAS officers manage administrative services."
      },
      {
        id: "ifs",
        name: "IFS",
        description:
          "IFS officers handle foreign affairs."
      }
    ]
  },

  14: {
    title: "Banking",
    themeColor: "linear-gradient(to right, #0c4a6e, #0284c7)",
    careers: [
      {
        id: "clerk",
        name: "Clerk",
        description:
          "Bank Clerks handle daily banking transactions."
      },
      {
        id: "po",
        name: "PO",
        description:
          "Probationary Officers manage banking operations."
      }
    ]
  },

  15: {
    title: "Research",
    themeColor: "linear-gradient(to right, #581c87, #a855f7)",
    careers: [
      {
        id: "scientist",
        name: "Scientist",
        description:
          "Scientists conduct experiments and research."
      },
      {
        id: "research-assistant",
        name: "Research Assistant",
        description:
          "Research Assistants support scientific studies."
      }
    ]
  },

  16: {
    title: "Sports",
    themeColor: "linear-gradient(to right, #991b1b, #ef4444)",
    careers: [
      {
        id: "athlete",
        name: "Athlete",
        description:
          "Athletes compete in sports professionally."
      },
      {
        id: "coach",
        name: "Coach",
        description:
          "Coaches train athletes."
      }
    ]
  },

  17: {
    title: "Design",
    themeColor: "linear-gradient(to right, #9f1239, #f43f5e)",
    careers: [
      {
        id: "graphic-designer",
        name: "Graphic Designer",
        description:
          "Graphic Designers create visual content."
      },
      {
        id: "ui-ux-designer",
        name: "UI/UX Designer",
        description:
          "UI/UX Designers improve user experience."
      }
    ]
  },

  18: {
    title: "Aviation",
    themeColor: "linear-gradient(to right, #0f766e, #14b8a6)",
    careers: [
      {
        id: "pilot",
        name: "Pilot",
        description:
          "Pilots fly aircraft professionally."
      },
      {
        id: "air-hostess",
        name: "Air Hostess",
        description:
          "Air Hostess ensures passenger safety and comfort."
      }
    ]
  },

  19: {
    title: "Media",
    themeColor: "linear-gradient(to right, #9f1239, #f43f5e)",
    careers: [
      {
        id: "journalist",
        name: "Journalist",
        description:
          "Journalists report news and events."
      },
      {
        id: "news-anchor",
        name: "News Anchor",
        description:
          "News Anchors present news on television."
      },
      {
        id: "content-creator",
        name: "Content Creator",
        description:
          "Content Creators produce digital media content."
      }
    ]
  },

  20: {
    title: "Entrepreneurship",
    themeColor: "linear-gradient(to right, #92400e, #f59e0b)",
    careers: [
      {
        id: "startup-founder",
        name: "Startup Founder",
        description:
          "Startup Founders build and grow new businesses."
      },
      {
        id: "business-owner",
        name: "Business Owner",
        description:
          "Business Owners manage their own companies."
      }
    ]
  }
};

export default domainData;