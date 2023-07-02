<template>
  <main>
    <v-sheet width="500" class="mx-auto login">
      <v-form @submit.prevent>
        <v-text-field
          v-model="email"
          :rules="rules"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="Password"
          :rules="lastNameRules"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<script scoped>
export default {
  data: () => ({
    email: '',
    rules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    lastName: '',
    lastNameRules: [(v) => !!v || 'Password is required'],
  }),
};
</script>

<style>
.login {
  margin-top: 15%;
}
</style>
