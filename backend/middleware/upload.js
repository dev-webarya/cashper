const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory structure
const createUploadDirs = () => {
  const dirs = [
    'uploads',
    'uploads/aadhar',
    'uploads/pan',
    'uploads/bank-statements',
    'uploads/salary-slips',
    'uploads/photos',
    'uploads/property-documents',
    'uploads/business-documents',
    'uploads/vehicle-documents',
    'uploads/others'
  ];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
};

createUploadDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/others';
    
    // Determine upload path based on field name
    if (file.fieldname.includes('aadhar')) {
      uploadPath = 'uploads/aadhar';
    } else if (file.fieldname.includes('pan')) {
      uploadPath = 'uploads/pan';
    } else if (file.fieldname.includes('bankStatement') || file.fieldname.includes('bank')) {
      uploadPath = 'uploads/bank-statements';
    } else if (file.fieldname.includes('salarySlip') || file.fieldname.includes('salary')) {
      uploadPath = 'uploads/salary-slips';
    } else if (file.fieldname.includes('photo')) {
      uploadPath = 'uploads/photos';
    } else if (file.fieldname.includes('property')) {
      uploadPath = 'uploads/property-documents';
    } else if (file.fieldname.includes('business') || file.fieldname.includes('gst') || file.fieldname.includes('itr')) {
      uploadPath = 'uploads/business-documents';
    } else if (file.fieldname.includes('vehicle') || file.fieldname.includes('rc')) {
      uploadPath = 'uploads/vehicle-documents';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, name);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, PDF, DOC, and DOCX files are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

// Multiple file upload fields
const uploadLoanDocuments = upload.fields([
  { name: 'aadhar', maxCount: 1 },
  { name: 'pan', maxCount: 1 },
  { name: 'bankStatement', maxCount: 3 },
  { name: 'salarySlip', maxCount: 3 },
  { name: 'photo', maxCount: 1 },
  { name: 'propertyDocuments', maxCount: 5 },
  { name: 'businessProof', maxCount: 3 },
  { name: 'gstCertificate', maxCount: 1 },
  { name: 'itrDocuments', maxCount: 3 },
  { name: 'vehicleRC', maxCount: 1 },
  { name: 'vehicleInvoice', maxCount: 1 }
]);

module.exports = {
  upload,
  uploadLoanDocuments
};



