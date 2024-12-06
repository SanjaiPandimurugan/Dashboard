import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaEdit, FaTimes, FaArrowRight, FaBullseye, FaPlus, FaTrash } from 'react-icons/fa';
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
      toast.success('Cycle time updated successfully!', {
        position: "top-right",
        autoClose: 2000
      });
    }
  };

  const handleTargetSubmit = () => {
    if (targetValue) {
      toast.success('Target value updated successfully!', {
        position: "top-right",
        autoClose: 2000
      });
    } else {
      toast.error('Please enter a target value', {
        position: "top-right",
        autoClose: 2000
      });
    }
  };

  const handleSectionSubmit = (section) => {
    toast.success(`${section} updated successfully!`, {
      position: "top-right",
      autoClose: 2000
    });
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
    <div key={entry.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
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

        <div>
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

        <div>
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

        {entry.fault === 'Others' && (
          <div>
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

        {rejectionEntries.length > 1 && (
          <button
            onClick={() => removeRejectionEntry(entry.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
          >
            <FaTrash />
          </button>
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 
                         hover:bg-gray-100 rounded-lg transition duration-300"
              >
                <FaArrowRight className="w-4 h-4" />
                <span>Exit</span>
              </button>
              <button
                onClick={handleSubmitAll}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg 
                         transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Save All Changes
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

      {/* Main Content - remains the same */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Rest of the components remain the same */}
        <CardWrapper className="p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaBullseye className="text-blue-600" />
            Time and Target Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enhanced Cycle Time Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cycle Time (seconds)
              </label>
              <input
                type="text"
                value={cycleTime}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setCycleTime(value);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                         focus:border-blue-500 transition-all duration-200"
                placeholder="Enter cycle time"
              />
            </div>

            {/* Enhanced Target Value Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Value
              </label>
              <input
                type="text"
                value={targetValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setTargetValue(value);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                         focus:border-blue-500 transition-all duration-200"
                placeholder="Enter target value"
              />
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                handleCycleTimeSubmit();
                handleTargetSubmit();
              }}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 
                       hover:from-green-700 hover:to-green-600 text-white 
                       font-medium rounded-lg transition duration-300 
                       min-w-[120px] shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Update Values
            </button>
          </div>
        </CardWrapper>

        <CardWrapper className="p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaTimes className="text-red-500" />
            Rejection Details
          </h3>
          
          <div className="space-y-4">
            {rejectionEntries.map(entry => renderRejectionEntry(entry))}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={addRejectionEntry}
              className="flex items-center gap-2 px-5 py-2.5 text-blue-600 hover:text-blue-700 
                       font-medium transition-colors hover:bg-blue-50 rounded-lg"
            >
              <FaPlus className="animate-bounce" /> Add Another Entry
            </button>
            <button
              onClick={() => handleSectionSubmit('Rejection details')}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 
                       hover:from-green-700 hover:to-green-600 text-white 
                       font-medium rounded-lg transition duration-300 shadow-md 
                       hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Submit Rejection Details
            </button>
          </div>
        </CardWrapper>

        <CardWrapper className="p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaClock className="text-orange-500" />
            Stop Time Details
          </h2>
          <div className="space-y-4">
            {stopTimeEntries.map(entry => renderStopTimeEntry(entry))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={addStopTimeEntry}
              className="flex items-center gap-2 px-5 py-2.5 text-blue-600 hover:text-blue-700 
                       font-medium transition-colors hover:bg-blue-50 rounded-lg"
            >
              <FaPlus className="animate-bounce" /> Add Stop Time Entry
            </button>
            <button
              onClick={() => handleSectionSubmit('Stop time details')}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 
                       hover:from-green-700 hover:to-green-600 text-white 
                       font-medium rounded-lg transition duration-300 shadow-md 
                       hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Submit Stop Time Details
            </button>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CycleTimeDetails;