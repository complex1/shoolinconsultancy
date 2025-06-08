'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPencilAlt, faFileExport, faTimes, faCheck, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import styles from './newsletter.module.css';
import AdminLayout from '../adminLayout';

interface Newsletter {
  id: string;
  email: string;
  joinedAt: string;
  isSubscribed: boolean;
  updatedAt: string;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentSubscriber, setCurrentSubscriber] = useState<Newsletter | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editSubscribed, setEditSubscribed] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // CSV export data
  const csvData = [
    ['Email', 'Subscription Date', 'Status', 'Last Updated'],
    ...subscribers.map((item) => [
      item.email,
      new Date(item.joinedAt).toLocaleDateString(),
      item.isSubscribed ? 'Subscribed' : 'Unsubscribed',
      new Date(item.updatedAt).toLocaleDateString()
    ])
  ];

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, pageSize, searchTerm]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/newsletter?page=${currentPage}&limit=${pageSize}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setSubscribers(data.data);
        setTotalItems(data.meta.totalCount);
      } else {
        setErrorMessage('Failed to fetch newsletter subscribers');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setErrorMessage('An error occurred while fetching subscribers');
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
      const response = await fetch('/api/admin/newsletter', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedRows }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Successfully deleted ${selectedRows.length} subscribers`);
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsDeleteModalVisible(false);
        setSelectedRows([]);
        fetchSubscribers();
      } else {
        setErrorMessage('Failed to delete subscribers');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting subscribers:', error);
      setErrorMessage('An error occurred while deleting subscribers');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleEdit = async () => {
    if (!currentSubscriber) return;

    try {
      const response = await fetch(`/api/admin/newsletter/${currentSubscriber.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: editEmail,
          isSubscribed: editSubscribed
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Subscriber updated successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsEditModalVisible(false);
        fetchSubscribers();
      } else {
        setErrorMessage(data.message || 'Failed to update subscriber');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error updating subscriber:', error);
      setErrorMessage('An error occurred while updating subscriber');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const openEditModal = (subscriber: Newsletter) => {
    setCurrentSubscriber(subscriber);
    setEditEmail(subscriber.email);
    setEditSubscribed(subscriber.isSubscribed);
    setIsEditModalVisible(true);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(rowId => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === subscribers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(subscribers.map(sub => sub.id));
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        {/* Notification Messages */}
        {errorMessage && (
          <div className={styles.notification + ' ' + styles.error}>
            {errorMessage}
            <button onClick={() => setErrorMessage(null)} className={styles.closeBtn}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className={styles.notification + ' ' + styles.success}>
            {successMessage}
            <button onClick={() => setSuccessMessage(null)} className={styles.closeBtn}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}

        <div className={styles.header}>
          <h1>Newsletter Subscribers</h1>
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by email"
                className={styles.searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchTerm && (
                <button
                  className={styles.clearBtn}
                  onClick={() => handleSearch('')}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            <CSVLink
              data={csvData}
              filename="newsletter-subscribers.csv"
              className={styles.csvLink}
            >
              <button className={styles.exportBtn}>
                <FontAwesomeIcon icon={faFileExport} className={styles.btnIcon} />
                Export CSV
              </button>
            </CSVLink>
            <button
              className={`${styles.deleteBtn} ${selectedRows.length === 0 ? styles.btnDisabled : ''}`}
              disabled={selectedRows.length === 0}
              onClick={() => setIsDeleteModalVisible(true)}
            >
              <FontAwesomeIcon icon={faTrash} className={styles.btnIcon} />
              Delete Selected
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.loading}>Loading subscribers...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={subscribers.length > 0 && selectedRows.length === subscribers.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Email</th>
                  <th>Subscribed On</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className={styles.checkboxCell}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(subscriber.id)}
                          onChange={() => toggleSelectRow(subscriber.id)}
                        />
                      </td>
                      <td>{subscriber.email}</td>
                      <td>{new Date(subscriber.joinedAt).toLocaleDateString()}</td>
                      <td>
                        <span className={subscriber.isSubscribed ? styles.activeStatus : styles.inactiveStatus}>
                          {subscriber.isSubscribed ? 'Subscribed' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td>{new Date(subscriber.updatedAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => openEditModal(subscriber)}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noRecords}>
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Showing {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </div>
          <div className={styles.paginationControls}>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
              className={styles.pageSizeSelector}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>

            <button
              className={`${styles.paginationBtn} ${currentPage === 1 ? styles.btnDisabled : ''}`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              title="Previous page"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <span className={styles.pageDisplay}>
              {currentPage} of {Math.ceil(totalItems / pageSize) || 1}
            </span>

            <button
              className={`${styles.paginationBtn} ${currentPage >= Math.ceil(totalItems / pageSize) ? styles.btnDisabled : ''}`}
              disabled={currentPage >= Math.ceil(totalItems / pageSize)}
              onClick={() => setCurrentPage(currentPage + 1)}
              title="Next page"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        {isDeleteModalVisible && (
          <div className={styles.modalBackdrop} onClick={() => setIsDeleteModalVisible(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Delete Subscribers</h2>
                <button onClick={() => setIsDeleteModalVisible(false)} className={styles.modalClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <p>Are you sure you want to delete {selectedRows.length} subscriber(s)?</p>
                <p>This action cannot be undone.</p>
              </div>
              <div className={styles.modalFooter}>
                <button
                  onClick={() => setIsDeleteModalVisible(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={styles.deleteConfirmBtn}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalVisible && (
          <div className={styles.modalBackdrop} onClick={() => setIsEditModalVisible(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Edit Subscriber</h2>
                <button onClick={() => setIsEditModalVisible(false)} className={styles.modalClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    id="email"
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email address"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Subscription Status:</label>
                  <div className={styles.toggleSwitch}>
                    <input
                      id="toggle-switch"
                      type="checkbox"
                      checked={editSubscribed}
                      onChange={() => setEditSubscribed(!editSubscribed)}
                      className={styles.toggleInput}
                    />
                    <label htmlFor="toggle-switch" className={styles.toggleLabel}>
                      {editSubscribed ? (
                        <span className={styles.toggleOn}>Subscribed <FontAwesomeIcon icon={faCheck} /></span>
                      ) : (
                        <span className={styles.toggleOff}>Unsubscribed <FontAwesomeIcon icon={faTimes} /></span>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  onClick={() => setIsEditModalVisible(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className={styles.saveBtn}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
