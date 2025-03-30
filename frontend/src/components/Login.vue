<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold text-center mb-4">Welcome !</h1>
      <p class="text-center text-muted-foreground mb-4" >login to access learning activities</p>

      <!-- Email & Password Fields -->
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mb-2" />
      <!-- Select User Type -->
      <select v-model="userType" class="mb-4 p-2 border w-full rounded">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

      <!-- Login & Register Buttons -->
      <button @click="signInWithEmail" class="w-full bg-slate-600 text-white p-2  hover:bg-slate-500 focus:bg-slate-500 rounded mb-2">Login</button>
      <button @click="registerUser" class="w-full bg-slate-600 text-white p-2  hover:bg-slate-500 focus:bg-slate-500 rounded mb-2">Register</button>

      <hr class="my-2" />

      <!-- Google Sign-In -->
      <button @click="signInWithGoogle" class="w-full bg-slate-800 text-white p-2  hover:bg-slate-700 focus:bg-slate-700 rounded mb-2">
        Sign in with Google</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db, provider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, doc, setDoc, getDoc } from "../firebase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const userType = ref("student");
    const errorMessage = ref("");

    // 🔹 Email/Password Login
    const signInWithEmail = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        await handleUserLogin(userCredential.user);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // 🔹 Register New User
    const registerUser = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email.value,
          role: userType.value,
        });
        await handleUserLogin(userCredential.user);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // 🔹 Google Sign-In
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            role: userType.value,
          });
        }

        await handleUserLogin(user);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // 🔹 Redirect User After Login
    const handleUserLogin = async (user) => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;
        router.push(role === "student" ? "/student-dashboard" : "/teacher-dashboard");
      }
    };

    return { email, password, userType, errorMessage, signInWithEmail, registerUser, signInWithGoogle };
  },
};
</script>