<template>
  <div class="flex items-center">
    <img
      src="https://p7.hiclipart.com/preview/247/564/869/computer-icons-user-profile-clip-art-user-avatar.jpg"
      alt="User"
      class="mr-6 w-20 h-20 rounded-full"
    />

    <div class="flex flex-col w-full">
      <strong class="text-title text-2xl">User</strong>
      <p class="flex items-center">
        <img src="icons/level.svg" alt="Level" class="mr-2" />
        <span class="text-base">Level {{ level }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: mapState("Challenges", ["level"]),
});
</script>
