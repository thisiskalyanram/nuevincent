import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { ProjectEnquiry, PortfolioProject, EnquiryStatus, ProjectCategory } from "@/types";
import { INITIAL_PROJECTS } from "./sample-projects";

const ENQUIRIES_COLLECTION = "project_enquiries";
const PROJECTS_COLLECTION = "portfolio_projects";
const LOCAL_ENQUIRIES_KEY = "nuevincent_enquiries_v1";
const LOCAL_PROJECTS_KEY = "nuevincent_projects_v1";

// Helpers for localStorage fallback
function getLocalEnquiries(): ProjectEnquiry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveLocalEnquiries(enquiries: ProjectEnquiry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(enquiries));
}

function getLocalProjects(): PortfolioProject[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  const stored = localStorage.getItem(LOCAL_PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_PROJECTS;
  }
}

function saveLocalProjects(projects: PortfolioProject[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
}

/* =========================================================
   ENQUIRIES SERVICE
========================================================= */

export async function submitEnquiry(data: Omit<ProjectEnquiry, "id" | "status" | "createdAt">): Promise<string> {
  const enquiry: ProjectEnquiry = {
    ...data,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
        ...enquiry,
        createdAtServer: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn("Firestore write failed, saving to local backup:", err);
    }
  }

  // Fallback to local storage
  const id = "enq-" + Math.random().toString(36).substring(2, 9);
  const enquiryWithId = { ...enquiry, id };
  const current = getLocalEnquiries();
  saveLocalEnquiries([enquiryWithId, ...current]);
  return id;
}

export async function getEnquiries(filters?: { status?: EnquiryStatus; search?: string }): Promise<ProjectEnquiry[]> {
  let results: ProjectEnquiry[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, ENQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      results = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ProjectEnquiry, "id">),
      }));
    } catch (err) {
      console.warn("Firestore read failed, loading local enquiries:", err);
      results = getLocalEnquiries();
    }
  } else {
    results = getLocalEnquiries();
  }

  if (filters?.status) {
    results = results.filter((item) => item.status === filters.status);
  }

  if (filters?.search) {
    const qLower = filters.search.toLowerCase();
    results = results.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(qLower) ||
        item.company?.toLowerCase().includes(qLower) ||
        item.email?.toLowerCase().includes(qLower) ||
        item.projectType?.toLowerCase().includes(qLower) ||
        item.description?.toLowerCase().includes(qLower)
    );
  }

  return results;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, ENQUIRIES_COLLECTION, id);
      await updateDoc(docRef, { status });
      return true;
    } catch (err) {
      console.warn("Firestore update failed, updating local state:", err);
    }
  }

  const current = getLocalEnquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  saveLocalEnquiries(updated);
  return true;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, ENQUIRIES_COLLECTION, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.warn("Firestore delete failed, deleting from local state:", err);
    }
  }

  const current = getLocalEnquiries();
  const updated = current.filter((item) => item.id !== id);
  saveLocalEnquiries(updated);
  return true;
}

/* =========================================================
   PORTFOLIO PROJECTS SERVICE
========================================================= */

export async function getPortfolioProjects(category?: ProjectCategory): Promise<PortfolioProject[]> {
  let projects: PortfolioProject[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
      if (!snapshot.empty) {
        projects = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<PortfolioProject, "id">),
        }));
      } else {
        // Seed initial projects into Firestore if empty
        projects = INITIAL_PROJECTS;
      }
    } catch (err) {
      console.warn("Firestore read projects failed, using curated dataset:", err);
      projects = getLocalProjects();
    }
  } else {
    projects = getLocalProjects();
  }

  if (category && category !== "ALL") {
    return projects.filter((p) => p.category.toUpperCase() === category.toUpperCase());
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const all = await getPortfolioProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function savePortfolioProject(project: PortfolioProject): Promise<string> {
  const projectWithDate = {
    ...project,
    createdAt: project.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      if (project.id) {
        const docRef = doc(db, PROJECTS_COLLECTION, project.id);
        await setDoc(docRef, projectWithDate, { merge: true });
        return project.id;
      } else {
        const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectWithDate);
        return docRef.id;
      }
    } catch (err) {
      console.warn("Firestore project save failed, saving locally:", err);
    }
  }

  const current = getLocalProjects();
  if (project.id) {
    const updated = current.map((p) => (p.id === project.id ? projectWithDate : p));
    saveLocalProjects(updated);
    return project.id;
  } else {
    const newId = "proj-" + Math.random().toString(36).substring(2, 9);
    const newProject = { ...projectWithDate, id: newId };
    saveLocalProjects([newProject, ...current]);
    return newId;
  }
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.warn("Firestore project delete failed:", err);
    }
  }

  const current = getLocalProjects();
  const updated = current.filter((p) => p.id !== id);
  saveLocalProjects(updated);
  return true;
}
