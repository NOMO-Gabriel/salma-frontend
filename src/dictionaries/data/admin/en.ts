  export const adminEn = {
    common: {
      show: "Show",
      hide: "Hide",
      actions: "Actions",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      refresh: "Refresh",
      search: "Search...",
      filter: "Filter",
      all: "All",
      loading: "Loading...",
      noData: "No data found.",
      confirmTitle: "Are you sure?",
      confirmDelete: "This action cannot be undone.",
      success: "Operation successful",
      error: "An error occurred",
      errorSave: "Error while saving",
      status: "Status",
      date: "Date",
      back: "Back",
      next: "Next",
      prev: "Previous",
      pageOf: "Page {current} of {total}",
      results: "{count} results",
      french: "French",
      english: "English",
      underDevelopment: "Under development",
      anonymous: "Anonymous",
    },
    countries: {
      chine: "China",
      allemagne: "Germany",
    },
    levels: {
      licence: "Bachelor",
      master: "Master",
      doctorat: "PhD",
      postdoc: "Post-Doc",
      formation: "Training",
      autre: "Other",
    },
    statusLabels: {
      publie: "Published",
      brouillon: "Draft",
      archive: "Archived",
      expire: "Expired",
      ouvert: "Open",
      ferme: "Closed",
      urgent: "Urgent",
      en_attente: "Pending",
      nouveau: "New",
      en_cours: "In Progress",
      traite: "Processed",
    },
    dashboard: {
      greetingMorning: "Good morning",
      greetingAfternoon: "Good afternoon",
      greetingEvening: "Good evening",
      subtitle: "Here is an overview of your SALMA platform today.",
      newScholarship: "New Scholarship",
      recentScholarships: {
        title: "Recent Scholarships",
        viewAll: "View all →",
        empty: "No scholarships at the moment."
      },
      recentContacts: {
        title: "Recent Requests",
        viewAll: "View all →",
        empty: "No requests at the moment."
      },
      footer: {
        version: "SALMA Admin v1.0 — AG Technologies",
        backend: "Backend:"
      },
      cards: {
        totalVisitors: "Total Visitors",
        activeScholarships: "Active Scholarships",
        receivedRequests: "Received Requests",
        conversionRate: "Conversion Rate",
        visitorsMonth: "+12% this month",
        totalCount: "{count} total",
        unreadCount: "unread",
        conversionDesc: "visitors → contacts",
      },
      charts: {
        activityTitle: "Activity this week",
        activitySubtitle: "Number of scholarship pages viewed per day",
        viewsLabel: "Scholarship views",
      },
      distribution: {
        title: "Distribution",
        china: "China Scholarships",
        germany: "Germany Scholarships",
      },
      quickActions: {
        title: "Quick Actions",
        addScholarship: "+ Add a scholarship",
        viewContacts: "→ View contacts",
        viewKpi: "📊 View analytics",
      },
    },
    login: {
      brandName: "SALMA",
      brandCompany: "AG Technologies",
      logoInitial: "S",
      emailPlaceholder: "admin@salma.cm",
      passwordPlaceholder: "••••••••••",
      title: "Admin Login",
      subtitle: "Access the SALMA platform management dashboard.",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      submitBtn: "Access Dashboard",
      submitting: "Logging in…",
      secureSystem: "Secure System",
      protectedAccess: "Protected Access — Reserved for AG Technologies administrators",
      quote: "The gateway between Africa and the world's best universities.",
      adminOnly: "Space reserved for platform administrators",
      copyright: "© 2026 SALMA · AG Technologies · Yaoundé, Cameroon",
      stats: {
        students: "Students supported",
        studentsValue: "500+",
        universities: "Partner universities",
        universitiesValue: "25+",
        visas: "Average visa time",
        visasValue: "03 wks.",
        success: "Success rate",
        successValue: "100%"
      }
    },
    scholarships: {
      title: "Scholarship Management",
      addBtn: "Add a scholarship",
      table: {
        thScholarship: "Scholarship",
        thCountry: "Country",
        thLevel: "Level",
        thDeadline: "Deadline",
        thStatus: "Status",
        thVisibility: "Site Visibility", // Changé
        thEmailAlert: "Email Alert", // Changé
        visibilityTooltip: "If enabled, the scholarship is visible to visitors on the public site.",
      },
      filters: {
        searchPlaceholder: "Search for a scholarship...",
        allCountries: "All countries",
        allStatus: "All statuses",
        reset: "Reset"
      },
      modal: {
        editTitle: "Edit Scholarship",
        newTitle: "New Scholarship",
        tabs: {
          info: "Information",
          visibility: "Field Visibility",
          options: "Options"
        },
        fields: {
          titleFr: "Title (FR) *",
          titleEn: "Title (EN)",
          orgFr: "Organization (FR)",
          orgEn: "Organization (EN)",
          destination: "Destination",
          level: "Level",
          coverage: "Coverage",
          status: "Status",
          deadline: "Deadline",
          officialLink: "Official Link",
          descFr: "Description (FR)",
          descEn: "Description (EN)",
          langFr: "Language Req. (FR)",
          langEn: "Language Req. (EN)",
          isFeatured: "Feature on Home",
          isFeaturedDesc: "Display as priority on the homepage",
          image: "Main Image ID", // Ajouté
          imageNote: "Copy the ID from the media library", // Ajouté
          photos: "Photo Gallery",
          photosPlaceholder: "Image IDs (separated by commas)",
          imageSource: "Image Source",
        uploadNew: "Upload a photo",
        selectLibrary: "Choose from library",
        selectedImage: "Selected Image",
        },
        visibilityNote: "⚠️ Control what visitors see on the storefront.",
        visibilityWarning: "Recommended: hidden on storefront",
        btnUpdate: "Update",
        btnCreate: "Create Scholarship",
        saving: "Saving..."
      }
      
    },
    medias: {
      title: "Media Library",
      subtitle: "Manage images used on your platform.",
      uploadBtn: "+ Upload an image",
      uploading: "Uploading...",
      copyLink: "Link copied!",
      confirmDelete: "Permanently delete this image?",
      errorUpload: "Error uploading image.",
      errorDelete: "Error deleting image."
    },
    newsletter: {
      title: "Newsletter & Marketing",
      subtitle: "Manage your prospect base and email campaigns.",
      confirmDeleteSub: "Delete this subscriber?",
      tabs: {
        subscribers: "Subscribers ({count})",
        announcements: "Announcements ({count})"
      },
      table: {
        thSubscriber: "Subscriber",
        thDestination: "Destination",
        thSource: "Source",
      },
      announcements: {
        btnDetails: "Details",
        statusSent: "SENT",
        statusDraft: "DRAFT"
      }
    },
    testimonials: {
      title: "Testimonial Moderation",
      subtitle: "Approve customer reviews to display them on the storefront.",
      labelApproved: "Approved",
      labelVisible: "Visible on Site",
      btnDelete: "Delete",
      confirmDelete: "Permanently delete this testimonial?",
      errorStatus: "Error updating status.",
      errorDelete: "Error deleting testimonial."
    },
    contacts: {
      title: "Contacts & Applications",
      subtitle: "Manage requests received via the contact form.",
      table: {
        thDate: "Date",
        thName: "Name",
        thMessage: "Message",
        thStatus: "Status",
        btnMarkRead: "Mark as read"
      }
    },
    layout: {
      adminTitle: "SALMA Administration",
      loadingAuth: "Checking access…",
      viewSite: "View site",
      logout: "Logout",
      sections: {
        principal: "Main",
        content: "Content",
        intelligence: "Intelligence"
      },
      menu: {
        dashboard: "Dashboard",
        scholarships: "Scholarships",
        contacts: "Contacts & Appt",
        cms: "Pages & CMS",
        medias: "Media Library",
        testimonials: "Testimonials",
        newsletter: "Newsletter",
        chatbot: "Chatbot / FAQ",
        kpi: "KPI & Analytics"
      }
    },
    notifications: {
      title: "Notifications",
      newSingular: "1 new",
      newPlural: "{count} new",
      viewAction: "View {count} unprocessed requests",
      empty: "No new notifications",
    },
    chatbot: {
      title: "Chatbot Intelligence (FAQ)",
      subtitle: "Manage automatic responses for your virtual assistant.",
      newQuestion: "+ New Question",
      categoryDefault: "General",
      statusDisabled: "Disabled",
      btnDeactivate: "Deactivate",
      btnActivate: "Activate",
      btnDelete: "Delete",
      confirmDelete: "Delete this question from the knowledge base?",
      errorUpdate: "Error updating.",
      errorDelete: "Error deleting."
    },
    cms: {
      title: "Content Management (CMS)",
      subtitle: "Select a page to edit its texts.",
      editTitle: "Editing: {name}",
      editSubtitle: "Edit blocks for this page",
      statusPublished: "Published",
      statusDraft: "Draft",
      blocksCount: "{count} Blocks",
      btnEdit: "Edit →",
      btnEditBlock: "Edit text",
      modal: {
        title: "Edit Block",
        labelFr: "French Content",
        labelEn: "English Content",
        labelVisible: "Make this block visible on the site",
        btnCancel: "Cancel",
        btnSave: "Update",
        saving: "Saving...",
        error: "Error updating the block."
      }
    },
    kpi: {
      title: "Analytics & Performance",
      subtitle: "Track your conversion funnel efficiency in real-time.",
      cards: {
        visitors: "Visitors (Today)",
        pageViews: "Page Views",
        contacts: "Contacts Received",
        conversion: "Conversion Rate"
      },
      table: {
        title: "Performance by Scholarship (Top 10)",
        thScholarship: "Scholarship",
        thViews: "Views",
        thConversions: "Conversions",
        thEfficiency: "Efficiency"
    }
  },
  announcementModal: {
      title: "Broadcast Scholarship Alert",
      subtitle: "This announcement will be emailed to all active subscribers.",
      labelSubject: "Email Subject",
      labelContent: "Announcement Message",
      btnSend: "Send Alert Now",
    },
  };