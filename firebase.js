// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    getFirestore,
    setDoc, 
    doc, 
    updateDoc, 
    getDoc, 
    query, 
    where, 
    orderBy, 
    collection,
    getDocs,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConstants = {
    COLLECTION_USERS: 'USERS',
}

class FirebaseController {
    app;
    auth;
    analytics;
    db;

    constructor(firebaseConfig) {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.analytics = getAnalytics(this.app);
        this.db = getFirestore();
    }

    register(email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    async insertUser(user) {
        user.timestamp = Timestamp.fromDate(new Date());
        try {
            await setDoc(doc(this.db, firebaseConstants.COLLECTION_USERS, user.uuid), user);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getUser(uuid) {
        try {
            const snapshot = await getDoc(doc(this.db, firebaseConstants.COLLECTION_USERS, uuid));
            if (snapshot && snapshot.exists()) {
                return snapshot.data();
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUser(user) {
        try {
            return await updateDoc(doc(this.db, firebaseConstants.COLLECTION_USERS, user.uuid),
                { score: user.score }
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllUsers() {
        try {
            const q = query(collection(this.db, firebaseConstants.COLLECTION_USERS),
                orderBy("score", "desc"), orderBy("timestamp"), orderBy("nickname"), orderBy("email"), orderBy("name"));
            const docs = await getDocs(q);
            const users = [];
            docs.forEach(u => users.push(u.data()));
            return users;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}


export default {
    FirebaseController
}