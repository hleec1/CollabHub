'use client';

import { useState } from 'react';
import styles from './mypage.module.css';
import EditIcon from '@mui/icons-material/Edit';
import StyledContainer from "@/components/StyledContainer";
import { Switch } from '@mui/material';
import { Route } from 'react-router-dom';
import { usePathname, useRouter } from 'next/navigation';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTimeTable, setIsEditingTimeTable] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Hyun Jun Lee',
    studentId: '2019310995',
    phoneNumber: '010-8338-1576',
    email: 'hleec1234@gmail.com',
    status: 'Active',
    timeTable: Array(24).fill(Array(7).fill(false)), // 24 hours, 7 days each
  });
  const [editedData, setEditedData] = useState(profileData);
  const router = useRouter();
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    setIsEditingTimeTable(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setIsEditingTimeTable(false);
  };

  const toggleStatus = () => {
    setEditedData((prevState) => ({
      ...prevState,
      status: prevState.status === 'Active' ? 'Not active' : 'Active',
    }));
  };

  const handleTimeSlotClick = (hour: number, day: number) => {
    const newTimeTable = editedData.timeTable.map((daySlots, hourIndex) => {
      if (hourIndex === hour) {
        return daySlots.map((slot, dayIndex) => {
          if (dayIndex === day) {
            return !slot;
          }
          return slot;
        });
      }
      return daySlots;
    });
    setEditedData({ ...editedData, timeTable: newTimeTable });
  };

  const fieldLabels: { [key: string]: string } = {
    name: 'Name',
    studentId: 'Student ID',
    phoneNumber: 'Phone number',
    email: 'E-mail'
  };

  return (
    <StyledContainer>
    <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.buttonContainer}>
            <span className={styles.logoutButton} onClick={() => router.push(`/login`)}>log out</span>
          </div>
          <div className={styles.editButtonWrapper}>
          {isEditing ? (
            <div className={styles.editActions}>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <button className={styles.editButton} onClick={handleEditClick}>
              <EditIcon />
            </button>
            )}
          </div>
        <div className={styles.profileSection}>
          <div className={styles.profilePicture}>Profile picture</div>
          <div className={styles.info}>
            {['name', 'studentId', 'phoneNumber', 'email'].map((field) => (
              <div className={styles.infoItem} key={field}>
                <span className={styles.label}>{fieldLabels[field]}</span>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={(editedData as any)[field]}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                ) : (
                  <span className={styles.value}>{(profileData as any)[field]}</span>
                )}
              </div>
            ))}
            <div className={styles.infoItem}>
              <span className={styles.label}>Status</span>
                <span className={styles.value}>
                  <Switch
                    checked={editedData.status === 'Active'}
                    onChange={toggleStatus}
                    color="primary"
                    sx={{
                      margin: -2,
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'green',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'lightgreen',
                      },
                     }}
                  />
                <span
                  className={
                    editedData.status === 'Active'
                      ? styles.statusActive
                      : styles.statusInactive
                  }
                ></span>
                {editedData.status}

                </span>
            </div>
          </div>
          
        </div>
        <div className={styles.availableTimeSection}>
          <div className={styles.sectionHeader}>
            <span>Available time</span>
            <button className={styles.editButton} onClick={() => setIsEditingTimeTable(true)}>
              <EditIcon />
            </button>
          </div>
          <div className={styles.timeTable}>
            <div className={styles.dayRow}>
              <div className={styles.dayLabel}></div>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => (
                <div key={day} className={styles.dayLabel}>
                  {day}
                </div>
              ))}
            </div>
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className={styles.hourRow}>
                <div className={styles.hourLabel}>{hour}</div>
                {editedData.timeTable[hour].map((slot, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`${styles.hourSlot} ${slot ? styles.activeSlot : ''}`}
                    onClick={() => isEditingTimeTable && handleTimeSlotClick(hour, dayIndex)}
                  />
                ))}
              </div>
            ))}
          </div>
          {isEditingTimeTable && (
            <div className={styles.editActions}>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
          </div>
          <div className={styles.buttonContainer}>
            <span className={styles.withdrawButton}>withdraw membership</span>
          </div>
      </main>
      </div>
    </StyledContainer>
  );
};

export default Profile;
