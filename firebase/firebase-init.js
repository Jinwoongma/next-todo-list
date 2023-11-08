import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebase-config";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Realtime Database 서비스 가져오기
const realtimeDb = getDatabase(app);

export { realtimeDb };
