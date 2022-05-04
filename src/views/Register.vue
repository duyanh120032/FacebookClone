<template>
  <div>
    <v-card class="pa-3">
      <v-card-header>
        <v-card-title>
          <h1>Register</h1>
        </v-card-title>
      </v-card-header>
      <v-form ref="formRef" v-model="data.valid" lazy-validation color="black">
        <v-text-field
          v-model="data.name"
          :counter="200"
          :rules="data.nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="data.email"
          :rules="data.emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.password"
          :rules="data.passwordRules"
          label="Mật khẩu"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.dateOfBirth"
          label="Date of birth"
          :rules="[(v) => !!v || 'Date of birth is required']"
          type="date"
          required
        ></v-text-field>

        <v-select
          v-model="data.gender"
          :items="data.items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Gender"
          required
        ></v-select>

        <v-checkbox
          v-model="data.checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        >
          abc
        </v-checkbox>

        <v-btn :disabled="!data.valid" color="success" class="mr-4" @click="register">
          Register
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        <span>{{ count }}</span>
        <v-btn color="secondary" class="mr-4" @click="registerService"> Incre </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { register as registerService } from "../services/authService";

const store = useStore();
const router = useRouter()
const formRef = ref(null);

const count = computed(() => {
  return store.state.count;
});

const data = reactive({
  valid: true,
  name: "",
  nameRules: [
    (v) => !!v || "Name is required",
    (v) => v.length >= 5 || "Name must be more than 5 characters",
  ],
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
  dateOfBirth: "",

  gender: null,
  items: ["Male", "Female", "3D"],
  checkbox: false,
});
const register = () => {
  formRef.value.validate().then((valid) => {
    // submit
    if (valid.valid) {
      registerService({
        fullname: data.name,
        username: data.name.replaceAll(" ", ""),
        email: data.email,
        password: data.password,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
      },router);
    }
  });
};
const reset = () => {
  formRef.value.reset();
  formRef.value.resetValidation();
  data.valid = true;
};
</script>

<style lang="scss" scoped></style>
