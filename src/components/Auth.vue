<template>
  <div class="auth">
    <div v-if="!user">
      <button @click="signInWithGoogle">Sign in with Google</button>
    </div>
    <div v-else>
      <p>Hello, {{ user.displayName }}</p>
      <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

export default {
  setup(props, { emit }) {
    const user = ref(null);

    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        emit('user-changed', result.user);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const signOut = async () => {
      await firebaseSignOut(auth);
      user.value = null;
      emit('user-changed', null);
    };

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        emit('user-changed', currentUser);
      });
    });

    return { user, signInWithGoogle, signOut };
  }
};
</script>

<style scoped>
.auth {
  text-align: center;
  padding: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
