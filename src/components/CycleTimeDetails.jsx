import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaEdit, FaTimes, FaArrowRight, FaBullseye, FaPlus, FaTrash, FaCheck, FaFileDownload, FaCalendar, FaCheckSquare } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// Add this new function for visual feedback on hover
const CardWrapper = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// Add new breadcrumb component
const Breadcrumb = () => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => navigate('/')}>
      Dashboard
    </span>
    <FaArrowRight className="w-3 h-3" />
    <span className="font-medium text-gray-800">Production Details</span>
  </div>
);

// Success message component for reusability
const SuccessMessage = ({ message }) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                  bg-green-50 border border-green-200 text-green-700 px-4 py-2 
                  rounded-lg shadow-md flex items-center gap-2 
                  animate-fade-in-up">
    <div className="bg-green-100 rounded-full p-1">
      <FaCheck className="w-3 h-3" />
    </div>
    <span className="font-medium text-sm">{message}</span>
  </div>
);

function CycleTimeDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cycleTime: {
      standardCycleTime: 30,
      minimumCycleTime: 25,
      maximumCycleTime: 35,
      targetPartsPerHour: 120,
      targetValue: ''
    }
  });

  const [rejectionEntries, setRejectionEntries] = useState([
    { id: 1, partNumber: '', pieces: '', fault: '', otherFault: '' }
  ]);

  const [stopTimeEntries, setStopTimeEntries] = useState([
    {
      id: 1,
      date: format(new Date(), 'yyyy-MM-dd'),
      fromTime: '',
      toTime: '',
      reason: '',
      otherReason: ''
    }
  ]);

  const partNumberOptions = [
    'PART-001',
    'PART-002',
    'PART-003',
    'PART-004',
    'PART-005'
  ];

  const faultOptions = [
    'Crack',
    'Scratch',
    'Dimensional Error',
    'Surface Defect',
    'Others'
  ];

  const stopReasonOptions = [
    'Power Failure',
    'Machine Breakdown',
    'Material Shortage',
    'Tool Change',
    'Maintenance',
    'Setup Change',
    'Others'
  ];

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [cycleTime, setCycleTime] = useState('360');
  const [targetValue, setTargetValue] = useState('');
  const [cycleTimeSuccess, setCycleTimeSuccess] = useState(false);
  const [targetValueSuccess, setTargetValueSuccess] = useState(false);
  const [rejectionSuccess, setRejectionSuccess] = useState(false);
  const [stopTimeSuccess, setStopTimeSuccess] = useState(false);

  // Add new state for report generation
  const [reportData, setReportData] = useState({
    fromDate: format(new Date(), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd'),
    metrics: {
      availability: false,
      performance: false,
      quality: false
    }
  });

  const [selectedShift, setSelectedShift] = useState('1');

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value.toString());
    setHasChanges(true);
  };

  const handleSave = (section, field) => {
    const newValue = parseFloat(tempValue);
    if (!isNaN(newValue)) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newValue
        }
      }));
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleSubmitAll = () => {
    // Here you can add logic to save all changes to your backend
    alert('All changes saved successfully!');
    setHasChanges(false);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTempValue(value);
    }
  };

  const handleRejectionChange = (id, field, value) => {
    setRejectionEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    setHasChanges(true);
  };

  const addRejectionEntry = () => {
    setRejectionEntries(prev => [
      ...prev,
      { 
        id: Date.now(), 
        partNumber: '', 
        pieces: '', 
        fault: '',
        otherFault: ''
      }
    ]);
  };

  const removeRejectionEntry = (id) => {
    setRejectionEntries(prev => prev.filter(entry => entry.id !== id));
    setHasChanges(true);
  };

  const handleStopTimeChange = (id, field, value) => {
    setStopTimeEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    setHasChanges(true);
  };

  const addStopTimeEntry = () => {
    setStopTimeEntries(prev => [
      ...prev,
      {
        id: Date.now(),
        date: format(new Date(), 'yyyy-MM-dd'),
        fromTime: '',
        toTime: '',
        reason: '',
        otherReason: ''
      }
    ]);
  };

  const removeStopTimeEntry = (id) => {
    setStopTimeEntries(prev => prev.filter(entry => entry.id !== id));
    setHasChanges(true);
  };

  const handleCycleTimeSubmit = () => {
    if (cycleTime) {
      setCycleTimeSuccess(true);
      toast.success('Cycle time updated successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Reset success message after 3 seconds
      setTimeout(() => setCycleTimeSuccess(false), 3000);
    } else {
      toast.error('Please enter a cycle time value', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleTargetSubmit = () => {
    if (targetValue) {
      setTargetValueSuccess(true);
      toast.success('Target value updated successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Reset success message after 3 seconds
      setTimeout(() => setTargetValueSuccess(false), 3000);
    } else {
      toast.error('Please enter a target value', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleSectionSubmit = (section) => {
    if (section === 'Rejection details') {
      setRejectionSuccess(true);
      setTimeout(() => setRejectionSuccess(false), 3000);
    } else if (section === 'Stop time details') {
      setStopTimeSuccess(true);
      setTimeout(() => setStopTimeSuccess(false), 3000);
    }
    toast.success(`${section} updated successfully!`);
  };

  // Handle report generation
  const handleGenerateReport = () => {
    const selectedMetrics = Object.entries(reportData.metrics)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (selectedMetrics.length === 0) {
      toast.error('Please select at least one metric');
      return;
    }

    // Add your report generation logic here
    toast.success('Generating report...');
    console.log('Generating report with:', reportData);
  };

  const renderField = (section, label, field, value, unit, icon) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {icon === 'clock' ? (
            <FaClock className="text-blue-500" />
          ) : (
            <FaBullseye className="text-blue-500" />
          )}
          {label}
        </label>
        {editingField !== field && (
          <button
            onClick={() => handleEdit(field, value)}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FaEdit />
          </button>
        )}
      </div>
      
      {editingField === field ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tempValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
            placeholder="Enter value"
          />
          <button
            onClick={() => handleSave(section, field)}
            className="p-2 text-green-600 hover:text-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div className="text-2xl font-bold text-gray-800">
          {value.toLocaleString()} <span className="text-sm text-gray-500">{unit}</span>
        </div>
      )}
    </div>
  );

  const renderRejectionEntry = (entry) => (
    <div key={entry.id} className="bg-gray-50 p-6 rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Part Number */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Part Number
          </label>
          <select
            value={entry.partNumber}
            onChange={(e) => handleRejectionChange(entry.id, 'partNumber', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select Part Number</option>
            {partNumberOptions.map(part => (
              <option key={part} value={part}>{part}</option>
            ))}
          </select>
        </div>

        {/* Number of Pieces */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pieces
          </label>
          <input
            type="text"
            value={entry.pieces}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d+$/.test(value)) {
                handleRejectionChange(entry.id, 'pieces', value);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="Enter quantity"
          />
        </div>

        {/* Fault Type */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fault Type
          </label>
          <select
            value={entry.fault}
            onChange={(e) => handleRejectionChange(entry.id, 'fault', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select Fault Type</option>
            {faultOptions.map(fault => (
              <option key={fault} value={fault}>{fault}</option>
            ))}
          </select>
        </div>

        {/* Other Fault */}
        {entry.fault === 'Others' && (
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specify Other Fault
            </label>
            <input
              type="text"
              value={entry.otherFault}
              onChange={(e) => handleRejectionChange(entry.id, 'otherFault', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Specify fault"
            />
          </div>
        )}

        {/* Delete Button */}
        {rejectionEntries.length > 1 && (
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={() => removeRejectionEntry(entry.id)}
              className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors 
                       hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-red-500/20"
              title="Remove Entry"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStopTimeEntry = (entry) => (
    <div key={entry.id} className="bg-gray-50 p-6 rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Date Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={entry.date}
            onChange={(e) => handleStopTimeChange(entry.id, 'date', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* From Time Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Time
          </label>
          <input
            type="time"
            value={entry.fromTime}
            onChange={(e) => handleStopTimeChange(entry.id, 'fromTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* To Time Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Time
          </label>
          <input
            type="time"
            value={entry.toTime}
            onChange={(e) => handleStopTimeChange(entry.id, 'toTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Reason Dropdown */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stop Reason
          </label>
          <select
            value={entry.reason}
            onChange={(e) => handleStopTimeChange(entry.id, 'reason', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select Reason</option>
            {stopReasonOptions.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        {/* Other Reason Input */}
        {entry.reason === 'Others' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specify Reason
            </label>
            <input
              type="text"
              value={entry.otherReason}
              onChange={(e) => handleStopTimeChange(entry.id, 'otherReason', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Enter reason"
            />
          </div>
        )}

        {/* Delete Button */}
        {stopTimeEntries.length > 1 && (
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={() => removeStopTimeEntry(entry.id)}
              className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors 
                       hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-red-500/20"
              title="Remove Entry"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* New Enhanced Navigation Header */}
      <div className="bg-white border-b shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <FaClock className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Production Details</h1>
                <Breadcrumb />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 
                         hover:bg-gray-100 rounded-lg transition duration-300"
              >
                <FaArrowRight className="w-4 h-4" />
                <span>Exit</span>
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Last saved: {format(new Date(), 'HH:mm:ss')}</span>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with new background */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <CardWrapper className="p-8 relative bg-white/80 backdrop-blur-sm border border-gray-200/50
                             bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                             from-blue-50/50 via-white to-indigo-50/30">
          <div className="absolute inset-0 bg-grid-blue-500/[0.05] -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20 -z-10 rounded-xl"></div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaBullseye className="text-blue-600" />
            Time and Target Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cycle Time Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600 w-5 h-5" />
                  <h3 className="text-lg font-medium text-gray-800">Cycle Time</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={cycleTime}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setCycleTime(value);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 bg-gray-50/50"
                  placeholder="Enter cycle time"
                />
                
                <button
                  onClick={handleCycleTimeSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                           hover:from-blue-700 hover:to-blue-600 text-white 
                           font-medium rounded-lg transition duration-300 
                           shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <FaClock className="w-4 h-4" />
                  Update Cycle Time
                </button>
              </div>
              
              {cycleTimeSuccess && (
                <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <FaCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Successfully updated cycle time</span>
                </div>
              )}
            </div>

            {/* Target Value Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaBullseye className="text-blue-600 w-5 h-5" />
                  <h3 className="text-lg font-medium text-gray-800">Target Value</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={targetValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setTargetValue(value);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 bg-gray-50/50"
                  placeholder="Enter target value"
                />
                
                <button
                  onClick={handleTargetSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                           hover:from-blue-700 hover:to-blue-600 text-white 
                           font-medium rounded-lg transition duration-300 
                           shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <FaBullseye className="w-4 h-4" />
                  Update Target Value
                </button>
              </div>
              
              {targetValueSuccess && (
                <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <FaCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Successfully updated target value</span>
                </div>
              )}
            </div>
          </div>
        </CardWrapper>

        {/* Combined Stop Time and Rejection Details Section */}
        <CardWrapper className="p-8 relative bg-white/80 backdrop-blur-sm border border-gray-200/50
                             bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                             from-blue-50/50 via-white to-indigo-50/30">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/70">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                <FaTimes className="text-red-500 w-5 h-5" />
              </div>
              <span className="text-xl font-semibold text-gray-800">Stop Time and Rejection Details</span>
            </div>
            
            {/* Shift Selection Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600">SHIFT:</label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 text-sm
                           bg-white shadow-sm"
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
              >
                <option value="1">SHIFT 1</option>
                <option value="2">SHIFT 2</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Rejection Entries */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <FaTimes className="text-blue-500 w-4 h-4" />
                </div>
                Rejection Details
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({rejectionEntries.length} {rejectionEntries.length === 1 ? 'entry' : 'entries'})
                </span>
              </h3>
              <div className="space-y-4">
                {rejectionEntries.map(entry => renderRejectionEntry(entry))}
              </div>
              <button
                onClick={addRejectionEntry}
                className="flex items-center gap-2 px-5 py-2.5 mt-4 text-blue-600 hover:text-blue-700 
                         font-medium transition-all duration-300 hover:bg-blue-50 rounded-lg
                         border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow"
              >
                <FaPlus className="animate-bounce" /> Add Another Rejection Entry
              </button>
            </div>

            {/* Stop Time Entries */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-3">
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                  <FaClock className="text-indigo-500 w-4 h-4" />
                </div>
                Stop Time Details
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({stopTimeEntries.length} {stopTimeEntries.length === 1 ? 'entry' : 'entries'})
                </span>
              </h3>
              <div className="space-y-4">
                {stopTimeEntries.map(entry => renderStopTimeEntry(entry))}
              </div>
              <button
                onClick={addStopTimeEntry}
                className="flex items-center gap-2 px-5 py-2.5 mt-4 text-indigo-600 hover:text-indigo-700 
                         font-medium transition-all duration-300 hover:bg-indigo-50 rounded-lg
                         border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow"
              >
                <FaPlus className="animate-bounce" /> Add Stop Time Entry
              </button>
            </div>
          </div>

          {/* Common Submit Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                handleSectionSubmit('Rejection details');
                handleSectionSubmit('Stop time details');
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                        hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg
                        shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
                        flex items-center gap-2"
            >
              <FaCheck className="w-4 h-4" />
              Submit All Details
            </button>
          </div>

          {/* Success Messages with improved styling */}
          {(rejectionSuccess || stopTimeSuccess) && (
            <div className="absolute bottom-4 right-4 space-y-2">
              {rejectionSuccess && (
                <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-2 
                            rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
                  <div className="bg-green-100 rounded-full p-1">
                    <FaCheck className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-sm">Successfully submitted rejection details</span>
                </div>
              )}
              {stopTimeSuccess && (
                <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-2 
                            rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
                  <div className="bg-green-100 rounded-full p-1">
                    <FaCheck className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-sm">Successfully submitted stop time details</span>
                </div>
              )}
            </div>
          )}
        </CardWrapper>

        {/* Replace Submit All button with Report Generation Box */}
        <CardWrapper className="p-8 relative bg-white/80 backdrop-blur-sm border border-gray-200/50
                             bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                             from-blue-50/50 via-white to-indigo-50/30 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaFileDownload className="text-blue-600" />
            Report Generation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={reportData.fromDate}
                    onChange={(e) => setReportData(prev => ({
                      ...prev,
                      fromDate: e.target.value
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={reportData.toDate}
                    onChange={(e) => setReportData(prev => ({
                      ...prev,
                      toDate: e.target.value
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Metrics Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">Select Metrics</label>
              <div className="space-y-3">
                {['availability', 'performance', 'quality'].map((metric) => (
                  <div key={metric} className="flex items-center gap-3">
                    <div
                      onClick={() => setReportData(prev => ({
                        ...prev,
                        metrics: {
                          ...prev.metrics,
                          [metric]: !prev.metrics[metric]
                        }
                      }))}
                      className={`w-5 h-5 rounded border cursor-pointer transition-colors
                                flex items-center justify-center
                                ${reportData.metrics[metric] 
                                  ? 'bg-blue-600 border-blue-600' 
                                  : 'border-gray-300 hover:border-blue-500'}`}
                    >
                      {reportData.metrics[metric] && (
                        <FaCheckSquare className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700 capitalize">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleGenerateReport}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 
                       hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg
                       transition duration-300 shadow-md hover:shadow-lg
                       flex items-center gap-2"
            >
              <FaFileDownload className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CycleTimeDetails;