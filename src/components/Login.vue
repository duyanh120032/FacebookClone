<template>
  <div>
    <v-card class="pa-3">
      <v-form ref="formRef" v-model="data.valid" lazy-validation color="black">
        <v-text-field
          v-model="data.email"
          :rules="data.emailRules"
          label="Email hoặc số điện thoại"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.password"
          :rules="data.passwordRules"
          label="Mật khẩu"
          type="password"
          variant="outlined"
          required
        ></v-text-field>
        <v-btn
          block
          :disabled="!data.valid"
          color="primary"
          size="x-large"
          @click="login"
          rounded="sm"
        >
          Login
        </v-btn>
        <v-divider class="my-4"></v-divider>
        <v-btn
          block
          color="success"
          size="large"
          href="/register"
          rounded="sm">
          Create New Account ?
          </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { login as loginService } from "../services/authService";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";

// const store = useStore();
const formRef = ref(null);
const router = useRouter();
const data = reactive({
  valid: true,
  email: "",
  emailRules: [
    (v) => !!v || "E-mail is required",
    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
  ],
  password: "",
  passwordRules: [
    (v) => !!v || "Password is required",
    (v) => v.length >= 6 || "Password must be at least 6 characters",
  ],
});
const login = () => {
  // validate
  formRef.value.validate().then((valid) => {
    // submit
    if (valid.valid) {
      loginService({ email: data.email, password: data.password },router);
    }
  });
};
// const reset = () => {
//   console.log("reset");
// };
</script>

<style lang="scss" scoped></style>
