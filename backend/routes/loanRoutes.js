const express = require('express');
const router = express.Router();
const { uploadLoanDocuments } = require('../middleware/upload');
const LoanApplication = require('../models/LoanApplication');

// Helper function to process uploaded files
const processDocuments = (files) => {
  const documents = {};
  
  if (files) {
    Object.keys(files).forEach(fieldName => {
      const file = files[fieldName][0]; // Get first file for each field
      documents[fieldName] = {
        filename: file.filename,
        path: file.path,
        uploadedAt: new Date()
      };
    });
  }
  
  return documents;
};

// Generate random credit score for demo
const generateCreditScore = () => {
  return Math.floor(Math.random() * (900 - 600 + 1)) + 600;
};

// CREATE - Apply for Home Loan
router.post('/apply/home-loan', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'home-loan',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Home loan application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Home loan application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit home loan application'
    });
  }
});

// CREATE - Apply for Personal Loan
router.post('/apply/personal-loan', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'personal-loan',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Personal loan application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Personal loan application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit personal loan application'
    });
  }
});

// CREATE - Apply for Business Loan
router.post('/apply/business-loan', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'business-loan',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Business loan application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Business loan application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit business loan application'
    });
  }
});

// CREATE - Apply for Short-term Loan
router.post('/apply/short-term-loan', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'short-term-loan',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Short-term loan application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Short-term loan application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit short-term loan application'
    });
  }
});

// CREATE - Apply for Car Loan
router.post('/apply/car-loan', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'car-loan',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Car loan application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Car loan application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit car loan application'
    });
  }
});

// CREATE - Apply for Loan Against Property
router.post('/apply/loan-against-property', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'loan-against-property',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Loan against property application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('Loan against property application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit loan against property application'
    });
  }
});

// CREATE - Apply for OD/CC Limit
router.post('/apply/od-cc-limit', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'od-cc-limit',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'OD/CC limit application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('OD/CC limit application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit OD/CC limit application'
    });
  }
});

// CREATE - Apply for CGTMSE Support
router.post('/apply/cgtmse-support', uploadLoanDocuments, async (req, res) => {
  try {
    const documents = processDocuments(req.files);
    
    const loanApplication = new LoanApplication({
      ...req.body,
      loanType: 'cgtmse-support',
      documents,
      calculatedCreditScore: generateCreditScore()
    });
    
    await loanApplication.save();
    
    res.status(201).json({
      status: 'success',
      message: 'CGTMSE support application submitted successfully',
      data: {
        referenceNumber: loanApplication.referenceNumber,
        applicationId: loanApplication._id,
        status: loanApplication.status
      }
    });
  } catch (error) {
    console.error('CGTMSE support application error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to submit CGTMSE support application'
    });
  }
});

// READ - Get all loan applications (for admin)
router.get('/applications', async (req, res) => {
  try {
    const { status, loanType, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (loanType) query.loanType = loanType;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await LoanApplication.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await LoanApplication.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      data: {
        applications,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch loan applications'
    });
  }
});

// READ - Get single loan application by ID
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan application not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch loan application'
    });
  }
});

// READ - Get loan application by reference number
router.get('/applications/ref/:referenceNumber', async (req, res) => {
  try {
    const application = await LoanApplication.findOne({
      referenceNumber: req.params.referenceNumber
    });
    
    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan application not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch loan application'
    });
  }
});

// UPDATE - Update loan application status (for admin)
router.patch('/applications/:id/status', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const updateData = { status };
    if (adminNotes) updateData.adminNotes = adminNotes;
    
    if (status === 'approved') {
      updateData.approvedAt = new Date();
    } else if (status === 'rejected') {
      updateData.rejectedAt = new Date();
    } else if (status === 'under-review') {
      updateData.reviewedAt = new Date();
    }
    
    const application = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan application not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update application status'
    });
  }
});

// GET - Statistics (for admin dashboard)
router.get('/stats/overview', async (req, res) => {
  try {
    const totalApplications = await LoanApplication.countDocuments();
    const pendingApplications = await LoanApplication.countDocuments({ status: 'pending' });
    const approvedApplications = await LoanApplication.countDocuments({ status: 'approved' });
    const rejectedApplications = await LoanApplication.countDocuments({ status: 'rejected' });
    
    // Get applications by loan type
    const loanTypeStats = await LoanApplication.aggregate([
      {
        $group: {
          _id: '$loanType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$loanAmount' }
        }
      }
    ]);
    
    // Get recent applications
    const recentApplications = await LoanApplication.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .select('referenceNumber fullName loanType loanAmount status submittedAt');
    
    res.status(200).json({
      status: 'success',
      data: {
        overview: {
          total: totalApplications,
          pending: pendingApplications,
          approved: approvedApplications,
          rejected: rejectedApplications
        },
        loanTypeStats,
        recentApplications
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;



