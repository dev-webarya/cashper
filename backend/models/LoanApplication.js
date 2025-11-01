const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  // Loan Type
  loanType: {
    type: String,
    required: true,
    enum: ['home-loan', 'personal-loan', 'business-loan', 'short-term-loan', 'car-loan', 'loan-against-property', 'od-cc-limit', 'cgtmse-support']
  },
  
  // Reference Number
  referenceNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Loan Details
  loanAmount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  employment: {
    type: String,
    required: true
  },
  monthlyIncome: {
    type: Number,
    required: true
  },
  
  // KYC Details
  panNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  aadharNumber: {
    type: String,
    required: true,
    trim: true
  },
  
  // Address Information
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  
  // Employment Details
  companyName: {
    type: String,
    trim: true
  },
  workExperience: {
    type: String,
    trim: true
  },
  
  // Credit Information
  creditScore: {
    type: String,
    trim: true
  },
  
  // Documents
  documents: {
    aadhar: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    pan: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    bankStatement: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    salarySlip: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    photo: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    propertyDocuments: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    businessProof: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    gstCertificate: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    itrDocuments: {
      filename: String,
      path: String,
      uploadedAt: Date
    }
  },
  
  // Additional Fields for Specific Loan Types
  propertyValue: Number,
  propertyAddress: String,
  propertyType: String,
  
  businessName: String,
  businessType: String,
  businessAge: String,
  annualTurnover: Number,
  gstNumber: String,
  
  vehicleType: String,
  vehicleModel: String,
  vehiclePrice: Number,
  downPayment: Number,
  
  existingLimit: Number,
  requiredLimit: Number,
  bankName: String,
  accountNumber: String,
  
  projectCost: Number,
  ownContribution: Number,
  subsidyRequired: String,
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'documents-required'],
    default: 'pending'
  },
  
  // CIBIL/Credit Score (calculated/fetched)
  calculatedCreditScore: {
    type: Number,
    min: 300,
    max: 900
  },
  
  // Admin Notes
  adminNotes: {
    type: String
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  approvedAt: Date,
  rejectedAt: Date,
  
  // User Reference (if authentication is implemented)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
loanApplicationSchema.index({ referenceNumber: 1 });
loanApplicationSchema.index({ email: 1 });
loanApplicationSchema.index({ phone: 1 });
loanApplicationSchema.index({ status: 1 });
loanApplicationSchema.index({ loanType: 1 });
loanApplicationSchema.index({ submittedAt: -1 });

// Generate reference number before saving
loanApplicationSchema.pre('save', function(next) {
  if (!this.referenceNumber) {
    const prefix = this.loanType.split('-').map(word => word[0].toUpperCase()).join('');
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.referenceNumber = `${prefix}-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);



