"use client";
import styles from "./page.module.css";
import Graph from "./canvas";
import { useState } from "react";

export default function Home() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddRelation, setShowAddRelation] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState("all");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🌳 Dynastry</h1>
          <p className={styles.subtitle}>Your Family Tree Explorer</p>
        </div>
        <div className={styles.headerControls}>
          <select 
            className={styles.userSelect}
            value={currentUser || ""}
            onChange={(e) => setCurrentUser(e.target.value || null)}
          >
            <option value="">View All (No Privacy Filter)</option>
            <option value="1">Login as Grand Father</option>
            <option value="2">Login as Grand Mother</option>
            <option value="3">Login as Uncle</option>
            <option value="4">Login as Uncle Jr</option>
            <option value="5">Login as Mom</option>
            <option value="6">Login as Dad</option>
            <option value="7">Login as Me</option>
            <option value="8">Login as Sister</option>
            <option value="9">Login as Bob Smith</option>
            <option value="10">Login as Alice Smith</option>
            <option value="11">Login as Charlie Smith</option>
          </select>
          <select 
            className={styles.familyFilter}
            value={selectedFamily}
            onChange={(e) => setSelectedFamily(e.target.value)}
          >
            <option value="all">All Families</option>
            <option value="1">Family 1</option>
            <option value="2">Family 2</option>
          </select>
        </div>
      </header>
      
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.sidebarTitle}>Controls</h2>
          <button 
            className={styles.primaryButton}
            onClick={() => setShowAddMember(true)}
          >
            ➕ Add Family Member
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => setShowAddRelation(true)}
          >
            🔗 Add Relationship
          </button>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Legend</h3>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{backgroundColor: '#1f77b4'}}></span>
              <span>Family 1</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{backgroundColor: '#ff7f0e'}}></span>
              <span>Family 2</span>
            </div>
          </div>
          {currentUser && (
            <div className={styles.privacyNote}>
              <p>🔒 Privacy Mode Active</p>
              <p className={styles.privacyText}>Only showing family members related to you</p>
            </div>
          )}
        </div>
      </div>

      <main className={styles.main}>
        <Graph currentUser={currentUser} selectedFamily={selectedFamily} />
      </main>

      {showAddMember && (
        <div className={styles.modal} onClick={() => setShowAddMember(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add Family Member</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input 
                  type="text" 
                  className={styles.input}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Family Group</label>
                <select className={styles.input}>
                  <option value="1">Family 1</option>
                  <option value="2">Family 2</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Birth Date (optional)</label>
                <input 
                  type="date" 
                  className={styles.input}
                />
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowAddMember(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={styles.submitButton}
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddRelation && (
        <div className={styles.modal} onClick={() => setShowAddRelation(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add Relationship</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>From Person</label>
                <select className={styles.input} required>
                  <option value="">Select person</option>
                  <option value="1">Grand Father</option>
                  <option value="2">Grand Mother</option>
                  <option value="3">Uncle</option>
                  <option value="4">Uncle Jr</option>
                  <option value="5">Mom</option>
                  <option value="6">Dad</option>
                  <option value="7">Me</option>
                  <option value="8">Sister</option>
                  <option value="9">Bob Smith</option>
                  <option value="10">Alice Smith</option>
                  <option value="11">Charlie Smith</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Relationship Type</label>
                <select className={styles.input} required>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>To Person</label>
                <select className={styles.input} required>
                  <option value="">Select person</option>
                  <option value="1">Grand Father</option>
                  <option value="2">Grand Mother</option>
                  <option value="3">Uncle</option>
                  <option value="4">Uncle Jr</option>
                  <option value="5">Mom</option>
                  <option value="6">Dad</option>
                  <option value="7">Me</option>
                  <option value="8">Sister</option>
                  <option value="9">Bob Smith</option>
                  <option value="10">Alice Smith</option>
                  <option value="11">Charlie Smith</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowAddRelation(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={styles.submitButton}
                >
                  Add Relationship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
