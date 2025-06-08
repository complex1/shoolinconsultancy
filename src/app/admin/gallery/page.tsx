'use client';

import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPencilAlt, faFileExport, faTimes, faCheck, faChevronLeft, faChevronRight, faVideo, faImage, faUpload, faLink } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import styles from './gallery.module.css';

interface GalleryMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  poster?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function GalleryAdmin() {
  const [mediaItems, setMediaItems] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentMediaItem, setCurrentMediaItem] = useState<GalleryMedia | null>(null);
  
  // Form fields
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaAlt, setMediaAlt] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaPoster, setMediaPoster] = useState('');
  const [mediaIsActive, setMediaIsActive] = useState(true);
  const [mediaDisplayOrder, setMediaDisplayOrder] = useState(0);
  
  // File upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // CSV export data
  const csvData = [
    ['Type', 'Source URL', 'Alt Text', 'Caption', 'Status', 'Display Order', 'Created At'],
    ...mediaItems.map((item) => [
      item.type,
      item.src,
      item.alt,
      item.caption,
      item.isActive ? 'Active' : 'Inactive',
      item.displayOrder,
      new Date(item.createdAt).toLocaleDateString()
    ])
  ];

  useEffect(() => {
    fetchMediaItems();
  }, [currentPage, pageSize, searchTerm]);

  const fetchMediaItems = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/gallery?page=${currentPage}&limit=${pageSize}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMediaItems(data.data);
        setTotalItems(data.meta.totalCount);
      } else {
        setErrorMessage('Failed to fetch gallery media items');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error fetching media items:', error);
      setErrorMessage('An error occurred while fetching media items');
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
      const response = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedRows }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Successfully deleted ${selectedRows.length} media items`);
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsDeleteModalVisible(false);
        setSelectedRows([]);
        fetchMediaItems();
      } else {
        setErrorMessage('Failed to delete media items');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error deleting media items:', error);
      setErrorMessage('An error occurred while deleting media items');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleEditItem = (item: GalleryMedia) => {
    setCurrentMediaItem(item);
    setMediaType(item.type);
    setMediaSrc(item.src);
    setMediaAlt(item.alt);
    setMediaCaption(item.caption);
    setMediaPoster(item.poster || '');
    setMediaIsActive(item.isActive);
    setMediaDisplayOrder(item.displayOrder);
    setIsEditModalVisible(true);
  };

  const handleSaveItem = async () => {
    // Validate required fields
    if (!mediaSrc || !mediaAlt || !mediaCaption) {
      setErrorMessage('Please fill in all required fields');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const payload = {
        type: mediaType,
        src: mediaSrc,
        alt: mediaAlt,
        caption: mediaCaption,
        poster: mediaPoster || null,
        isActive: mediaIsActive,
        displayOrder: mediaDisplayOrder,
      };

      const method = currentMediaItem ? 'PATCH' : 'POST';
      const url = currentMediaItem 
        ? `/api/admin/gallery/${currentMediaItem.id}` 
        : '/api/admin/gallery';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(currentMediaItem 
          ? 'Media item updated successfully' 
          : 'Media item created successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
        setIsEditModalVisible(false);
        resetForm();
        fetchMediaItems();
      } else {
        setErrorMessage(data.message || 'Failed to save media item');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error saving media item:', error);
      setErrorMessage('An error occurred while saving media item');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const resetForm = () => {
    setCurrentMediaItem(null);
    setMediaType('image');
    setMediaSrc('');
    setMediaAlt('');
    setMediaCaption('');
    setMediaPoster('');
    setMediaIsActive(true);
    setMediaDisplayOrder(0);
    setShowUrlInput(true);
    setUploadProgress(0);
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file size - warn if over 10MB
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      if (!confirm(`The selected file is larger than ${MAX_SIZE_MB}MB. Upload may take a while. Continue?`)) {
        return;
      }
    }
    
    // Verify file type matches selected media type
    const fileMediaType = file.type.startsWith('image/') ? 'image' : 'video';
    if (fileMediaType !== mediaType) {
      setErrorMessage(`Selected file is ${fileMediaType} but selected type is ${mediaType}`);
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadProgress(5);
      setErrorMessage(null);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', mediaType);
      
      // Create progress tracker using XMLHttpRequest
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/admin/gallery/upload');
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          // Cap at 95% until server processing is done
          setUploadProgress(percentComplete > 95 ? 95 : percentComplete);
        }
      };
      
      // Create a promise to handle the XHR request
      const uploadPromise = new Promise<any>((resolve, reject) => {
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              reject(new Error(errorResponse.message || `Upload failed: ${xhr.status}`));
            } catch (e) {
              reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
            }
          }
        };
        
        xhr.onerror = function() {
          reject(new Error('Network error during upload'));
        };
        
        xhr.ontimeout = function() {
          reject(new Error('Upload timed out'));
        };
      });
      
      // Send the form data
      xhr.send(formData);
      
      // Wait for the upload to complete
      const data = await uploadPromise;
      
      if (data.success) {
        setUploadProgress(100);
        setMediaSrc(data.data.url);
        setShowUrlInput(false);
        setUploadedFileName(data.data.filename);
        
        // Set alt text to filename if not already set
        if (!mediaAlt) {
          const fileName = file.name.split('.')[0];
          const cleanName = fileName.replace(/-/g, ' ').replace(/_/g, ' ');
          setMediaAlt(cleanName);
        }
        
        // Set a default caption based on the filename if not already set
        if (!mediaCaption) {
          const fileName = file.name.split('.')[0];
          const formattedName = fileName
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          setMediaCaption(formattedName);
        }
        
        // If it's a video, try to set a poster image if not already set
        if (mediaType === 'video' && !mediaPoster && data.data.thumbnailUrl) {
          setMediaPoster(data.data.thumbnailUrl);
        }
        
        setSuccessMessage('File uploaded successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage((error as Error).message || 'Failed to upload file');
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleActive = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentValue }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Status updated successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
        fetchMediaItems();
      } else {
        setErrorMessage('Failed to update status');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('An error occurred while updating status');
      setTimeout(() => setErrorMessage(null), 3000);
    }
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
        <h1>Gallery Media Management</h1>
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
            className={`${styles.button} ${styles.primary}`}
            onClick={() => {
              resetForm();
              setIsEditModalVisible(true);
            }}
          >
            Add Media
          </button>
          
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
            filename="gallery-media.csv"
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
                <th className={styles.smallColumn}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(mediaItems.map(item => item.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    checked={selectedRows.length === mediaItems.length && mediaItems.length > 0}
                  />
                </th>
                <th>Media</th>
                <th>Type</th>
                <th>Caption</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px' }}>
                    No media items found
                  </td>
                </tr>
              ) : (
                mediaItems.map((item) => (
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
                    <td>
                      {item.type === 'image' ? (
                        <img src={item.src} alt={item.alt} className={styles.mediaPreview} />
                      ) : (
                        <div className={styles.videoPreview}>
                          <FontAwesomeIcon icon={faVideo} />
                        </div>
                      )}
                    </td>
                    <td>{item.type}</td>
                    <td>{item.caption}</td>
                    <td>{item.displayOrder}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${item.isActive ? styles.active : styles.inactive}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEditItem(item)}
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

      {/* Create/Edit Modal */}
      {isEditModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {currentMediaItem ? 'Edit Media Item' : 'Add New Media Item'}
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsEditModalVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Media Type*</label>
                <select
                  className={styles.select}
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Media Source*</label>
                
                <div className={styles.sourceToggle}>
                  <button
                    type="button" 
                    className={`${styles.sourceToggleBtn} ${showUrlInput ? styles.sourceToggleBtnActive : ''}`}
                    onClick={() => setShowUrlInput(true)}
                  >
                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                    URL
                  </button>
                  <button 
                    type="button"
                    className={`${styles.sourceToggleBtn} ${!showUrlInput ? styles.sourceToggleBtnActive : ''}`}
                    onClick={() => setShowUrlInput(false)}
                  >
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Upload
                  </button>
                </div>
                
                {showUrlInput ? (
                  <>
                    <input
                      type="text"
                      className={styles.input}
                      value={mediaSrc}
                      onChange={(e) => setMediaSrc(e.target.value)}
                      placeholder="https://..."
                    />
                    <div className={styles.helpText}>
                      Enter the URL for the media file
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.fileUploadContainer}>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className={styles.fileInput}
                        accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                      <button
                        type="button"
                        className={`${styles.fileInputButton} ${isUploading ? styles.uploading : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <FontAwesomeIcon icon={faUpload} className={styles.iconMarginRight} />
                        {isUploading ? 'Uploading...' : mediaSrc ? 'Change File' : 'Choose File'}
                      </button>
                      
                      {mediaSrc && !isUploading && (
                        <span className={styles.fileSelected}>
                          File selected: {uploadedFileName || mediaSrc.split('/').pop()}
                        </span>
                      )}
                    </div>
                    
                    {isUploading && (
                      <div className={styles.progressBarContainer}>
                        <div 
                          className={styles.progressBar} 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <span className={styles.progressText}>{uploadProgress}%</span>
                      </div>
                    )}
                    
                    {!fileInputRef.current?.value && !mediaSrc && !isUploading && (
                      <div className={styles.emptyUploadMessage}>
                        <FontAwesomeIcon 
                          icon={mediaType === 'image' ? faImage : faVideo} 
                          className={styles.emptyUploadIcon} 
                        />
                        <span>No file selected. Click above to browse files.</span>
                      </div>
                    )}
                    
                    {mediaSrc && !isUploading && mediaType === 'image' && (
                      <div className={styles.uploadPreviewContainer}>
                        <img 
                          src={mediaSrc} 
                          alt="Preview" 
                          className={styles.uploadPreview}
                        />
                      </div>
                    )}
                    
                    {mediaSrc && !isUploading && mediaType === 'video' && (
                      <div className={styles.uploadPreviewContainer}>
                        <video 
                          src={mediaSrc}
                          controls
                          className={styles.uploadPreview}
                          poster={mediaPoster || undefined}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    
                    <div className={styles.helpText}>
                      Upload a {mediaType} file. The file will be saved to the uploads/{mediaType === 'image' ? 'images' : 'videos'} directory.
                      {mediaSrc && !isUploading && (
                        <div className={styles.uploadedFileInfo}>
                          <div>File path: <code>{mediaSrc}</code></div>
                          <button 
                            type="button"
                            className={styles.copyButton}
                            onClick={() => {
                              navigator.clipboard.writeText(mediaSrc);
                              setSuccessMessage('Path copied to clipboard');
                              setTimeout(() => setSuccessMessage(null), 1500);
                            }}
                          >
                            Copy Path
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {mediaType === 'video' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Video Poster URL</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={mediaPoster || ''}
                    onChange={(e) => setMediaPoster(e.target.value)}
                    placeholder="https://..."
                  />
                  <div className={styles.helpText}>
                    Optional thumbnail image to show before the video plays
                  </div>
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Alternative Text*</label>
                <input
                  type="text"
                  className={styles.input}
                  value={mediaAlt}
                  onChange={(e) => setMediaAlt(e.target.value)}
                  placeholder="Descriptive text for the media"
                />
                <div className={styles.helpText}>
                  Describe the media for accessibility purposes
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Caption*</label>
                <textarea
                  className={styles.textarea}
                  value={mediaCaption}
                  onChange={(e) => setMediaCaption(e.target.value)}
                  placeholder="Caption for the media"
                ></textarea>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Display Order</label>
                <input
                  type="number"
                  className={styles.input}
                  value={mediaDisplayOrder}
                  onChange={(e) => setMediaDisplayOrder(parseInt(e.target.value) || 0)}
                  min="0"
                />
                <div className={styles.helpText}>
                  Lower numbers display first
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <div className={styles.switchContainer}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={mediaIsActive}
                      onChange={(e) => setMediaIsActive(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                  <span>Active</span>
                </div>
                <div className={styles.helpText}>
                  Inactive media will not be displayed on the website
                </div>
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
                onClick={handleSaveItem}
              >
                {currentMediaItem ? 'Update' : 'Create'}
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
                {selectedRows.length === 1 ? 'item' : 'items'}? This action cannot be undone.
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
