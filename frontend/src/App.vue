<template>
  <div class="min-h-screen flex flex-col">
    <router-view /> <!-- This will load Login, StudentDashboard, or TeacherDashboard based on the route -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>