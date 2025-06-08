'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faTrash, faPencilAlt, faFileExport, 
  faTimes, faCheck, faChevronLeft, faChevronRight, 
  faCalendarAlt, faClock 
} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import styles from './consultation.module.css';
import { format } from 'date-fns';

// Statuses for consultation requests
enum ConsultationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED"
}

// Interface for consultation request
interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedDate: string;
  selectedTime: string;
  attorney: string;
  status: ConsultationStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ConsultationAdmin() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState<Consultation | null>(null);
  
  // Form fields for editing
  const [status, setStatus] = useState<ConsultationStatus>(ConsultationStatus.PENDING);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [attorney, setAttorney] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  // Available attorneys
  const attorneys = [
    'Senior Legal Advisor',
    'Corporate Law Specialist',
    'Tax Attorney',
    'IP Lawyer',
    'Litigation Counsel'
  ];

  // CSV export data
  const csvData = [
    ['Name', 'Email', 'Phone', 'Date', 'Time', 'Attorney', 'Status', 'Created At'],
    ...consultations.map((item) => [
      item.name,
      item.email,
      item.phone,
      new Date(item.selectedDate).toLocaleDateString(),
      item.selectedTime,
      item.attorney,
      item.status,
      new Date(item.createdAt).toLocaleDateString()
    ])
  ];

  useEffect(() => {
    fetchConsultations();
  }, [currentPage, pageSize, searchTerm]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/consultation?page=${currentPage}&limit=${pageSize}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setConsultations(data.data);
        setTotalItems(data.meta.totalCount);
      } else {
        setErrorMessage('Failed to fetch consultation requests');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      setErrorMessage('An error occurred while fetching consultation requests');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/admin/consultation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedRows }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Successfully deleted ${selectedRows.length} consultation requests`);
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsDeleteModalVisible(false);
        setSelectedRows([]);
        fetchConsultations();
      } else {
        setErrorMessage('Failed to delete consultation requests');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting consultation requests:', error);
      setErrorMessage('An error occurred while deleting consultation requests');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleEditConsultation = (consultation: Consultation) => {
    setCurrentConsultation(consultation);
    setStatus(consultation.status as ConsultationStatus);
    setSelectedDate(format(new Date(consultation.selectedDate), 'yyyy-MM-dd'));
    setSelectedTime(consultation.selectedTime);
    setAttorney(consultation.attorney);
    setAdminNotes(consultation.adminNotes || '');
    setIsEditModalVisible(true);
  };

  const handleSaveConsultation = async () => {
    if (!currentConsultation) return;

    try {
      const response = await fetch(`/api/admin/consultation/${currentConsultation.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          selectedDate: new Date(selectedDate).toISOString(),
          selectedTime,
          attorney,
          adminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Consultation request updated successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsEditModalVisible(false);
        fetchConsultations();
      } else {
        setErrorMessage(data.message || 'Failed to update consultation request');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error updating consultation request:', error);
      setErrorMessage('An error occurred while updating consultation request');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status: ConsultationStatus) => {
    const badgeClass = `${styles.statusBadge} ${styles[status.toLowerCase()]}`;
    return <span className={badgeClass}>{status}</span>;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    
    return (
      <div className={styles.pagination}>
        <div className={styles.pageInfo}>
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
        </div>
        <div className={styles.pageButtons}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show pages around current page
            let pageNum = currentPage;
            if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            // Only show valid page numbers
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  className={`${styles.pageButton} ${pageNum === currentPage ? styles.pageButtonActive : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}
          
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Consultation Requests</h1>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <button
            className={`${styles.button} ${styles.danger}`}
            onClick={() => setIsDeleteModalVisible(true)}
            disabled={selectedRows.length === 0}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete ({selectedRows.length})
          </button>
          
          <CSVLink
            data={csvData}
            filename="consultation-requests.csv"
            className={`${styles.button} ${styles.secondary} ${styles.exportButton}`}
          >
            <FontAwesomeIcon icon={faFileExport} className="mr-2" />
            Export CSV
          </CSVLink>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(consultations.map(item => item.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    checked={selectedRows.length === consultations.length && consultations.length > 0}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Attorney</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '24px' }}>
                    No consultation requests found
                  </td>
                </tr>
              ) : (
                consultations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, item.id]);
                          } else {
                            setSelectedRows(selectedRows.filter(id => id !== item.id));
                          }
                        }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      {formatDate(item.selectedDate)} at {item.selectedTime}
                    </td>
                    <td>{item.attorney}</td>
                    <td>{renderStatusBadge(item.status as ConsultationStatus)}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEditConsultation(item)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.delete}`}
                        onClick={() => {
                          setSelectedRows([item.id]);
                          setIsDeleteModalVisible(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {renderPagination()}

      {/* Edit Modal */}
      {isEditModalVisible && currentConsultation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Edit Consultation Request
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsEditModalVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsField}>
                  <div className={styles.detailsLabel}>Name</div>
                  <div className={styles.detailsValue}>{currentConsultation.name}</div>
                </div>
                <div className={styles.detailsField}>
                  <div className={styles.detailsLabel}>Email</div>
                  <div className={styles.detailsValue}>{currentConsultation.email}</div>
                </div>
                <div className={styles.detailsField}>
                  <div className={styles.detailsLabel}>Phone</div>
                  <div className={styles.detailsValue}>{currentConsultation.phone}</div>
                </div>
                <div className={styles.detailsField}>
                  <div className={styles.detailsLabel}>Created</div>
                  <div className={styles.detailsValue}>{formatDate(currentConsultation.createdAt)}</div>
                </div>
                <div className={styles.detailsMessage}>
                  <div className={styles.detailsLabel}>Message</div>
                  <div className={styles.detailsValue}>{currentConsultation.message}</div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <select
                  className={styles.select}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ConsultationStatus)}
                >
                  <option value={ConsultationStatus.PENDING}>Pending</option>
                  <option value={ConsultationStatus.APPROVED}>Approved</option>
                  <option value={ConsultationStatus.COMPLETED}>Completed</option>
                  <option value={ConsultationStatus.CANCELLED}>Cancelled</option>
                  <option value={ConsultationStatus.RESCHEDULED}>Rescheduled</option>
                </select>
              </div>
              
              <div className={styles.dateTimeGroup}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    className={styles.input}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    Time
                  </label>
                  <select
                    className={styles.select}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Attorney</label>
                <select
                  className={styles.select}
                  value={attorney}
                  onChange={(e) => setAttorney(e.target.value)}
                >
                  {attorneys.map(att => (
                    <option key={att} value={att}>{att}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Admin Notes</label>
                <textarea
                  className={styles.textarea}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes about this consultation request"
                ></textarea>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles.secondary}`}
                onClick={() => setIsEditModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.primary}`}
                onClick={handleSaveConsultation}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Confirm Deletion</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsDeleteModalVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                Are you sure you want to delete {selectedRows.length}{' '}
                {selectedRows.length === 1 ? 'consultation request' : 'consultation requests'}? This action cannot be undone.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles.secondary}`}
                onClick={() => setIsDeleteModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.danger}`}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {successMessage && (
        <div className={`${styles.notification} ${styles.success}`}>
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className={`${styles.notification} ${styles.error}`}>
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
